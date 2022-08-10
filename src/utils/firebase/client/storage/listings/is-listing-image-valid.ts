export const supportedListingImageFormats: Record<string, boolean> = {
    jpg: true,
    jpeg: true,
    png: true,
};

// REFAC could throw some nice errors here but I dont have time baebs
const isListingImageValid = (imageFile: File) => {
    let isValid = true;

    const extension = imageFile.name.split(".").at(-1);

    if (extension) {
        isValid = !!supportedListingImageFormats[extension];
    }

    return isValid;
};

export default isListingImageValid;
