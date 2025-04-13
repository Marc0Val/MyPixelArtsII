// src/services/canvasService.ts
import axios from "axios";
import { CanvasConfig } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getCanvasConfig = async (): Promise<CanvasConfig> => {
  try {
    const response = await axios.get<CanvasConfig>(`${API_URL}/canvas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la configuración del lienzo:", error);
    throw new Error("Error al obtener la configuración del lienzo");
  }
};
