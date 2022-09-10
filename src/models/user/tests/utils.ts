import { MockAuthUser } from "../../../tests/utils/firestore-tests-utils";
import { addListing } from "../listing/tests/utils";
import { UserCollection, UserDoc, userDocConverter } from "../user";

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
    listingDoc: Awaited<ReturnType<typeof addListing>>,
    quantity: number | false = 20
) => {
    await userDoc.cartUpdated(authUser.db, listingDoc, quantity);

    const updatedUserDocData = (await userCollection.getDocById(userDoc.uid)).data();

    return updatedUserDocData as UserDoc;
};
