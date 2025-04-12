/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', // Azul para modo claro
          dark: '#6366f1',  // Azul para modo oscuro
        },
        background: {
          light: '#f3f4f6', // Fondo claro
          dark: '#1f2937',  // Fondo oscuro
        },
        text: {
          light: '#1f2937', // Texto oscuro
          dark: '#f3f4f6',  // Texto claro
        },
      },
      screens: {
        xs: '480px', // Extra pequeño
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};