// src/stores/useStore.ts
import { create } from "zustand";
import { Color, Pixel, CanvasConfig, User } from "../types";

interface Store {
  canvasConfig: CanvasConfig;
  colors: Color[];
  pixels: Pixel[];
  selectedColor: string | null;
  zoom: number;
  user: User | null;
  isDarkMode: boolean;
  setCanvasConfig: (config: CanvasConfig) => void;
  setColors: (colors: Color[]) => void;
  addColor: (color: Color) => void;
  removeColor: (id: string) => void;
  setPixel: (pixel: Pixel) => void;
  setSelectedColor: (color: string | null) => void;
  setZoom: (zoom: number) => void;
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  canvasConfig: { width: 1000, height: 1000 },
  colors: [],
  pixels: [],
  selectedColor: null,
  zoom: 1,
  user: null,
  isDarkMode: false,
  setCanvasConfig: (config) => set({ canvasConfig: config }),
  setColors: (colors) => set({ colors }),
  addColor: (color) => set((state) => ({ colors: [...state.colors, color] })),
  removeColor: (id) =>
    set((state) => ({
      colors: state.colors.filter((c) => c.id !== id),
    })),
  setPixel: (pixel) =>
    set((state) => ({
      pixels: [
        ...state.pixels.filter((p) => p.x !== pixel.x || p.y !== pixel.y),
        pixel,
      ],
    })),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setZoom: (zoom) => set({ zoom }),
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));