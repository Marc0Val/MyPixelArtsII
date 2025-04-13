import axios from "axios";
import { Pixel } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getPixels = async (): Promise<Pixel[]> => {
  try {
    const response = await axios.get<Pixel[]>(`${API_URL}/pixels`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los pixeles:", error);
    throw new Error("Error al obtener los pixeles");
  }
};

export const paintPixel = async (
  x: number,
  y: number,
  color: string
): Promise<Pixel> => {
  try {
    const response = await axios.post<Pixel>(`${API_URL}/pixels`, {
      x,
      y,
      color,
    });
    return response.data;
  } catch (error) {
    console.error("Error al pintar el pixel:", error);
    throw new Error("Error al pintar el pixel");
  }
};
