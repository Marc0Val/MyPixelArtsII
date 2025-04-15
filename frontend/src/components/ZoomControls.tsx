import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useUIStore } from "../stores/uiStore";

export const ZoomControls: React.FC = () => {
  const { zoom, setZoom } = useUIStore();

  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.5, 30));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom / 1.5, 5));
  };

  return (
    <div className="flex gap-2 p-2 bg-white rounded-lg shadow-md">
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Zoom Out"
        disabled={zoom <= 5}
      >
        <ZoomOut size={20} className={zoom <= 5 ? "text-gray-400" : ""} />
      </button>
      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Zoom In"
        disabled={zoom >= 50}
      >
        <ZoomIn size={20} className={zoom >= 50 ? "text-gray-400" : ""} />
      </button>
    </div>
  );
};