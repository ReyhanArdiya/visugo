import {
    assertFails,
    assertSucceeds,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { FirebaseError } from "firebase/app";
import { getDoc } from "firebase/firestore";

import {
    cleanMockFirebase,
    MockAuthUser,
    MockUnauthUser,
    setupMockFirebase,
} from "../../../tests/utils/firestore-tests-utils";
import { addListing } from "../listing/tests/utils";
import {
    CartUpdatedCartItem,
    UserCollection,
    UserDoc,
    userDocConverter,
} from "../user";
import { addItemToCart, addUser, createMockCartItem } from "./utils";

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
    it("throws when data has less fields than uid", async () => {
        await expect(addUser(authUser, {})).rejects.toThrow(FirebaseError);
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
                unauthUserUserCollection.signUp("useless", {
                    uid: "useless",
                } as UserDoc)
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

describe("UserDoc cart field", () => {
    let authUserUserCollection: UserCollection;

    let userDoc: UserDoc;
    let listingRef: Awaited<ReturnType<typeof addListing>>;
    let listingDoc: CartUpdatedCartItem;

    beforeEach(async () => {
        authUserUserCollection = new UserCollection(userDocConverter, authUser.db);

        await addUser(authUser);
        userDoc = new UserDoc(authUser.id);
        listingRef = await addListing(authUser);
        listingDoc = createMockCartItem(await getDoc(listingRef));
    });

    test("authenticated users can add new item to cart", async () => {
        const expectedQuantity = 20;

        const updatedUserDocData = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            listingDoc,
            expectedQuantity
        );

        expect(updatedUserDocData?.cart[listingDoc.id]).toHaveProperty(
            "quantity",
            expectedQuantity
        );
    });

    test("authenticated users can increase item quantities on cart", async () => {
        const { cart: oldCart } = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            listingDoc
        );

        const oldQuant = oldCart[listingDoc.id].quantity;

        const { cart: newCart } = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            listingDoc,
            1
        );

        expect(newCart[listingDoc.id].quantity).toBe(oldQuant + 1);
    });
    test("authenticated users can remove item quantity on cart", async () => {
        const { cart: oldCart } = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            listingDoc
        );

        const oldQuant = oldCart[listingDoc.id].quantity;

        const { cart: newCart } = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            listingDoc,
            -1
        );

        expect(newCart[listingDoc.id].quantity).toBe(oldQuant - 1);
    });
    it("deletes an item from cart when the item quantity is 0", async () => {
        await addItemToCart(authUser, authUserUserCollection, userDoc, listingDoc);

        const { cart: newCart } = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            listingDoc,
            -20
        );

        expect(newCart).not.toHaveProperty(listingDoc.id);
    });
    it(
        "deletes an item from cart when passing false for the incQuant argument",
        async () => {
            await addItemToCart(
                authUser,
                authUserUserCollection,
                userDoc,
                listingDoc
            );

            await userDoc.cartUpdated(authUser.db, listingDoc, false);

            const { cart } = (
                await authUserUserCollection.getDocById(userDoc.uid)
            ).data() as UserDoc;

            expect(cart).not.toHaveProperty(listingDoc.id);
        },
        Infinity
    );

    test("authenticated users can read all items from cart", async () => {
        // CMT could've used and array and loop but whatevs
        const listing1 = await addListing(authUser);
        const listing2 = await addListing(authUser);
        const listing3 = await addListing(authUser);

        await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            createMockCartItem(await getDoc(listing1))
        );
        await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            createMockCartItem(await getDoc(listing2))
        );
        const { cart: latestCart } = await addItemToCart(
            authUser,
            authUserUserCollection,
            userDoc,
            createMockCartItem(await getDoc(listing3))
        );

        expect(latestCart).toHaveProperty(listing1.id);
        expect(latestCart).toHaveProperty(listing2.id);
        expect(latestCart).toHaveProperty(listing3.id);
    });
});
