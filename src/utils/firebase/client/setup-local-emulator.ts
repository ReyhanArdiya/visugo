import { type FirebaseApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";

/**
 * This function already checks node_env internally.
 *
 */
const setupLocalEmulator = (app: FirebaseApp) => {
    if (
        process.env.NODE_ENV !== "production" &&
        process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT &&
        process.env.NEXT_PUBLIC_EMULATOR_AUTH_PORT &&
        process.env.NEXT_PUBLIC_EMULATOR_STORAGE_PORT
    ) {
        connectFirestoreEmulator(
            getFirestore(app),
            "localhost",
            +process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT
        );

        connectAuthEmulator(
            getAuth(app),
            `http://localhost:${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PORT}`
        );

        connectStorageEmulator(
            getStorage(app),
            "localhost",
            +process.env.NEXT_PUBLIC_EMULATOR_STORAGE_PORT
        );
    }
};

export default setupLocalEmulator;
