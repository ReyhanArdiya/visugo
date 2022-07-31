import {
    initializeTestEnvironment,
    RulesTestContext,
    RulesTestEnvironment,
    TestEnvironmentConfig
} from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";

export const getRulesTestEnv = async (config: TestEnvironmentConfig = {}) => {
    return  await initializeTestEnvironment(config);
};

export enum MockFirestoreUserId {
	AUTH_USER = "1"
}

export const getAuthUser = (rules: RulesTestEnvironment) => {
    return rules.authenticatedContext(MockFirestoreUserId.AUTH_USER);
};

export const getUnauthUser = (rules: RulesTestEnvironment) => {
    return rules.unauthenticatedContext();
};

export const mockDb = (rules: RulesTestContext): Firestore => ({
    ...rules.firestore(),
    type: "firestore",
    toJSON() {
        return { ...this };
    }
});

export interface MockFirestoreUser {
    user: RulesTestContext;
    db: Firestore;
}

export const setupMockFirebase = async (
    config?: Parameters<typeof getRulesTestEnv>[0]
) => {
    const rulesTestEnv = await getRulesTestEnv({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
        hub: {
            host: "localhost",
            port: 4400
        },
        ...config
    });

    const authUser = getAuthUser(rulesTestEnv);
    const unauthUser = getUnauthUser(rulesTestEnv);

    return {
        testEnv: rulesTestEnv,
        authUser: {
            user: authUser,
            db: mockDb(authUser)
        } as MockFirestoreUser,
        unauthUser: {
            user: unauthUser,
            db: mockDb(unauthUser)
        } as MockFirestoreUser
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
