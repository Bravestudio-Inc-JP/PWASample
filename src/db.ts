import Dexie, { type EntityTable } from "dexie";

interface ImageTable {
    id: number;
    file: File;
}

interface KvTable {
    key: string;
    value: string;
}

const dexie = new Dexie("PwaSampleDB") as Dexie & {
    images: EntityTable<ImageTable, "id">;
    kv: EntityTable<KvTable, "key">;
};

dexie.version(1).stores({
    images: "++id, image",
    kv: "key, value",
});


const saveImage = async (file: File): Promise<void> => {
    await dexie.images.put({ id: 1, file });
};

// there's always going to be one image in the database
const getImage = async (): Promise<File | undefined> => {
    const image = await dexie.images.toArray();
    return image[0].file;
};

const saveKv = async (key: string, value: string): Promise<void> => {
    await dexie.kv.put({ key, value });
};

const getKv = async (key: string): Promise<string | undefined> => {
    const kv = await dexie.kv.get(key);
    return kv?.value;
};

export default {
    saveImage,
    getImage,
    saveKv,
    getKv,
};
