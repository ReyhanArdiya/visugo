import { StorageReference } from "firebase/storage";
import getUniqueFileId from "./get-unique-file-id";

const getListingFileId = (listingRef: StorageReference) =>
    getUniqueFileId(listingRef);

export default getListingFileId;
