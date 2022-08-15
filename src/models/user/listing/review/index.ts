import {
    DocumentReference,
    FirestoreDataConverter,
    Timestamp,
} from "firebase/firestore";
import { ListingCollection } from "..";
import createPathSegments from "../../../../utils/firebase/client/firestore/create-path-segments";
import { UserDoc } from "../../user";

export class ReviewDoc {
    [k: string]: unknown;

    constructor(
        public author: DocumentReference<UserDoc>,
        public star: 0 | 1 | 2 | 3 | 4 | 5,
        public title: string,
        public description: string,
        public created = Timestamp.now()
    ) {}
}

export const reviewDocConverter: FirestoreDataConverter<ReviewDoc> = {
    fromFirestore(snapshot) {
        const reviewDoc = snapshot.data() as ReviewDoc;

        return new ReviewDoc(
            reviewDoc.author,
            reviewDoc.star,
            reviewDoc.title,
            reviewDoc.description
        );

        // return plainToInstance(ReviewDoc, reviewDoc, { enableCircularCheck: true });
    },

    toFirestore(modelObject) {
        return { ...modelObject };
        // return instanceToPlain(modelObject, { enableCircularCheck: true });
    },
};

export class ReviewCollection<T = ReviewDoc> extends ListingCollection<T> {
    public collectionId = "reviews";

    constructor(
        listingId: string,
        ...superParams: ConstructorParameters<typeof ListingCollection<T>>
    ) {
        const pathSegments = createPathSegments(
            [listingId, "reviews"],
            superParams[3]
        );

        super(superParams[0], superParams[1], superParams[2], pathSegments);
    }
}
