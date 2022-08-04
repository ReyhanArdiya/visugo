import { StorageReference } from "firebase/storage";
import { nanoid } from "nanoid";

const getUniqueFileId = ({ name }: StorageReference) => {
    return `${nanoid()}_${Date.now().toString()}_${name}.${name.split(".").at(-1)}`;
};

export default getUniqueFileId;
