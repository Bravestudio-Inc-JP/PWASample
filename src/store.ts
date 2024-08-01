import { create } from "zustand";
import { TokenSlice, createTokenSlice } from "./slices/token-slice";
import { ImageSlice, createImageSlice } from "./slices/image-slice";

export const useMyStore = create<TokenSlice & ImageSlice>()((...args) => ({
        ...createTokenSlice(...args),
        ...createImageSlice(...args),
    }));