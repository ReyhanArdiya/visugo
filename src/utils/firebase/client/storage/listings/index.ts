import { FirebaseStorage, ref, StorageReference } from "firebase/storage";
import getUniqueFileId from "../get-unique-file-id";

export const getListingFileId = (
    storage: FirebaseStorage,
    userId: string,
    listingRef: StorageReference
) => ref(storage, `users/${userId}/listings/${getUniqueFileId(listingRef)}`);
