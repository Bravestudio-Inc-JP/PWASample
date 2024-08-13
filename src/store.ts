import { create } from "zustand";
import { TokenSlice, createTokenSlice } from "./slices/token-slice";
import { ImageSlice, createImageSlice } from "./slices/image-slice";
import { PDFSlice, createPDFSlice } from "./slices/pdf-slice";

export const useMyStore = create<TokenSlice & ImageSlice & PDFSlice>()((...args) => ({
    ...createTokenSlice(...args),
    ...createImageSlice(...args),
    ...createPDFSlice(...args),
}));