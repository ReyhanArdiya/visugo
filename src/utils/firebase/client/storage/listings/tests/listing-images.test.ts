import {
    assertFails,
    assertSucceeds,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
    deleteObject,
    getBytes,
    getDownloadURL,
    getMetadata,
    listAll,
    ref,
    StorageReference,
    uploadBytes,
} from "firebase/storage";
import {
    deleteListingImage,
    getListingImage,
    getListingsFolderPath,
    listListingImages,
    updateListingImage,
    uploadListingImage,
} from "..";
import {
    cleanMockFirebase,
    MockAuthUser,
    MockUnauthUser,
    setupMockFirebase,
} from "../../../../../../tests/utils/firestore-tests-utils";
import {
    createJpegFile,
    createJpgFile,
    createPngFile,
    uploadJpeg,
    uploadJpg,
    uploadPng,
} from "./utils";

let rulesTestEnv: RulesTestEnvironment;
let authUser: MockAuthUser;
let unauthUser: MockUnauthUser;

beforeEach(async () => {
    const mockFirebase = await setupMockFirebase("1");

    rulesTestEnv = mockFirebase.testEnv;
    authUser = mockFirebase.authUser;
    unauthUser = mockFirebase.unauthUser;
});

afterEach(
    async () =>
        await cleanMockFirebase(rulesTestEnv, {
            firestore: false,
            storage: true,
        })
);

describe("Listings image CRUD utils", () => {
    test("uploadListingImage uploads images with valid extensions", async () => {
        await assertSucceeds(uploadJpg(authUser));
        await assertSucceeds(uploadJpeg(authUser));
        await assertSucceeds(uploadPng(authUser));
    });
    test("uploadListingImage rejects images with invalid extensions", async () => {
        await assertFails(
            uploadListingImage(
                authUser.storage,
                authUser.id,
                new File([""], "image.txt", { type: "text/plain" })
            )
        );
    });

    test("getListingImage gets one image download URLs from current authenticated user", async () => {
        const uploadedListingImage = await uploadJpg(authUser);

        const downloadUrl = await getListingImage(
            authUser.storage,
            authUser.id,
            uploadedListingImage.metadata.name
        );

        expect(downloadUrl).toBe(await getDownloadURL(uploadedListingImage.ref));
    });
    test("listListingImages lists all images download URLs from current authenticated user", async () => {
        const uploadedUrls = {
            [await getDownloadURL((await uploadJpg(authUser)).ref)]: true,
            [await getDownloadURL((await uploadJpeg(authUser)).ref)]: true,
            [await getDownloadURL((await uploadPng(authUser)).ref)]: true,
        };

        const imagesDownloadUrl = await listListingImages(
            authUser.storage,
            authUser.id
        );

        imagesDownloadUrl.forEach(async downloadUrl => {
            expect(uploadedUrls).toHaveProperty(downloadUrl);
        });
    });

    test("deleteListingImage deletes one of currently authenticated user's image", async () => {
        const image = await uploadJpeg(authUser);

        await assertSucceeds(
            deleteListingImage(authUser.storage, authUser.id, image.metadata.name)
        );
    });

    test("updateListingImage updates one of currently authenticated user's image", async () => {
        const image = await uploadJpeg(authUser);

        await assertSucceeds(
            updateListingImage(
                authUser.storage,
                authUser.id,
                image.metadata.name,
                createPngFile()
            )
        );

        const newImage = await getMetadata(ref(authUser.storage));

        expect(newImage.name).not.toBe(image.metadata.name);
    });
});

describe("Firebase storage rules", () => {
    describe("Authenticated users", () => {
        it("can upload an image", async () => {
            await assertSucceeds(
                uploadListingImage(authUser.storage, authUser.id, createJpgFile())
            );
        });

        it("can read one of their image", async () => {
            const image = await uploadJpg(authUser);

            await assertSucceeds(getBytes(image.ref));
        });
        it("can list their images", async () => {
            const image = await uploadJpg(authUser);

            await assertSucceeds(listAll(image.ref.parent as StorageReference));
        });

        it("can update an image", async () => {
            const image = await uploadJpeg(authUser);

            await assertSucceeds(
                updateListingImage(
                    authUser.storage,
                    authUser.id,
                    image.metadata.name,
                    createPngFile()
                )
            );
        });
        it("can delete an image", async () => {
            const image = await uploadJpeg(authUser);

            await assertSucceeds(
                deleteListingImage(
                    authUser.storage,
                    authUser.id,
                    image.metadata.name
                )
            );
        });
    });

    describe("Unauthenticated users", () => {
        it("can't upload an image", async () => {
            await assertFails(
                uploadBytes(
                    ref(unauthUser.storage, getListingsFolderPath("cant")),
                    createJpgFile()
                )
            );
        });

        it("can't read any image", async () => {
            const image = await uploadJpg(authUser);

            await assertFails(
                getMetadata(ref(unauthUser.storage, image.metadata.fullPath))
            );
        });
        it("can't list any images", async () => {
            const image = await uploadJpg(authUser);

            await assertFails(listAll(image.ref.parent as StorageReference));
        });

        it("can't update any image", async () => {
            const image = await uploadJpg(authUser);

            await assertFails(
                uploadBytes(
                    ref(unauthUser.storage, image.metadata.fullPath),
                    createJpegFile()
                )
            );
        });
        it("can't delete any image", async () => {
            const image = await uploadJpg(authUser);

            await assertFails(
                deleteObject(ref(unauthUser.storage, image.metadata.fullPath))
            );
        });
    });
});
