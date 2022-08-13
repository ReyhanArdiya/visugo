import { uploadListingImage } from "..";
import { MockAuthUser } from "../../../../../../tests/utils/firestore-tests-utils";

export const createJpgFile = () => {
    return new File([""], "image.jpg", { type: "image/jpg" });
};

export const createJpegFile = () => {
    return new File([""], "image.jpeg", { type: "image/jpeg" });
};

export const createPngFile = () => {
    return new File([""], "image.png", { type: "image/png" });
};

export const uploadJpg = async (user: MockAuthUser, file = createJpgFile()) => {
    return await uploadListingImage(user.storage, user.id, file);
};

export const uploadJpeg = async (user: MockAuthUser, file = createJpegFile()) => {
    return await uploadListingImage(user.storage, user.id, file);
};

export const uploadPng = async (user: MockAuthUser, file = createPngFile()) => {
    return await uploadListingImage(user.storage, user.id, file);
};
