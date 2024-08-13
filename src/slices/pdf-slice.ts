import { StateCreator } from "zustand";

export type PDFSlice = {
    numPages: number | null;
    setNumPages: (num: number) => void;
};

export const createPDFSlice: StateCreator<PDFSlice, [], [], PDFSlice> = (set) => ({
    numPages: null,
    setNumPages: (num: number): void => {
        set({ numPages: num });
    },
});