import { nanoid } from "nanoid";

const getUniqueFileId = (name: string) => {
    return `${nanoid()}_${Date.now().toString()}_${name}`;
};

export default getUniqueFileId;
