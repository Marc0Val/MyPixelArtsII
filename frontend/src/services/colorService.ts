// src/services/colorService.ts
import axios from "axios";
import { Color } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getColors = async (): Promise<Color[]> => {
  try {
    const response = await axios.get<Color[]>(`${API_URL}/colors`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los colores:", error);
    throw new Error("Error al obtener los colores");
  }
};
