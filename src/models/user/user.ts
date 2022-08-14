import { UserCredential } from "firebase/auth";
import { doc, FirestoreDataConverter, setDoc } from "firebase/firestore";
import createPathSegments from "../../utils/firebase/client/firestore/create-path-segments";
import { FirestoreCollection } from "../base/firestore-collection";

export class UserDoc {
    constructor(
        // CMT displayname comes from usercredential and photourl too
        public readonly uid: UserCredential["user"]["uid"]
    ) {}

    // XXX Causes circural dependency!!!
    // listings() {
    //     return new ListingCollection(this.uid, listingDocConverter, db),
    // }

    // reviews() {
    //     return new ReviewCollection(this.uid, reviewDocConverter, this.db)
    // }
}

export const userDocConverter: FirestoreDataConverter<UserDoc> = {
    fromFirestore(snapshot) {
        const userDoc = snapshot.data() as Pick<UserDoc, "uid">;

        return new UserDoc(userDoc.uid);
    },

    toFirestore(modelObject) {
        return { ...modelObject };
    },
};

// CMT We don't constrain the T since each subcollection will have their own docs
export class UserCollection<T = UserDoc> extends FirestoreCollection<T> {
    public collectionId = "users";

    constructor(
        ...superParams: ConstructorParameters<typeof FirestoreCollection<T>>
    ) {
        const pathSegments = createPathSegments(["users"], superParams[2]);

        super(superParams[0], superParams[1], pathSegments);
    }

    /**
     * Prefer using this over {@link UserCollection.add}.
     */
    public async signUp(userId: string, data: T) {
        const userRef = doc(this.ref, userId);

        await setDoc(userRef, data);

        return userRef;
    }
}
