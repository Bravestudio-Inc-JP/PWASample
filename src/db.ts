import Dexie, { type EntityTable } from "dexie";

interface Image {
    id: number;
    file: File;
}

const dexie = new Dexie("ImageDB") as Dexie & {
    images: EntityTable<Image, "id">;
};

dexie.version(1).stores({
    images: "++id, image",
});


const saveImage = async (file: File): Promise<void> => {
    await dexie.images.add({ file });
};

// there's always going to be one image in the database
const getImage = async (): Promise<File | undefined> => {
    const image = await dexie.images.toArray();
    return image[0].file;
};

export const db = {
    saveImage,
    getImage
};
