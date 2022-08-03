import { MockAuthUser } from "../../../tests/utils/firestore-tests-utils";
import { ListingCollection, listingDocConverter } from "../listing";
import { ReviewCollection, reviewDocConverter } from "../review";
import { UserCollection, UserDoc, userDocConverter } from "../user";

export const addUser = async (
    authUser: MockAuthUser,
    userDoc?: Partial<UserDoc>
) => {
    const collection = new UserCollection(userDocConverter, authUser.db);

    return await collection.add(
        (userDoc as UserDoc) ||
            new UserDoc(
                authUser.id,
                new ListingCollection(authUser.id, listingDocConverter, authUser.db),
                new ReviewCollection(authUser.id, reviewDocConverter, authUser.db)
            )
    );
};
