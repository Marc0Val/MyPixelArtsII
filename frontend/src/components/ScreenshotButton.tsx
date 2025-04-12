import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { toPng } from 'html-to-image';

export const ScreenshotButton: React.FC = () => {
  const handleScreenshot = async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      const dataUrl = await toPng(canvas, {
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = 'my-pixel-art.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error al generar la captura:', error);
    }
  };

  return (
    <button
      onClick={handleScreenshot}
      className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
      title="Capturar lienzo"
    >
      <Camera size={20} />
    </button>
  );
};