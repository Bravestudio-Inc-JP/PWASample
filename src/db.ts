import Dexie, { type EntityTable } from "dexie";

interface ImageTable {
    id: number;
    file: File | Blob;
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
    images: "id, image",
    kv: "key, value",
});


const saveImage = async (file: File | Blob, id: number): Promise<void> => {
    await dexie.images.put({ id: id, file });
};
const getImage = async (id: number): Promise<File | Blob | undefined> => {
    const images = await dexie.images.toArray();
    const image = images.find(image => image.id === id);

    return image?.file;
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
