export interface CanvasConfig {
  width: number;
  height: number;
}

export interface Color {
  _id: string;
  name: string;
  hex: string;
}

export interface Pixel {
  x: number;
  y: number;
  color: string;
}

export interface User {
  id: string;
  isAdmin: boolean;
}