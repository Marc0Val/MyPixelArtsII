import { create } from "zustand";
import { Pixel } from "../types";
import { getPixels, paintPixel } from "../services/pixelService";

interface PixelStore {
  pixels: Pixel[];
  setPixel: (pixel: Pixel) => void;
  loadPixels: () => Promise<void>;
  paint: (x: number, y: number, color: string) => Promise<void>;
}

export const usePixelStore = create<PixelStore>((set) => ({
  pixels: [],
  setPixel: (pixel) =>
    set((state) => ({
      pixels: [
        ...state.pixels.filter((p) => p.x !== pixel.x || p.y !== pixel.y),
        pixel,
      ],
    })),
  loadPixels: async () => {
    try {
      const pixels = await getPixels();
      set({ pixels });
    } catch (error) {
      console.error("Error al cargar los píxeles", error);
    }
  },
  paint: async (x, y, color) => {
    try {
      const updatedPixel = await paintPixel(x, y, color);
      set((state) => ({
        pixels: [
          ...state.pixels.filter((p) => p.x !== x || p.y !== y),
          updatedPixel,
        ],
      }));
    } catch (error) {
      console.error("Error al pintar el píxel", error);
    }
  },
}));
