import {
	initializeTestEnvironment,
	RulesTestContext,
	RulesTestEnvironment,
	TestEnvironmentConfig
} from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";

export const getRulesTestEnv = async (config: TestEnvironmentConfig = {}) =>
	await initializeTestEnvironment(config);

export const getAuthUser = (rules: RulesTestEnvironment) =>
	rules.authenticatedContext("1");

export const getUnauthUser = (rules: RulesTestEnvironment) =>
	rules.authenticatedContext("0");

export const mockDb = (rules: RulesTestContext): Firestore => ({
	...rules.firestore(),
	type: "firestore",
	toJSON() {
		return { ...this };
	}
});

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

	return {
		testEnv: rulesTestEnv,
		authUser: getAuthUser(rulesTestEnv),
		unauthUser: getUnauthUser(rulesTestEnv)
	};
};

export const cleanMockFirebase = async (rules: RulesTestEnvironment, clear = {
	database: false,
	firestore: true,
	storage: false
}) => {
	clear.database && await rules.clearDatabase();
	clear.firestore && await rules.clearFirestore();
	clear.storage && await rules.clearStorage();

	await rules.cleanup();
};