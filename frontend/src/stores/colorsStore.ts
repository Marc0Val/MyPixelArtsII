import { create } from "zustand";
import { Color } from "../types";

interface ColorStore {
  colors: Color[];
  selectedColor: string | null;
  setColors: (colors: Color[]) => void;
  addColor: (color: Color) => void;
  removeColor: (id: string) => void;
  setSelectedColor: (color: string | null) => void;
}

export const useColorStore = create<ColorStore>((set) => ({
  colors: [],
  selectedColor: null,
  setColors: (colors) => set({ colors }),
  addColor: (color) => set((state) => ({ colors: [...state.colors, color] })),
  removeColor: (id) =>
    set((state) => ({
      colors: state.colors.filter((c) => c._id !== id),
    })),
  setSelectedColor: (color) => set({ selectedColor: color }),
}));
