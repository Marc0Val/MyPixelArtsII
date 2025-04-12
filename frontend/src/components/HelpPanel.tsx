import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export const HelpPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Ayuda"
      >
        <HelpCircle size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-6 z-50">
          <h3 className="text-xl font-bold mb-4 text-gray-800">¿Cómo usar MyPixelArtsII?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="font-medium text-blue-500">1.</span>
              <span>Selecciona un color de la paleta o el modo navegación para moverte por el lienzo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-blue-500">2.</span>
              <span>Haz clic en el lienzo para pintar un píxel con el color seleccionado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-blue-500">3.</span>
              <span>Usa los controles de zoom para acercar o alejar la vista</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-blue-500">4.</span>
              <span>Arrastra el lienzo para moverte por él cuando estés en modo navegación</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};