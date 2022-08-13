import {
    deleteObject,
    FirebaseStorage,
    getDownloadURL,
    list,
    ListOptions,
    ref,
    uploadBytes,
} from "firebase/storage";
import getUniqueFileId from "../get-unique-file-id";
import isListingImageValid from "./is-listing-image-valid";

export const getListingsFolderPath = (userId: string) => `users/${userId}/listings`;

export const getListingFileId = (
    storage: FirebaseStorage,
    userId: string,
    name: string
) => ref(storage, `${getListingsFolderPath(userId)}/${getUniqueFileId(name)}`);

export const uploadListingImage = async (
    storage: FirebaseStorage,
    userId: string,
    imageFile: File
) => {
    if (isListingImageValid(imageFile)) {
        return await uploadBytes(
            getListingFileId(storage, userId, imageFile.name),
            imageFile
        );
    }

    throw new Error("Image is not a valid extension!");
};

export const deleteListingImage = async (
    storage: FirebaseStorage,
    userId: string,
    imageName: string
) => {
    return await deleteObject(
        ref(storage, `${getListingsFolderPath(userId)}/${imageName}`)
    );
};

export const getListingImage = async (
    storage: FirebaseStorage,
    userId: string,
    imageName: string
) => {
    return await getDownloadURL(
        ref(storage, `${getListingsFolderPath(userId)}/${imageName}`)
    );
};

export const listListingImages = async (
    storage: FirebaseStorage,
    userId: string,
    options: ListOptions = {
        maxResults: 10,
        pageToken: null,
    }
) => {
    const res = await list(ref(storage, getListingsFolderPath(userId)), options);

    const items: string[] = [];

    res.items.forEach(async ref => items.push(await getDownloadURL(ref)));

    const listResults = {
        items,
        nextPageToken: res.nextPageToken,
    };

    return listResults;
};

export const updateListingImage = async (
    storage: FirebaseStorage,
    userId: string,
    imageName: string,
    newImage: File
) => {
    if (isListingImageValid(newImage)) {
        return await uploadBytes(
            ref(storage, `${getListingsFolderPath(userId)}/${imageName}`),
            newImage
        );
    } else {
        throw new Error("Image is not a valid extension!");
    }
};
