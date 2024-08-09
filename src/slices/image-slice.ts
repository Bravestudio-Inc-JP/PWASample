import { StateCreator } from "zustand";
import db from "../db";
import * as EXIF from "exifreader";

export type ImageSlice = {
    ogImageFile: { id: number, file: File | Blob } | null;
    compressedImageFile: Blob | null;
    locationUrl: string | null;
    setLocationUrl: (image: File | Blob) => void;
    setOgImageFile: (file: Blob | File, id: number) => void;
    setCompressedImageFile: (file: Blob) => void;
    restoreOgImageFile: (id: number) => Promise<void>;
};

export const createImageSlice: StateCreator<
    ImageSlice,
    [], // midlewares
    [], // listeners
    ImageSlice
> = (set) => ({
    ogImageFile: null,
    compressedImageFile: null,
    locationUrl: null,
    setOgImageFile: (file: Blob | File, id: number): void => {
        set({ ogImageFile: { id, file } });
        db.saveImage(file, id).catch(console.error);
    },
    setCompressedImageFile: (file: Blob): void => {
        set({ compressedImageFile: file });
    },
    restoreOgImageFile: async (id: number): Promise<void> => {
        const file = await db.getImage(id);
        if (file) {
            if (file instanceof File) {
                console.log(`There's a file! ${file.name}`);
            }
            set({ ogImageFile: { file, id } });
        }
    },
    setLocationUrl: async (image: Blob | File): Promise<void> => {
        let tags: EXIF.Tags;
        if (image instanceof File) {
            tags = await EXIF.load(image);
        } else {
            const arrayBuffer = await image.arrayBuffer();
            tags = await EXIF.load(arrayBuffer);
        }

        const latitude = getCoordinate(
            tags.GPSLatitude?.value as unknown as GPSCoordinate,
            tags.GPSLatitudeRef
        );

        const longitude = getCoordinate(
            tags.GPSLongitude?.value as unknown as GPSCoordinate,
            tags.GPSLongitudeRef
        );

        if (latitude !== null && longitude !== null) {
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            set({ locationUrl: googleMapsUrl });
        } else {
            console.log("No GPS data found in the image.");
        }
    },
});

type GPSCoordinate = [number, number][] | undefined;

const getCoordinate = (
    coordinate: GPSCoordinate,
    ref: EXIF.StringArrayTag | undefined | EXIF.XmpTag
): number | null => {
    if (!coordinate || !ref || !ref.value) return null;
    // Convert the GPS coordinate parts (degrees, minutes, seconds) to decimal form
    const degrees = coordinate[0][0] / coordinate[0][1];
    const minutes = coordinate[1][0] / coordinate[1][1];
    const seconds = coordinate[2][0] / coordinate[2][1];

    let decimal = degrees + (minutes / 60) + (seconds / 3600);

    // Check if ref.value is an array of strings
    if (Array.isArray(ref.value) && typeof ref.value[0] === "string") {
        const direction = ref.value[0];

        if (direction === "S" || direction === "W") {
            decimal = -decimal;
        }
    }

    return decimal;
};