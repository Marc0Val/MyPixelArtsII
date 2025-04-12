import React, { useEffect } from 'react';
import { Canvas } from './components/Canvas';
import { ColorPalette } from './components/ColorPalette';
import { ZoomControls } from './components/ZoomControls';
import { HelpPanel } from './components/HelpPanel';
import { AdminPanel } from './components/AdminPanel';
import { LoginPanel } from './components/LoginPanel';
import { SocialLinks } from './components/SocialLinks';
import { ContactButton } from './components/ContactButton';
import { ScreenshotButton } from './components/ScreenshotButton';
import { ThemeToggle } from './components/ThemeToggle';
import { useStore } from './stores/useStore';
import { Palette } from 'lucide-react';

function App() {
  const { user, setZoom, isDarkMode } = useStore();

  useEffect(() => {
    setZoom(16);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'
      }`}
    >
      <header
        className={`fixed top-0 left-0 right-0 shadow-md z-20 px-4 py-3 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="text-primary-light dark:text-primary-dark" size={24} />
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