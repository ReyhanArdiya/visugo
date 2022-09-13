import {
    collectionGroup,
    DocumentReference,
    getDocs,
    Query,
    query,
} from "firebase/firestore";
import { ReviewCollection, ReviewDoc, reviewDocConverter } from "..";
import {
    MockAuthUser,
    MockUnauthUser,
} from "../../../../../tests/utils/firestore-tests-utils";
import { UserDoc } from "../../../user";
import { addListing } from "../../tests/utils";

export const addReview = async (
    authUser: MockAuthUser,
    author: DocumentReference<UserDoc>,
    reviewDoc?: Partial<ReviewDoc>
) => {
    const listing = await addListing(authUser);

    const collection = new ReviewCollection(
        listing.id,
        authUser.id,
        reviewDocConverter,
        authUser.db
    );

    return await collection.add(
        (reviewDoc as ReviewDoc) || new ReviewDoc(author, 5, "Good!", "Good desc")
    );
};

export const listReviews = async (user: MockAuthUser | MockUnauthUser) => {
    return await getDocs(
        query(collectionGroup(user.db, "reviews") as Query<ReviewDoc>)
    );
};
