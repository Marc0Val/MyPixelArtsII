import { useEffect } from "react";
import { Canvas } from "./components/Canvas";
import { ColorPalette } from "./components/ColorPalette";
import { ZoomControls } from "./components/ZoomControls";
import { HelpPanel } from "./components/HelpPanel";
import { AdminPanel } from "./components/AdminPanel";
import { LoginPanel } from "./components/LoginPanel";
import { SocialLinks } from "./components/SocialLinks";
import { ContactButton } from "./components/ContactButton";
import { ScreenshotButton } from "./components/ScreenshotButton";
import { ThemeToggle } from "./components/ThemeToggle";
import { useCanvasStore } from "./stores/canvasSrore";
import { useColorStore } from "./stores/colorsStore";
import { useUIStore } from "./stores/uiStore";
import { useUserStore } from "./stores/userStore";
import { Palette } from "lucide-react";
import { getCanvasConfig } from "./services/canvasServices";
import { getColors } from "./services/colorService";

function App() {
  const { setCanvasConfig } = useCanvasStore();
  const { setColors } = useColorStore();
  const { setZoom, isDarkMode } = useUIStore();
  const { user } = useUserStore();

  useEffect(() => {
    setZoom(16);

    const loadInitialData = async () => {
      try {
        const [config, colors] = await Promise.all([
          getCanvasConfig(),
          getColors(),
        ]);
        setCanvasConfig(config);
        setColors(colors);
      } catch (error) {
        console.error("Error al cargar datos iniciales del backend:", error);
      }
    };

    loadInitialData();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-background-dark text-text-dark"
          : "bg-background-light text-text-light"
      }`}
    >
      <header
        className={`fixed top-0 left-0 right-0 shadow-md z-20 px-4 py-3 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette
              className="text-primary-light dark:text-primary-dark"
              size={24}
            />
            <h1 className="text-xl font-bold">MyPixelArtsII</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SocialLinks />
            <ContactButton />
            <HelpPanel />
            {user?.isAdmin ? <AdminPanel /> : <LoginPanel />}
          </div>
        </div>
      </header>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <ColorPalette />
      </div>

      <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
        <ScreenshotButton />
        <ZoomControls />
      </div>

      <main className="w-full h-screen overflow-hidden pt-14">
        <Canvas />
      </main>
    </div>
  );
}

export default App;
