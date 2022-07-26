declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_FIREBASE_CLIENT_APIKEY?: string;
            NEXT_PUBLIC_FIREBASE_CLIENT_AUTHDOMAIN?: string;
            NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID?: string;
            NEXT_PUBLIC_FIREBASE_CLIENT_STORAGEBUCKET?: string;
            NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGINGSENDERID?: string;
            NEXT_PUBLIC_FIREBASE_CLIENT_APPID?: string;
            NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT?: string;
            NEXT_PUBLIC_EMULATOR_AUTH_PORT?: string;
            NEXT_PUBLIC_EMULATOR_STORAGE_PORT?: string;
        }
    }
}
export {};
