import {
    assertFails,
    assertSucceeds,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import {
    cleanMockFirebase,
    MockAuthUser,
    MockUnauthUser,
    setupMockFirebase,
} from "../../../tests/utils/firestore-tests-utils";
import { UserCollection, UserDoc, userDocConverter } from "../user";
import { addUser } from "./utils";

let rulesTestEnv: RulesTestEnvironment;
let authUser: MockAuthUser;
let unauthUser: MockUnauthUser;

beforeEach(async () => {
    const mockFirebase = await setupMockFirebase("1");

    rulesTestEnv = mockFirebase.testEnv;
    authUser = mockFirebase.authUser;
    unauthUser = mockFirebase.unauthUser;
});

afterEach(async () => await cleanMockFirebase(rulesTestEnv));

describe("UserDoc firestore schema validation", () => {
    it("allows when data has uid", async () => {
        await assertSucceeds(addUser(authUser));
    });
    it("denies when data has less fields than uid", async () => {
        await assertFails(addUser(authUser, {}));
    });
    it("denies when data has more fields than uid", async () => {
        await assertFails(
            addUser(authUser, {
                uid: authUser.id,
                // @ts-expect-error: must have more fields
                meowmeres: 123,
            })
        );
    });

    it("allows when uid is a string", async () => {
        await assertSucceeds(addUser(authUser));
    });
    it("denies when uid isn't a string", async () => {
        await assertFails(
            addUser(authUser, {
                // @ts-expect-error: must be of different type
                uid: false,
            })
        );
    });

    it("allows when uid is equal to document id", async () => {
        await assertSucceeds(addUser(authUser));
    });
    it("denies when uid is not equal to document id", async () => {
        await assertFails(addUser(authUser, { uid: "not_the_same" }));
    });
});

describe("UserDoc firestore rules", () => {
    describe("Authenticated users", () => {
        let authUserUserCollection: UserCollection;

        beforeEach(() => {
            authUserUserCollection = new UserCollection(
                userDocConverter,
                authUser.db
            );
        });

        it("can read their own UserDoc", async () => {
            const user = await addUser(authUser);
            await assertSucceeds(authUserUserCollection.getDocById(user.id));
        });

        it("are allowed to create a new UserDoc", async () => {
            await assertSucceeds(addUser(authUser));
        });

        it("are allowed to delete a their own UserDoc", async () => {
            const user = await addUser(authUser);

            await assertSucceeds(authUserUserCollection.deleteDocById(user.id));
        });
        it("are allowed to update a their own UserDoc", async () => {
            const user = await addUser(authUser);

            await assertSucceeds(
                authUserUserCollection.updateDocById(user.id, {
                    uid: "different from us",
                })
            );
        });
    });

    describe("Unauthenticated users", () => {
        let unauthUserUserCollection: UserCollection;

        beforeEach(() => {
            unauthUserUserCollection = new UserCollection(
                userDocConverter,
                unauthUser.db
            );
        });

        it("can't read any UserDoc", async () => {
            await assertFails(unauthUserUserCollection.docs());
        });

        it("cannot create a UserDoc", async () => {
            await assertFails(
                unauthUserUserCollection.add({ uid: "useless" } as UserDoc)
            );
        });

        it("cannot delete a UserDoc", async () => {
            const user = await addUser(authUser);

            await assertFails(unauthUserUserCollection.deleteDocById(user.id));
        });

        it("cannot update a UserDoc", async () => {
            const user = await addUser(authUser);

            await assertFails(
                unauthUserUserCollection.updateDocById(user.id, {
                    uid: "Updated vvitches!",
                })
            );
        });
    });
});
