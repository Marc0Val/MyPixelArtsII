import React, { useState } from "react";
import { useCanvasStore } from "../stores/canvasSrore";
import { useColorStore } from "../stores/colorsStore";
import { usePixelStore } from "../stores/pixelsStore";
import { useUserStore } from "../stores/userStore";
import { LogOut, Plus, Trash } from "lucide-react";

export const AdminPanel: React.FC = () => {
  const { canvasConfig, setCanvasConfig } = useCanvasStore();
  const { colors, addColor, removeColor } = useColorStore();
  const { pixels } = usePixelStore();
  const { setUser } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });
  const [newSize, setNewSize] = useState({
    width: canvasConfig.width,
    height: canvasConfig.height,
  });

  const handleAddColor = (e: React.FormEvent) => {
    e.preventDefault();
    addColor({
      _id: Date.now().toString(),
      name: newColor.name,
      hex: newColor.hex,
    });
    setNewColor({ name: "", hex: "#000000" });
  };

  const handleRemoveColor = (id: string, hex: string) => {
    if (pixels.some((pixel) => pixel.color === hex)) {
      alert("No se puede eliminar un color que está en uso en el lienzo");
      return;
    }
    removeColor(id);
  };

  const handleUpdateSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newSize.width < canvasConfig.width ||
      newSize.height < canvasConfig.height
    ) {
      alert("Solo se permite aumentar las dimensiones del lienzo");
      return;
    }
    setCanvasConfig(newSize);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Panel Admin
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Panel de Administración</h2>
            <button
              onClick={() => setUser(null)}
              className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleUpdateSize} className="space-y-2">
              <h3 className="font-semibold">Dimensiones del lienzo</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newSize.width}
                  onChange={(e) =>
                    setNewSize({ ...newSize, width: parseInt(e.target.value) })
                  }
                  min={canvasConfig.width}
                  className="border rounded px-2 py-1 w-24"
                  placeholder="Ancho"
                />
                <input
                  type="number"
                  value={newSize.height}
                  onChange={(e) =>
                    setNewSize({ ...newSize, height: parseInt(e.target.value) })
                  }
                  min={canvasConfig.height}
                  className="border rounded px-2 py-1 w-24"
                  placeholder="Alto"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Actualizar
                </button>
              </div>
            </form>

            <form onSubmit={handleAddColor} className="space-y-2">
              <h3 className="font-semibold">Agregar color</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newColor.name}
                  onChange={(e) =>
                    setNewColor({ ...newColor, name: e.target.value })
                  }
                  className="border rounded px-2 py-1 flex-1"
                  placeholder="Nombre del color"
                  required
                />
                <input
                  type="color"
                  value={newColor.hex}
                  onChange={(e) =>
                    setNewColor({ ...newColor, hex: e.target.value })
                  }
                  className="w-12 h-9"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  <Plus size={20} />
                </button>
              </div>
            </form>

            <div>
              <h3 className="font-semibold mb-2">Colores disponibles</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {colors.map((color) => (
                  <div
                    key={color._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveColor(color._id, color.hex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
