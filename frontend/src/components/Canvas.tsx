// src/components/Canvas.tsx
import React, { useRef, useEffect, useState } from "react";
import { useStore } from "../stores/useStore";
// import { fetchPixels, paintPixel } from "../services/pixelService"; // NUEVO
import { getPixels, paintPixel } from "../services/pixelService";

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasConfig, pixels, setPixel, selectedColor, zoom, isDarkMode } =
    useStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = isDarkMode ? "#4a4a4a" : "#7d7c7c";
    ctx.lineWidth = 0.9;

    for (let x = 0; x <= canvasConfig.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * zoom, 0);
      ctx.lineTo(x * zoom, canvasConfig.height * zoom);
      ctx.stroke();
    }

    for (let y = 0; y <= canvasConfig.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * zoom);
      ctx.lineTo(canvasConfig.width * zoom, y * zoom);
      ctx.stroke();
    }
  };

  const drawPixels = (ctx: CanvasRenderingContext2D) => {
    pixels.forEach((pixel) => {
      ctx.fillStyle = pixel.color;
      ctx.fillRect(pixel.x * zoom, pixel.y * zoom, zoom, zoom);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawPixels(ctx);
  }, [canvasConfig, pixels, zoom, isDarkMode]);

  // 🧠 Obtener píxeles pintados desde el backend
  useEffect(() => {
    const loadPixels = async () => {
      try {
        const fetched = await getPixels(); // Llamada al servicio para obtener los píxeles
        fetched.forEach((p) => setPixel(p)); // Guardar en zustand
      } catch (error) {
        console.error("Error al cargar píxeles:", error);
      }
    };

    loadPixels();
  }, []);

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedColor) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / zoom);
    const y = Math.floor((e.clientY - rect.top) / zoom);

    if (x >= 0 && x < canvasConfig.width && y >= 0 && y < canvasConfig.height) {
      const newPixel = { x, y, color: selectedColor };

      try {
        // const saved = await paintPixel(newPixel); // Guardar en BD
        const saved = await paintPixel(x, y, selectedColor); // Guardar en BD
        setPixel(saved); // Actualizar en estado global
      } catch (err) {
        console.error("Error al pintar pixel:", err);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedColor) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || selectedColor) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const newOffset = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };

    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const minX = containerRect.width - canvasRect.width;
    const minY = containerRect.height - canvasRect.height;

    newOffset.x = Math.max(Math.min(newOffset.x, 0), minX);
    newOffset.y = Math.max(Math.min(newOffset.y, 0), minY);

    setOffset(newOffset);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        width={canvasConfig.width * zoom}
        height={canvasConfig.height * zoom}
        className={`absolute cursor-${selectedColor ? "crosshair" : "move"}`}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      />
    </div>
  );
};
