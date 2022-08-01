import {
    initializeTestEnvironment,
    RulesTestContext,
    RulesTestEnvironment,
    TestEnvironmentConfig
} from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";

export const getRulesTestEnv = async (config: TestEnvironmentConfig = {}) => {
    return await initializeTestEnvironment(config);
};

export const mockDb = (rules: RulesTestContext): Firestore => ({
    ...rules.firestore(),
    type: "firestore",
    toJSON() {
        return { ...this };
    }
});

export interface MockAuthUser {
    user: RulesTestContext;
    db: Firestore;
    id: string;
}

export type MockUnauthUser = Omit<MockAuthUser, "id">;

export const getAuthUser = (
    rules: RulesTestEnvironment,
    id: string
): MockAuthUser => {
    const authUser = rules.authenticatedContext(id);

    return {
        user: authUser,
        db: mockDb(authUser),
        id
    };
};

export const getUnauthUser = (rules: RulesTestEnvironment): MockUnauthUser => {
    const unauthUser = rules.unauthenticatedContext();

    return {
        user: unauthUser,
        db: mockDb(unauthUser)
    };
};

export const setupMockFirebase = async (
    authUserId: MockAuthUser["id"],
    config?: Parameters<typeof getRulesTestEnv>[0]
) => {
    const testEnv = await getRulesTestEnv({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
        hub: {
            host: "localhost",
            port: 4400
        },
        ...config
    });

    const authUser = getAuthUser(testEnv, authUserId);
    const unauthUser = getUnauthUser(testEnv);

    return {
        testEnv,
        authUser,
        unauthUser
    };
};

export const cleanMockFirebase = async (
    rules: RulesTestEnvironment,
    clear = {
        database: false,
        firestore: true,
        storage: false
    }
) => {
    clear.database && (await rules.clearDatabase());
    clear.firestore && (await rules.clearFirestore());
    clear.storage && (await rules.clearStorage());

    await rules.cleanup();
};
