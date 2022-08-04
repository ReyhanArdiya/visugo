import {
    assertFails,
    assertSucceeds,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { ListingCollection, ListingDoc, listingDocConverter } from "..";
import {
    cleanMockFirebase,
    getAuthUser,
    MockAuthUser,
    MockUnauthUser,
    setMockUserDoc,
    setupMockFirebase,
} from "../../../../tests/utils/firestore-tests-utils";

import { UserDoc } from "../../user";
import { addListing, addListings, getAllListings } from "./utils";

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

/* Helpers */
// CMT I know i could use without security method thingy from rulesTestEnv BUT
// i wanna use this to test for auth/unauth user create tests later too

describe("ListingDoc fields", () => {
    it("stores StorageReference for its image field when reading from db", async () => {
        const listingDoc = await getDoc(await addListing(authUser));

        // CMT I can't check if it is a StorageReference instance
        expect(listingDoc.data()?.image).toHaveProperty("bucket");
    });

    it("stores StorageReference fullPath for its image field when stored in db", async () => {
        const listingDoc = await getDoc(await addListing(authUser));

        expect(
            await getDocs(
                query(
                    listingDoc.ref.parent,
                    where("image", "==", listingDoc.data()?.image.fullPath)
                )
            )
        );
    });

    it("stores StorageReference fullPath with the pattern users/{userId}/listings/{listingId}", async () => {
        const listingDoc = await getDoc(await addListing(authUser));

        const folderPattern = /^users\/.*\/listings\/.*$/;

        expect(listingDoc.data()?.image.fullPath).toMatch(folderPattern);
    });
});

describe("ListingDoc schema validation", () => {
    describe("firestore rules", () => {
        let seller: DocumentSnapshot<UserDoc>;
        let correctListingDoc: ListingDoc;
        let listingsCollection: CollectionReference;

        beforeEach(async () => {
            seller = await setMockUserDoc(authUser);
            correctListingDoc = new ListingDoc(
                doc(authUser.db, seller.ref.path) as DocumentReference<UserDoc>,
                "shirt",
                4.99,
                "A shirt",
                ref(authUser.user.storage(), "some_shirt")
            );
            listingsCollection = collection(
                authUser.db,
                new ListingCollection(
                    "schema_validation_test",
                    listingDocConverter,
                    authUser.db
                ).ref.path
            );
        });

        // REMEMBER! addListing without second param gives the right schemas
        it("allows when data has seller, price, title, description, image and created fields", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when data has less fields than seller, price, title, description, image and created", async () => {
            await assertFails(addDoc(listingsCollection, { title: "book" }));
        });
        it("denies when data has fields other than seller, title, description, image and created", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: "img",
                    meep: 1,
                })
            );
        });

        it("allows when seller is a DocumentReference to an existing seller", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when seller is a DocumentReference to a non-existing seller", async () => {
            const collection = new ListingCollection(
                authUser.id,
                listingDocConverter,
                authUser.db
            );

            const listingDoc = new ListingDoc(
                doc(authUser.db, "users/non_existent") as DocumentReference<UserDoc>,
                "shirt",
                4.99,
                "A shirt",
                ref(authUser.user.storage(), "some_shirt")
            );

            await assertFails(collection.add(listingDoc));
        });
        it("denies when seller is not a DocumentReference", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: "shirt",
                    seller: false,
                })
            );
        });

        it("allows when price is a number", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when price isn't a number", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: "shirt",
                    price: "3003",
                })
            );
        });

        it("allows when title is a string", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when title isn't a string", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: "shirt",
                    title: 3003,
                })
            );
        });

        it("allows when description is a string", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when description isn't a string", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: "shirt",
                    description: false,
                })
            );
        });

        it("allows when image is a string URL to a storage object (not checking if it exists or not)", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("allows when image is a string URL with the pattern users/{userId}/listings/{listingId}", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when image isn't a string", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: 80085,
                })
            );
        });

        // CMT THis is hard to test since create & request.time could be different (e.g. from offline to online and
        // miliseconds diff), so maybe imma just make created thru cloud functions
        // it("allows when created is a Timestamp equals to when this request is made", async () => {
        //     await assertSucceeds(addListing(authUser));
        // });
        // it("denies when created is not a Timestamp equals to when this request is made", async () => {
        //     await assertFails(
        //         addDoc(listingsCollection, {
        //             ...correctListingDoc,
        //             image: "shirt",
        //             created: new Timestamp(Timestamp.now().seconds + 366700, 200),
        //         })
        //     );
        // });
        it("allows when created is a Timestamp", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("denies when created is not a Timestamp", async () => {
            await assertFails(
                addDoc(listingsCollection, {
                    ...correctListingDoc,
                    image: "shirt",
                    created: false,
                })
            );
        });
    });

    // CMT Too tired, already done by typescript anyways; byeehhh
    describe("client side", () => {
        it.todo(
            "allows when data has seller, title, description, image and created field"
        );
        it.todo(
            "denies when data doesn't have seller, title, description, image and created field"
        );
    });
});

describe("ListingCollection rules", () => {
    describe("Authenticated users", () => {
        it("can read all listings", async () => {
            await assertSucceeds(getAllListings(authUser));
        });

        it("are allowed to create a new listing", async () => {
            await assertSucceeds(addListing(authUser));
        });
        it("are allowed to create new listings", async () => {
            await assertSucceeds(addListings(authUser));
        });

        it("can only delete their own listing", async () => {
            const mockUser = await setMockUserDoc(authUser);

            const listingCollection = new ListingCollection(
                mockUser.id,
                listingDocConverter,
                authUser.db
            );

            const listingDocRef = await listingCollection.add(
                new ListingDoc(
                    mockUser.ref as DocumentReference<UserDoc>,
                    "Some shirt",
                    2.99,
                    "Some desc",
                    ref(authUser.user.storage(), "some_image")
                )
            );

            await assertSucceeds(listingCollection.deleteDocById(listingDocRef.id));
        });
        it("cannot delete other's listings", async () => {
            const u1AuthUser = getAuthUser(rulesTestEnv, "1");
            const u2AuthUser = getAuthUser(rulesTestEnv, "2");

            const u1 = await setMockUserDoc(u1AuthUser);
            const u2 = await setMockUserDoc(u2AuthUser);

            const u1Listings = new ListingCollection(
                u1.id,
                listingDocConverter,
                u1AuthUser.db
            );
            const u2Listings = new ListingCollection(
                u2.id,
                listingDocConverter,
                u2AuthUser.db
            );

            const u1Listing = await u1Listings.add(
                new ListingDoc(
                    u1.ref,
                    "Book",
                    19.9,
                    "A book",
                    ref(u1AuthUser.user.storage(), "book_img")
                )
            );
            const u2Listing = await u2Listings.add(
                new ListingDoc(
                    u2.ref,
                    "Booketh",
                    29.9,
                    "A booketh",
                    ref(u2AuthUser.user.storage(), "booketh_img")
                )
            );

            await assertFails(u1Listings.deleteDocById(u2Listing.id));
            await assertFails(u2Listings.deleteDocById(u1Listing.id));
        });

        it("can only update their own listing", async () => {
            const u1AuthUser = getAuthUser(rulesTestEnv, "1");
            const u2AuthUser = getAuthUser(rulesTestEnv, "2");

            const u1 = await setMockUserDoc(u1AuthUser);
            const u2 = await setMockUserDoc(u2AuthUser);

            const u1Listings = new ListingCollection(
                u1.id,
                listingDocConverter,
                u1AuthUser.db
            );
            const u2Listings = new ListingCollection(
                u2.id,
                listingDocConverter,
                u2AuthUser.db
            );

            const u1Listing = await u1Listings.add(
                new ListingDoc(
                    u1.ref,
                    "Book",
                    14.29,
                    "A book",
                    ref(u1AuthUser.user.storage(), "book_img")
                )
            );
            const u2Listing = await u2Listings.add(
                new ListingDoc(
                    u2.ref,
                    "Booketh",
                    4.29,
                    "A booketh",
                    ref(u2AuthUser.user.storage(), "booketh_img")
                )
            );

            await assertFails(
                u1Listings.updateDocById(u2Listing.id, { title: "u2" })
            );
            await assertFails(
                u2Listings.updateDocById(u1Listing.id, { title: "u1" })
            );
        });
    });

    // Since my models can only be used by authenticated users, I need to test unauth users
    // without my models
    describe("Unauthenticated users", () => {
        let unauthListingsCollection: CollectionReference<ListingDoc>;
        let listingDoc: ListingDoc;

        beforeEach(() => {
            unauthListingsCollection = collection(
                unauthUser.db,
                "users",
                "nope",
                "listings"
            ).withConverter(listingDocConverter);

            listingDoc = new ListingDoc(
                doc(unauthUser.db, "user", "norr") as DocumentReference<UserDoc>,
                "nope",
                4.99,
                "naur gurl",
                ref(unauthUser.user.storage(), "naurr")
            );
        });

        it("can read all listings", async () => {
            await assertSucceeds(getAllListings(unauthUser));
        });

        it("are denied to create a listing", async () => {
            await assertFails(
                addDoc<ListingDoc>(unauthListingsCollection, listingDoc)
            );
        });

        it("are denied to delete a listing", async () => {
            const ref = await addListing(authUser);

            await assertFails(deleteDoc(doc(unauthUser.db, ref.path)));
        });

        it("are denied to update a listing", async () => {
            const ref = await addListing(authUser);

            await assertFails(
                updateDoc(doc(unauthUser.db, ref.path), { title: "naur" })
            );
        });
    });
});
