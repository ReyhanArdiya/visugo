import { FirestoreDataConverter } from "firebase/firestore";
import createPathSegments from "../../../utils/firebase/client/firestore/create-path-segments";

import { DocumentReference, Timestamp } from "firebase/firestore";
import { ref, StorageReference } from "firebase/storage";
import getFirebaseClient from "../../../utils/firebase/client/get-firebase-client";
import { getListingFileId } from "../../../utils/firebase/client/storage/listings";
import getStorageClient from "../../../utils/firebase/client/storage/get-storage-client";
import { UserCollection, UserDoc } from "../user";

const storage = getStorageClient(getFirebaseClient());

// TODO tidy up this code okay
export class ListingDoc {
    [k: string]: unknown;

    /**
     * Image is stored as string in firestore db but StorageReference in this class.
     */
    private _image: StorageReference;

    constructor(
        // CMT we could Denormalize this but i wanna start denormalizing once i learn cloud functions for easier sync
        // public seller: { username: UserDoc["username"]; uid: UserDoc["uid"] },
        public seller: DocumentReference<UserDoc>,
        public title: string,
        public price: number,
        public description: string,
        image: StorageReference,
        public readonly created = Timestamp.now()
    ) {
        this._image = getListingFileId(storage, this.seller.id, image);
    }

    public get image(): StorageReference {
        return this._image;
    }
    public set image(value: StorageReference) {
        this._image = getListingFileId(storage, this.seller.id, value);
    }
}

// XXX class transformers doesn't work well with DocumentReference,
// even with @Transform and enableCircularCheck T ^ T
export const listingDocConverter: FirestoreDataConverter<ListingDoc> = {
    fromFirestore(snapshot, options?) {
        const listingDoc = snapshot.data(options) as ListingDoc & { image: string };

        return new ListingDoc(
            listingDoc.seller,
            listingDoc.title,
            listingDoc.price,
            listingDoc.description,
            ref(storage, listingDoc.image),
            listingDoc.created
        );
    },

    toFirestore(listingDoc) {
        const { created, description, price, seller, title } = listingDoc;

        return {
            created,
            description,
            price,
            seller,
            title,
            image: (listingDoc.image as StorageReference).fullPath,
        };
    },
};

export class ListingCollection<T = ListingDoc> extends UserCollection<T> {
    public collectionId = "listings";

    constructor(
        userId: string,
        ...superParams: ConstructorParameters<typeof UserCollection<T>>
    ) {
        const pathSegments = createPathSegments(
            [userId, "listings"],
            superParams[2]
        );

        super(superParams[0], superParams[1], pathSegments);
    }
}
