import { create } from "zustand";

interface UIStore {
  zoom: number;
  isDarkMode: boolean;
  setZoom: (zoom: number) => void;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  zoom: 1,
  isDarkMode: false,
  setZoom: (zoom) => set({ zoom }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
