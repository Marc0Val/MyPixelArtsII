import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export const ContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const email = 'mvx944242x@gmail.com';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
        title="Contacto"
      >
        <Mail size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50">
          <h3 className="text-lg font-semibold mb-2">¿Tienes algo que compartir?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            ¿Quieres compartir tu obra? ¿Tienes alguna sugerencia o comentario?
            ¡Nos encantaría escucharte!
          </p>
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Mail size={16} />
            Enviar correo
          </a>
        </div>
      )}
    </div>
  );
};