/**
 * This function already checks node_env internally.
 */
const setupLocalEmulator = () => {
    if (
        process.env.NODE_ENV !== "production" &&
        process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT &&
        process.env.NEXT_PUBLIC_EMULATOR_AUTH_PORT &&
        process.env.NEXT_PUBLIC_EMULATOR_STORAGE_PORT
    ) {
        process.env[
            "FIRESTORE_EMULATOR_HOST"
        ] = `localhost:${process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT}`;
        process.env[
            "FIREBASE_AUTH_EMULATOR_HOST"
        ] = `localhost:${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PORT}`;
        process.env[
            "FIREBASE_STORAGE_EMULATOR_HOST"
        ] = `localhost:${process.env.NEXT_PUBLIC_EMULATOR_STORAGE_PORT}`;
    }
};

export default setupLocalEmulator;
