import createPathSegments from "../../../utils/firebase/client/firestore/create-path-segments";
import { FirestoreCollection } from "../firestore-collection";

/* Mock Class */
export class BookDoc {
    [k: string]: unknown;

    constructor(
		public title: string,
		public author: string,
		public year: number
    ){}
}

export class BookCollection<T = BookDoc> extends FirestoreCollection<T> {
    constructor(
        ...superParams: ConstructorParameters<typeof FirestoreCollection<T>>
    ) {
        const pathSegments = createPathSegments(["books"], superParams[2]);

        super(superParams[0], superParams[1], pathSegments);
    }
}
