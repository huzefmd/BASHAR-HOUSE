import React, { useState, createContext, useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import HorizontalNavigation from "@/components/HorizontalNavigation";
import Index from "./pages/Index";
import About from "./pages/About";
import Studio from "./pages/Studio";
import Cafe from "./pages/Cafe";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface NavigationMenuContextValue {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  toggleMenu: () => {},
  isMenuOpen: false,
});

export const useNavigationMenu = () => useContext(NavigationMenuContext);

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoadingComplete = () => setIsLoading(false);
  const handleBottomNavToggle = () => setIsMenuOpen((open) => !open);

  return (
    <NavigationMenuContext.Provider
      value={{ toggleMenu: handleBottomNavToggle, isMenuOpen }}
    >
      <div className="relative min-h-screen">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

        <main
          className={`transition-opacity duration-1000 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <HorizontalNavigation
          isExpanded={isMenuOpen}
          onToggle={handleBottomNavToggle}
        />
      </div>
    </NavigationMenuContext.Provider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
