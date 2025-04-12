// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // Cambia si usas proxy o prod
  withCredentials: true, // por si usas cookies/token httpOnly en el futuro
});

export default API;
