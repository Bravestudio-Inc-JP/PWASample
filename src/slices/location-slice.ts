import { StateCreator } from "zustand";

export type LocationSlice = {
    location: { lat: number, lon: number } | null;
    locationStatus: string | null;
    setLocation: (lat: number, lon: number) => void;
    setLocationStatus: (status: string) => void;
};

export const createLocationSlice: StateCreator<LocationSlice, [], [], LocationSlice> = (set) => ({
    location: null,
    locationStatus: null,
    setLocation: (lat: number, lon: number): void => {
        set({ location: { lat, lon } });
    },
    setLocationStatus: (status: string): void => {
        set({ locationStatus: status });
    },
});