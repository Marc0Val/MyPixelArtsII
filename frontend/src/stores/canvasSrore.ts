import { create } from "zustand";
import { CanvasConfig } from "../types";

interface CanvasStore {
  canvasConfig: CanvasConfig;
  setCanvasConfig: (config: CanvasConfig) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasConfig: { width: 1000, height: 1000 },
  setCanvasConfig: (config) => set({ canvasConfig: config }),
}));
