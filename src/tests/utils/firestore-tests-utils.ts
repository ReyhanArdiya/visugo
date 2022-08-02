import {
    initializeTestEnvironment,
    RulesTestContext,
    RulesTestEnvironment,
    TestEnvironmentConfig,
} from "@firebase/rules-unit-testing";
import {
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { UserDoc } from "../../models/user/user";

export const getRulesTestEnv = async (config: TestEnvironmentConfig = {}) => {
    return await initializeTestEnvironment(config);
};

export const mockDb = (rules: RulesTestContext): Firestore => ({
    ...rules.firestore(),
    type: "firestore",
    toJSON() {
        return { ...this };
    },
});

export interface MockAuthUser {
    user: RulesTestContext;
    db: Firestore;
    id: string;
    firestore: ReturnType<RulesTestContext["firestore"]>;
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
        id,
        firestore: authUser.firestore(),
    };
};

export const getUnauthUser = (rules: RulesTestEnvironment): MockUnauthUser => {
    const unauthUser = rules.unauthenticatedContext();

    return {
        user: unauthUser,
        db: mockDb(unauthUser),
        firestore: unauthUser.firestore(),
    };
};

type MockUserDoc = Pick<UserDoc, "uid">;

export const setMockUserDoc = async (
    authUser: MockAuthUser
): Promise<DocumentSnapshot<UserDoc>> => {
    const userRef = doc(
        authUser.db,
        `users/${authUser.id}`
    ) as DocumentReference<MockUserDoc>;

    await setDoc(userRef, { uid: authUser.id });

    return (await getDoc(userRef)) as DocumentSnapshot<UserDoc>;
};

export const setupMockFirebase = async (
    authUserId: MockAuthUser["id"],
    config?: Parameters<typeof getRulesTestEnv>[0]
) => {
    const testEnv = await getRulesTestEnv({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
        hub: {
            host: "localhost",
            port: 4400,
        },
        ...config,
    });

    const authUser = getAuthUser(testEnv, authUserId);
    const unauthUser = getUnauthUser(testEnv);

    return {
        testEnv,
        authUser,
        unauthUser,
    };
};

export const cleanMockFirebase = async (
    rules: RulesTestEnvironment,
    clear = {
        database: false,
        firestore: true,
        storage: false,
    }
) => {
    clear.database && (await rules.clearDatabase());
    clear.firestore && (await rules.clearFirestore());
    clear.storage && (await rules.clearStorage());

    await rules.cleanup();
};
