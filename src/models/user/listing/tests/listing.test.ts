import {
    assertFails,
    assertSucceeds,
    RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentReference,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { ListingCollection, ListingDoc, listingDocConverter } from "..";
import {
    cleanMockFirebase,
    getAuthUser,
    MockAuthUser,
    MockUnauthUser,
    setMockUserDoc,
    setupMockFirebase
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
                    "A book",
                    ref(u1AuthUser.user.storage(), "book_img")
                )
            );
            const u2Listing = await u2Listings.add(
                new ListingDoc(
                    u2.ref,
                    "Booketh",
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
                    "A book",
                    ref(u1AuthUser.user.storage(), "book_img")
                )
            );
            const u2Listing = await u2Listings.add(
                new ListingDoc(
                    u2.ref,
                    "Booketh",
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
