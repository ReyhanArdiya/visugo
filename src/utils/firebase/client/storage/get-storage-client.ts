import { FirebaseApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const getStorageClient = (app: FirebaseApp) => getStorage(app);

export default getStorageClient;
