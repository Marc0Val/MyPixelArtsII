// src/services/canvasService.ts
import axios from "axios";
import { CanvasConfig, Color } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getCanvasConfig = async (): Promise<CanvasConfig> => {
  const response = await axios.get(`${API_URL}/canvas`);
  return response.data;
};

export const getColors = async (): Promise<Color[]> => {
  const response = await axios.get(`${API_URL}/colors`);
  return response.data;
};
