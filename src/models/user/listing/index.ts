import { Transform, TransformationType } from "class-transformer";
import { FirestoreDataConverter } from "firebase/firestore";
import createPathSegments from "../../../utils/firebase/client/firestore/create-path-segments";

import { DocumentReference, Timestamp } from "firebase/firestore";
import { getStorage, ref, StorageReference } from "firebase/storage";
import getFirebaseClient from "../../../utils/firebase/client/get-firebase-client";
import { UserCollection, UserDoc } from "../user";

export class ListingDoc {
    [k: string]: unknown;

    // CMT we could Denormalize seller with username and uid only but i wanna start denormalizing once i learn cloud functions for easier sync
    // public seller: { username: UserDoc["username"]; uid: UserDoc["uid"] },
    // @Transform(({ value }) => value)
    public seller: DocumentReference<UserDoc>;

    @Transform(({type, value}) => {
        if (type === TransformationType.CLASS_TO_PLAIN) {
            const storageReference = value as StorageReference;

            return storageReference.fullPath;
        } else if (type === TransformationType.PLAIN_TO_CLASS) {
            const fullPath = value as string;

            // TODO make getStorage utils after learning it
            return ref(getStorage(), fullPath);
        }
    })
    public image: StorageReference;

    @Transform(({value}) => value)
    public created : Timestamp;

    constructor(
        // CMT we could Denormalize this but i wanna start denormalizing once i learn cloud functions for easier sync
        // public seller: { username: UserDoc["username"]; uid: UserDoc["uid"] },
        seller: DocumentReference<UserDoc>,
        public title: string,
        public description: string,
        // TODO make it somehow firstore keeps the string but in the converter we convert it into storagerefernce
        image: StorageReference,
        created = Timestamp.now()
    ) {
        this.seller = seller;
        this.image = image;
        this.created = created;
    }
}

// XXX class transformers doesn't work well with DocumentReference,
// even with @Transform and enableCircularCheck T ^ T
export const listingDocConverter: FirestoreDataConverter<ListingDoc> = {
    fromFirestore(snapshot, options?) {
        const listingDoc = snapshot.data(options) as ListingDoc & {image: string};

        return new ListingDoc(
            listingDoc.seller,
            listingDoc.title,
            listingDoc.description,
            ref(getStorage(getFirebaseClient()), listingDoc.image),
            listingDoc.created
        );
        // return plainToClass(ListingDoc, (snapshot.data(options)), {enableCircularCheck: true});
    },

    toFirestore(listingDoc) {
        // CMT DocumentRefs seems to cause maximum callstacke errors, enableCircularCheck
        // fixes this
        // return instanceToPlain(listingDoc, {
        //     enableCircularCheck: true
        // });

        listingDoc.image = (listingDoc.image as StorageReference).fullPath;

        return {...listingDoc};
    }
};

export class ListingCollection<T = ListingDoc> extends UserCollection<T> {
    constructor(
        userId: string,
        ...superParams: ConstructorParameters<typeof UserCollection<T>>
    ) {
        const pathSegments = createPathSegments([userId, "listings"], superParams[2]);

        super(superParams[0], superParams[1], pathSegments);
    }
}