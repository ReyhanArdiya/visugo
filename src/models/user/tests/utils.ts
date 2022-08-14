import { MockAuthUser } from "../../../tests/utils/firestore-tests-utils";
import { UserCollection, UserDoc, userDocConverter } from "../user";

export const addUser = async (
    authUser: MockAuthUser,
    userDoc: Partial<UserDoc> = new UserDoc(authUser.id)
) => {
    const collection = new UserCollection(userDocConverter, authUser.db);

    return await collection.signUp(authUser.id, userDoc as UserDoc);
};
