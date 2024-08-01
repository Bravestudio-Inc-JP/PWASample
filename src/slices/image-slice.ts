import { StateCreator } from "zustand";
import db from "../db";

export type ImageSlice = {
    ogImageFile: File | null;
    compressedImageFile: Blob | null;
    setOgImageFile: (file: File) => void;
    setCompressedImageFile: (file: Blob) => void;
    restoreOgImageFile: () => Promise<void>;
};

export const createImageSlice: StateCreator<
    ImageSlice,
    [], // midlewares
    [], // listeners
    ImageSlice
> = (set) => ({
    ogImageFile: null,
    compressedImageFile: null,
    setOgImageFile: (file: File): void => {
        set({ ogImageFile: file });
        db.saveImage(file).catch(console.error);
    },
    setCompressedImageFile: (file: Blob): void => {
        set({ compressedImageFile: file });
    },
    restoreOgImageFile: async (): Promise<void> => {
        const file = await db.getImage();
        if (file) {
            console.log(`there's an image! ${file.name}`);
            set({ ogImageFile: file });
        }
    },
});