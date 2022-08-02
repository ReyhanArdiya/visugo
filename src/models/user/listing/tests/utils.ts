import {
    collectionGroup,
    doc,
    DocumentReference,
    getDocs,
    Query,
    query
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { ListingCollection, ListingDoc, listingDocConverter } from "..";
import {
    MockAuthUser,
    MockUnauthUser,
    setMockUserDoc
} from "../../../../tests/utils/firestore-tests-utils";
import { UserDoc } from "../../user";

export const addListing = async (user: MockAuthUser) => {
    const seller = await setMockUserDoc(user);

    const collection = new ListingCollection(user.id, listingDocConverter, user.db);

    return await collection.add(
        new ListingDoc(
            doc(user.db, seller.ref.path) as DocumentReference<UserDoc>,
            "shirt",
            "A shirt",
            ref(user.user.storage(), "some_shirt")
        )
    );
};

export const addListings = async (user: MockAuthUser) => {
    const seller = await setMockUserDoc(user);

    const collection = new ListingCollection(user.id, listingDocConverter, user.db);

    return await collection.add(
        new ListingDoc(
            doc(user.db, seller.ref.path) as DocumentReference<UserDoc>,
            "shirt",
            "A shirt",
            ref(user.user.storage(), "some_shirt")
        ),
        new ListingDoc(
            doc(user.db, seller.ref.path) as DocumentReference<UserDoc>,
            "book",
            "A book",
            ref(user.user.storage(), "some_book")
        ),
        new ListingDoc(
            doc(user.db, seller.ref.path) as DocumentReference<UserDoc>,
            "pants",
            "A pair of pants",
            ref(user.user.storage(), "some_pants")
        )
    );
};

export const getAllListings = async (user: MockAuthUser | MockUnauthUser) => {
    return await getDocs(
        query(collectionGroup(user.db, "listings") as Query<ListingDoc>)
    );
};
