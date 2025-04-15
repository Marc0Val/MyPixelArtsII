import React from "react";
import { Moon, Sun } from "lucide-react";
import { useUIStore } from "../stores/uiStore";

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
      title={isDarkMode ? "Modo claro" : "Modo oscuro"}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};