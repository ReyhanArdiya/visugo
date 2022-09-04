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
let reviewCardEl: HTMLElement;
beforeEach(() => {
    reviewCardEl = render(
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
    ).baseElement;
});

afterEach(() => cleanup());

describe.skip("ReviewCard rendering", () => {
    it("is rendered", () => {
        expect(reviewCardEl).toBeDefined();
    });

    it("is collapsed when not editing", () => {
        expect(screen.queryByTestId("toggle-button")).toBeDefined();
    });
    it("can expand by a button when it is collapsed", () => {});

    it("is expanded when editing", () => {});
    it("shows finish and cancel button when editing", () => {});
});

describe("ReviewCard editing mode", () => {
    test("the authorName is editable ", () => {});
    test("the title is editable ", () => {});
    test("the star is editable ", () => {});
    test("the description is editable ", () => {});
});
