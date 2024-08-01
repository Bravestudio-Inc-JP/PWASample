import { StateCreator } from "zustand";
import db from "../db";

export type TokenSlice = {
    token: string | null;
    setToken: (token: string) => void;
    restoreToken: () => Promise<void>;
};

export const createTokenSlice: StateCreator<
    TokenSlice,
    [], // midlewares
    [], // listeners
    TokenSlice
> = (set) => ({
        token: null,
        setToken: (token: string): void => {
            set({ token });
            db.saveKv("fcmToken", token).catch(console.error);
        },
        restoreToken: async (): Promise<void> => {
            const token = await db.getKv("fcmToken");
            if (token) set({ token });
        }
    });