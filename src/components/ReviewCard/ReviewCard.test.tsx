import { RulesTestEnvironment } from "@firebase/rules-unit-testing/dist/src/public_types";
import { cleanup, render, screen } from "@testing-library/react";

import ReviewCard from ".";
import {
    cleanMockFirebase,
    MockAuthUser,
    MockUnauthUser,
    setupMockFirebase,
} from "../../tests/utils/firestore-tests-utils";

// Firebase setup
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

// Component rendering
beforeEach(() => {
    render(
        <ReviewCard
            authorImage={"https://picsum.photos/500"}
            authorName={"Elys Maldov"}
            created={new Date()}
            description={
                "Lorem ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer amet consecturer amet consecturerameamet consectureramet consectureramet consecturert consecturer"
            }
            star={3}
            title={
                "Hello world and all who inhabit it it is so nice to meet you guys"
            }
        />
    );
});

afterEach(() => cleanup());

describe.skip("ReviewCard", () => {
    it("is rendered", () => {
        expect(document.querySelector(".review")).toBeDefined();
    });

    it.todo("shows the edit button when the user is reviewer");
    it.todo("hides the delete button when the user is not the reviewer");

    it.todo("shows the edit button when the user is reviewer");
    it.todo("hides the delete button when the user is not the reviewer");
});
