import { RulesTestEnvironment } from "@firebase/rules-unit-testing/dist/src/public_types";
import { render, screen } from "@testing-library/react";
import {
    cleanMockFirebase,
    MockAuthUser,
    MockUnauthUser,
    setupMockFirebase,
} from "../../tests/utils/firestore-tests-utils";

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

describe.skip("Listing reviews", () => {
    it.todo("shows add review when the user is logged in");

    test.todo("user can create a review when they are logged in");
});
