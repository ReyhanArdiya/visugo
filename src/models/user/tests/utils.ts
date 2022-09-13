import { DocumentSnapshot } from "firebase/firestore";
import { MockAuthUser } from "../../../tests/utils/firestore-tests-utils";
import { ListingDoc } from "../listing";
import {
    CartUpdatedCartItem,
    UserCollection,
    UserDoc,
    userDocConverter,
} from "../user";

export const addUser = async (
    authUser: MockAuthUser,
    userDoc: Partial<UserDoc> = new UserDoc(authUser.id)
) => {
    const collection = new UserCollection(userDocConverter, authUser.db);

    return await collection.signUp(authUser.id, userDoc as UserDoc);
};

export const addItemToCart = async (
    authUser: MockAuthUser,
    userCollection: UserCollection,
    userDoc: UserDoc,
    listingDoc: CartUpdatedCartItem,
    quantity: number | false = 20
) => {
    await userDoc.cartUpdated(authUser.db, listingDoc, quantity);

    const updatedUserDocData = (await userCollection.getDocById(userDoc.uid)).data();

    return updatedUserDocData as UserDoc;
};

export const createMockCartItem = (
    listingSnapshot: DocumentSnapshot<ListingDoc>
): CartUpdatedCartItem => {
    const data = listingSnapshot.data() as ListingDoc;

    return {
        id: listingSnapshot.id,
        image: "www.fake.com",
        price: data.price,
        seller: "fake_seller",
        title: data.title,
    };
};
