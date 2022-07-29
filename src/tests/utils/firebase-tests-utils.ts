import { initializeTestEnvironment, RulesTestEnvironment, TestEnvironmentConfig,  } from "@firebase/rules-unit-testing";

export const getRulesTestEnv = async (config: TestEnvironmentConfig = {}) => await initializeTestEnvironment(config);

export const getAuthUser = (rules: RulesTestEnvironment) => rules.authenticatedContext("1");

export const getUnauthUser = (rules: RulesTestEnvironment) => rules.authenticatedContext("0");

export const firebaseSetup = async (config: Parameters<typeof getRulesTestEnv>[0]) => {
	const rulesTestEnv = await getRulesTestEnv(config);

	return {
		testEnv: rulesTestEnv,
		authUser: getAuthUser(rulesTestEnv),
		unauthUser: getUnauthUser(rulesTestEnv)
	};
};

export const firebaseTeardown = async (rules: RulesTestEnvironment) => {
	await rules.cleanup();
	await rules.clearDatabase();
	await rules.clearFirestore();
	await rules.clearStorage();
};

// const firebaseTestUtils = async (config: Parameters<typeof getTestEnv>[0]) => {
// 	const testEnv = await getTestEnv(config);

// 	return {
// 		getAuthUser: getAuthUser.bind(null, testEnv),
// 		getUnauthUser: getAuthUser.bind(null, testEnv),
// 		firebaseTeardown: firebaseTeardown.bind(null, testEnv)
// 	};
// };

// export default firebaseTestUtils;


