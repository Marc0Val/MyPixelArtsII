import { create } from "zustand";
import { Color, Pixel, CanvasConfig, User } from "../types";
import { getPixels, paintPixel } from "../services/pixelService"; // Importamos el servicio

interface Store {
  canvasConfig: CanvasConfig;
  colors: Color[];
  pixels: Pixel[];
  selectedColor: string | null;
  zoom: number;
  user: User | null;
  isDarkMode: boolean;
  setCanvasConfig: (config: CanvasConfig) => void;
  addColor: (color: Color) => void;
  removeColor: (id: string) => void;
  setPixel: (pixel: Pixel) => void;
  setSelectedColor: (color: string | null) => void;
  setColors: (colors: Color[]) => void; // Función para establecer los colores
  setZoom: (zoom: number) => void;
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
  loadPixels: () => void; // Función para cargar los píxeles desde el backend
  paint: (x: number, y: number, color: string) => void; // Función para pintar un píxel
}

const initialColors: Color[] = [
  { id: "1", name: "Red", hex: "#FF0000" },
  { id: "2", name: "Blue", hex: "#0000FF" },
  { id: "3", name: "Green", hex: "#00FF00" },
  { id: "4", name: "Yellow", hex: "#FFFF00" },
  { id: "5", name: "Black", hex: "#000000" },
  { id: "6", name: "White", hex: "#FFFFFF" },
  { id: "7", name: "Purple", hex: "#800080" },
  { id: "8", name: "Orange", hex: "#FFA500" },
  { id: "9", name: "Brown", hex: "#A52A2A" },
  { id: "10", name: "Pink", hex: "#FFC0CB" },
];

export const useStore = create<Store>((set) => ({
  setColors: (colors) => set({ colors }), // Función para establecer los colores
  canvasConfig: { width: 1000, height: 1000 },
  colors: initialColors,
  pixels: [],
  selectedColor: null,
  zoom: 1,
  user: null,
  isDarkMode: false,
  setCanvasConfig: (config) => set({ canvasConfig: config }),
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
  loadPixels: async () => {
    try {
      const pixels = await getPixels(); // Llamada al servicio para obtener los píxeles
      set({ pixels });
    } catch (error) {
      console.error("Error al cargar los píxeles", error);
    }
  },
  paint: async (x, y, color) => {
    try {
      const updatedPixel = await paintPixel(x, y, color); // Llamada al servicio para pintar un píxel
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
