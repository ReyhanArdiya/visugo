import {
    assertFails,
    assertSucceeds,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc } from "firebase/firestore";
import { ReviewCollection, ReviewDoc, reviewDocConverter } from "..";
import {
    cleanMockFirebase,
    MockAuthUser,
    MockUnauthUser,
    setMockUserDoc,
    setupMockFirebase,
} from "../../../../tests/utils/firestore-tests-utils";
import { addReview, listReviews } from "./utils";

let rulesTestEnv: RulesTestEnvironment;
let authUser: MockAuthUser;
let unauthUser: MockUnauthUser;
let author: Awaited<ReturnType<typeof setMockUserDoc>>;
let correctReviewDoc: ReviewDoc;

let addMockReview: (
    reviewDoc?: Parameters<typeof addReview>[2]
) => ReturnType<typeof addReview>;

beforeEach(async () => {
    const mockFirebase = await setupMockFirebase("1");

    rulesTestEnv = mockFirebase.testEnv;
    authUser = mockFirebase.authUser;
    unauthUser = mockFirebase.unauthUser;
    author = await setMockUserDoc(authUser);
    addMockReview = addReview.bind(null, authUser, author.ref);
    correctReviewDoc = new ReviewDoc(author.ref, 5, "Good!", "Good desc");
});

afterEach(async () => await cleanMockFirebase(rulesTestEnv));

describe("ReviewDoc firestore schema validation", () => {
    it("allows when data has author, star, title and description", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when data has less fields than author, star, title and description", async () => {
        await assertFails(addMockReview({ description: "meow!" }));
    });
    it("denies when data has more fields than author, star, title and description", async () => {
        await assertFails(
            addMockReview({
                ...correctReviewDoc,
                location: "123 Elm Street",
            })
        );
    });

    it("allows when author is a DocumentReference", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when author isn't a DocumentReference", async () => {
        await assertFails(
            addMockReview({
                ...correctReviewDoc,
                // @ts-expect-error: must be of different type
                author: false,
            })
        );
    });
    it("allows when author is a DocumentReference to an existing user", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when author is a DocumentReference to a non-existing user", async () => {
        const nonExistingAUthor = doc(author.ref.parent, "Nope-nothing!");
        await assertFails(addReview(authUser, nonExistingAUthor, correctReviewDoc));
    });

    it("allows when star is a number", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when star isn't a number", async () => {
        await assertFails(
            addMockReview({
                ...correctReviewDoc,
                // @ts-expect-error: must be of different type
                star: "1",
            })
        );
    });
    it("allows when star is a number from 1 - 5", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when star isn't a number from 1 - 5", async () => {
        await assertFails(
            addMockReview({
                ...correctReviewDoc,
                // @ts-expect-error: must be out of range
                star: 10,
            })
        );
    });

    it("allows when title is a string", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when title isn't a string", async () => {
        await assertFails(
            addMockReview({
                ...correctReviewDoc,
                // @ts-expect-error: must be of different type
                title: false,
            })
        );
    });

    it("allows when description is a string", async () => {
        await assertSucceeds(addMockReview());
    });
    it("denies when description isn't a string", async () => {
        await assertFails(
            addMockReview({
                ...correctReviewDoc,
                // @ts-expect-error: must be of different type
                description: false,
            })
        );
    });
});

describe("ReviewDoc firestore rules", () => {
    describe("Authenticated users", () => {
        let authUserReviewCollection: ReviewCollection;

        beforeEach(() => {
            authUserReviewCollection = new ReviewCollection(
                authUser.id,
                reviewDocConverter,
                authUser.db
            );
        });

        it("can read all reviews", async () => {
            await assertSucceeds(listReviews(authUser));
        });

        it("are allowed to create a new review", async () => {
            await assertSucceeds(addMockReview());
        });

        it("are allowed to delete a their own review", async () => {
            const reviewDoc = await addMockReview();
            await assertSucceeds(
                authUserReviewCollection.deleteDocById(reviewDoc.id)
            );
        });
        it("are allowed to update a their own review", async () => {
            const reviewDoc = await addMockReview();

            await assertSucceeds(
                authUserReviewCollection.updateDocById(reviewDoc.id, {
                    description: "Updated vvitches!",
                })
            );
        });
    });

    describe("Unauthenticated users", () => {
        let unauthUserReviewCollection: ReviewCollection;

        beforeEach(() => {
            unauthUserReviewCollection = new ReviewCollection(
                "nothing",
                reviewDocConverter,
                unauthUser.db
            );
        });

        it("can read all reviews", async () => {
            await assertSucceeds(listReviews(unauthUser));
        });

        it("cannot create a review", async () => {
            await assertFails(
                unauthUserReviewCollection.add({ ...correctReviewDoc })
            );
        });
        it("cannot delete a review", async () => {
            const reviewDoc = await addMockReview();
            await assertFails(
                unauthUserReviewCollection.deleteDocById(reviewDoc.id)
            );
        });
        it("cannot update a review", async () => {
            const reviewDoc = await addMockReview();
            await assertFails(
                unauthUserReviewCollection.updateDocById(reviewDoc.id, {
                    description: "Updated vvitches!",
                })
            );
        });
    });
});
