// src/services/colorService.ts
import API from "./api";
import { Color } from "../types";

export const fetchColors = async (): Promise<Color[]> => {
  const response = await API.get("/colors");
  return response.data;
};
