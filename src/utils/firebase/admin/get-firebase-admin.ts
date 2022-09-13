import { credential } from "firebase-admin";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import serviceAccount from "../../../../google-service-account.secret.json";
import setupLocalEmulator from "./setup-local-emulator";

const getFirebaseAdmin = () => {
    setupLocalEmulator();

    if (getApps().length === 0) {
        return initializeApp({
            credential: credential.cert(serviceAccount as object),
        });
    } else {
        return getApp();
    }
};

export default getFirebaseAdmin;
