import {
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    Firestore,
    FirestoreDataConverter,
    getDoc,
    getDocs,
    limit,
    query,
    UpdateData,
    updateDoc,
    writeBatch
} from "firebase/firestore";

/**
 * I don't use static methods here since I want this to be usable as subcollection
 * models where each subcollection is its own instance, since subcollections are nested
 * inside of a document, there could be as many subcollections instances as there are documents.
 */
export abstract class FirestoreCollection<T extends DocumentData> {
    public readonly ref: CollectionReference<T>;

    constructor(
        converter: FirestoreDataConverter<T>,
        db: Firestore,
        pathSegments = [""]
    ) {
        this.ref = collection(db, "/", ...pathSegments).withConverter(
            converter
        );
    }

    private get db() {
        return this.ref.firestore;
    }

    /* Create */
    public add(data: T): Promise<DocumentReference<T>>
    public add(...data: T[]): Promise<DocumentReference<T>[]>
    async add(...data: T[]) {
        const batch = writeBatch(this.db);

        const dataDocs = data.map(() => doc(this.ref));

        data.forEach((d,i) => batch.set(dataDocs[i], d));

        await batch.commit();

        return data.length > 1 ? dataDocs : dataDocs[0];
    }

    /* Read */
    async docs(count = 10) {
        return await getDocs(query(this.ref, limit(count)));
    }

    async getDocById(id: string) {
        return await getDoc(doc(this.ref, id));
    }

    async queryFrom(...queryConstraints: Parameters<typeof query>[1][]) {
        return await getDocs(query(this.ref, ...queryConstraints));
    }

    /* Update */
    async updateDocById(id: string, data: UpdateData<T>) {
        await updateDoc(doc(this.ref, id), data);
    }

    /* Delete */
    async deleteDocById(id: string) {
        await deleteDoc(doc(this.ref, id));
    }

    /**
     * Not recommended
     *
     * @see https://firebase.google.com/docs/firestore/manage-data/delete-data#web
     * @see https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
     */
    async clear(size = 50) {
        const documents = await this.docs(size);

        if (documents.docs.length === 0) {
            return true;
        }

        const batch = writeBatch(this.db);

        documents.forEach(d => batch.delete(d.ref));

        await batch.commit();

        await this.clear(size);
    }
}


