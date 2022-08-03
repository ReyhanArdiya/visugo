import { FirebaseApp } from "firebase/app";
import {
    enableIndexedDbPersistence,
    FirestoreError,
    getFirestore,
} from "firebase/firestore";

const getFirestoreClient = (app: FirebaseApp, offline = true) => {
    const db = getFirestore(app);

    // TODO add more checkings if we need to handle sensitive data
    if (process.env.NODE_ENV === "production" && offline) {
        enableIndexedDbPersistence(db)
            .then(() => console.info("Offline support added!"))
            .catch((err: FirestoreError) => {
                switch (err.code) {
                    case "unimplemented":
                        console.error("Offline mode not supported!");
                        break;

                    case "failed-precondition":
                        console.error(
                            "App already opened in another tab, can't use offline mode!"
                        );
                        break;

                    default:
                        console.error(err.message);
                        break;
                }
            });
    }

    return db;
};

export default getFirestoreClient;
