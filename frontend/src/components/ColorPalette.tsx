import React from "react";
import { useStore } from "../stores/useStore";
import { Move } from "lucide-react";
import clsx from "clsx";

export const ColorPalette: React.FC = () => {
  const { colors, selectedColor, setSelectedColor } = useStore();

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-md">
      <button
        className={clsx(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white",
          !selectedColor
            ? "border-blue-500"
            : "border-gray-200 hover:border-gray-300"
        )}
        onClick={() => setSelectedColor(null)}
        title="Modo navegación"
      >
        <Move
          size={16}
          className={!selectedColor ? "text-blue-500" : "text-gray-500"}
        />
      </button>
      {colors.map((color) => (
        <button
          key={color._id}
          className={clsx(
            "w-8 h-8 rounded-full border-2",
            selectedColor === color.hex
              ? "border-blue-500"
              : "border-gray-200 hover:border-gray-300"
          )}
          style={{ backgroundColor: color.hex }}
          onClick={() => setSelectedColor(color.hex)}
          title={color.name}
        />
      ))}
    </div>
  );
};
