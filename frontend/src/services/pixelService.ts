import axios from "axios";
import { Pixel } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Funcion para obtener todos los pixeles del lienzo
export const getPixels = async (): Promise<Pixel[]> => {
  // en este se usara try/catch para manejar errores, implementar en los demas a futuro
  try {
    const response = await axios.get(`${API_URL}/pixels`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los pixeles:", error);
    throw new Error("Error al obtener los pixeles");
  }
};

// Funcion para pintar un pixel en una posicion especifica
export const paintPixel = async (
  x: number,
  y: number,
  color: string
): Promise<Pixel> => {
  try {
    const response = await axios.post(`${API_URL}/pixels`, { x, y, color });
    return response.data;
  } catch (error) {
    console.error("Error al pintar el pixel:", error);
    throw new Error("Error al pintar el pixel");
  }
};
