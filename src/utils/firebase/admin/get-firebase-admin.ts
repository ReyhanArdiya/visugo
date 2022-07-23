import { credential } from "firebase-admin";
import { initializeApp, getApps, getApp } from "firebase-admin/app";
import serviceAccount from "../../../../google-service-account.secret.json";
// import setupLocalEmulator from "../client/setup-local-emulator";

const getFirebaseAdmin = () => {
	if (getApps().length === 0) {
		return initializeApp({
			credential: credential.cert(serviceAccount as object)
		});
	} else {
		return getApp();
	}
};

// TODO finish this after learning admin sdk
// setupLocalEmulator(app);

export default getFirebaseAdmin;