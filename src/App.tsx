import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Play, Pause } from "lucide-react";
import Navbar, { PageView } from "./components/Navbar";
import SpecsWidget from "./components/SpecsWidget";
import AudioRevStation from "./components/AudioRevStation";
import DetailStation from "./components/DetailStation";
import DetailsPage from "./components/DetailsPage";
import GalleryPage from "./components/GalleryPage";
import OurCompanyPage from "./components/OurCompanyPage";
import { VEHICLES } from "./data";

export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePage, setActivePage] = useState<PageView>("home");
  // Transition state: the page actually rendered, exit flag, and scheduled next page
  const [displayedPage, setDisplayedPage] = useState<PageView>("home");
  const [isExiting, setIsExiting] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((page: PageView) => {
    if (page === displayedPage && !isExiting) return;
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setIsExiting(true);
    setActivePage(page); // store intention immediately
    exitTimerRef.current = setTimeout(() => {
      setDisplayedPage(page);
      setIsExiting(false);
    }, 350); // matches pageExit duration
  }, [displayedPage, isExiting]);

  // Maintain separate painted exterior names per vehicle for full configurable personalization
  const [paints, setPaints] = useState<Record<string, { name: string; hex: string }>>({
    r8: { name: "Ice Silver Metallic", hex: "#A8A9AD" },
    etron: { name: "Satellite Silver Metallic", hex: "#C8CACF" },
    rs6: { name: "Mythos Black Metallic", hex: "#000000" }
  });

  const currentVehicle = VEHICLES[activeIdx] || VEHICLES[0];
  const activePaint = paints[currentVehicle.id] || { name: "Standard Metallic", hex: currentVehicle.accentHex };

  // Automated Showcase Slideshow rotation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % VEHICLES.length);
    }, 7000); // cycle every 7 seconds
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle color customization selects from laboratory spec panels
  const handleColorSelect = (colorName: string, hex: string) => {
    setPaints((prev) => ({
      ...prev,
      [currentVehicle.id]: { name: colorName, hex }
    }));
  };

  // Overlay Gradient Map based on selected model
  const getOverlayGradient = () => {
    switch (currentVehicle.id) {
      case "etron":
        // Gold / Amber Tinted Black electric vibe
        return "from-zinc-950/95 via-amber-950/50 to-transparent";
      case "rs6":
        // Deep Charcoal Teal-tinted wagon vibe
        return "from-zinc-950/95 via-slate-900/60 to-transparent";
      case "r8":
      default:
        // Audi Red / Burgundy classic layout
        return "from-red-950/90 via-red-900/55 to-transparent";
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950 text-white select-none font-sans">

      {/* 1. Backdrop Full-Bleed Images under a beautiful smooth crossfade */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {VEHICLES.map((vehicle, idx) => (
          <div
            key={vehicle.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${idx === activeIdx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
          >
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-neutral-950/30 lg:bg-transparent z-10 pointer-events-none" />
            <img
              src={vehicle.image}
              alt={vehicle.modelName}
              className="w-full h-full object-cover object-[center_right] md:object-right-bottom scale-100"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      {/* 2. Left-Side Sharp Angular Overlay */}
      <div
        className={`absolute inset-y-0 left-0 w-full lg:w-[60vw] bg-gradient-to-r ${getOverlayGradient()} clip-diagonal-audi transition-all duration-1000 ease-in-out z-10`}
      />

      {/* 3. Deep Vignette Mask (guarantees text high-contrast regardless of backdrops) */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/65 pointer-events-none z-10" />

      {/* 4. Sub-Pages (Rendered as distinct layers but under the Navbar) */}
      <div className="absolute inset-0 z-40 overflow-hidden pointer-events-none">
        {displayedPage !== "home" && (
          <div
            key={displayedPage}
            className={`pointer-events-auto h-full overflow-y-auto ${isExiting ? "page-exit" : "page-enter"}`}
          >
            {displayedPage === "details" && (
              <DetailsPage
                activeVehicleId={currentVehicle.id}
                onClose={() => navigateTo("home")}
                onSelectModel={(id) => {
                  const foundIdx = VEHICLES.findIndex((v) => v.id === id);
                  if (foundIdx !== -1) setActiveIdx(foundIdx);
                }}
              />
            )}
            {displayedPage === "gallery" && (
              <GalleryPage
                activeVehicleId={currentVehicle.id}
                onClose={() => navigateTo("home")}
                onSelectModel={(id) => {
                  const foundIdx = VEHICLES.findIndex((v) => v.id === id);
                  if (foundIdx !== -1) setActiveIdx(foundIdx);
                }}
              />
            )}
            {displayedPage === "company" && (
              <OurCompanyPage onClose={() => navigateTo("home")} />
            )}
          </div>
        )}
      </div>

      {/* 5. Navigation Menu Header (STAYS ON TOP) */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar
            activeId={currentVehicle.id}
            activePage={activePage}
            onNavigate={(page) => {
              navigateTo(page);
              if (page !== "home") setIsPlaying(false);
            }}
            onSelectModel={(id) => {
              const foundIdx = VEHICLES.findIndex((v) => v.id === id);
              if (foundIdx !== -1) {
                setActiveIdx(foundIdx);
                setIsPlaying(false);
              }
            }}
          />
        </div>
      </div>

      {/* 6. Subtle Vertical Text & Status Pillar (Far Left Margin) - Hidden on sub-pages */}
      {displayedPage === "home" && (
        <div
          key={`home-pillar-${displayedPage}`}
          className={`absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 ${isExiting ? "page-exit" : "animate-fade-in"}`}
        >
          <div className="w-[1.5px] h-12 bg-white/10" />
          <div className="font-display font-black text-6xl md:text-8xl tracking-[0.2em] text-transparent select-none uppercase rotate-180 vertical-text"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}>
            {currentVehicle.verticalModel}
          </div>
          <div className="w-[1.5px] h-12 bg-white/10" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 border rounded-full transition-all flex items-center justify-center ${isPlaying ? "border-red-500/30 text-red-500 bg-red-950/10" : "border-white/10 text-zinc-500"
              }`}
            title={isPlaying ? "Pause Automated Slideshow" : "Start Auto Cycling"}
            id="btn-play-slideshow"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* 7. Hero Typography & Content - Only on Home */}
      {displayedPage === "home" && (
        <div
          key={`home-hero-${displayedPage}`}
          className={`absolute left-16 md:left-28 lg:left-36 top-[20%] md:top-[24%] max-w-sm sm:max-w-md lg:max-w-xl z-20 flex flex-col justify-center text-left pointer-events-none ${isExiting ? "page-exit" : "animate-fade-in"}`}
        >
          <div className="flex items-center gap-2 mb-2 font-mono text-[9px] tracking-[0.25em] text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-none border border-white/20 inline-block" style={{ backgroundColor: activePaint.hex }} />
            <span>SPECIFICATION: {activePaint.name.toUpperCase()}</span>
          </div>
          <h1 className="font-display font-black text-[3.2rem] sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] uppercase">
            {currentVehicle.modelName}
          </h1>
          <p className="mt-4 text-xs md:text-sm text-zinc-300 leading-relaxed max-w-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
            {currentVehicle.description}
          </p>
          <div className="mt-8 pointer-events-auto flex items-center gap-4">
            <button
              onClick={() => setShowDetails(true)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white/5 active:scale-95 transition-all animate-bounce-slow"
              title="Open Configurator & Details"
            >
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="text-[10px] tracking-[0.3em] font-mono text-zinc-400 hover:text-white uppercase transition-colors"
            >
              LABORATORY SPEC & CUSTOM COLOR
            </button>
          </div>
        </div>
      )}




      {/* 9. Right-Side Paginations - Only on Home */}
      {displayedPage === "home" && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4 animate-fade-in">
          {VEHICLES.map((v, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPlaying(false);
                }}
                className={`relative transition-all duration-300 focus:outline-none ${isActive ? "w-6 h-1.5 bg-white" : "w-2.5 h-1.5 bg-zinc-600 hover:bg-zinc-400"
                  }`}
                title={`View ${v.modelName}`}
              >
                {isActive && (
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-mono text-[9px] text-zinc-400 tracking-widest uppercase color-white">
                    {v.verticalModel}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 10. Laboratory Drawer */}
      {showDetails && (
        <DetailStation
          vehicle={currentVehicle}
          activeColorName={activePaint.name}
          onSelectColor={handleColorSelect}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* 11. Tiny corner identifier */}
      <div className="absolute left-6 bottom-4 z-20 hidden md:block font-mono text-[8px] text-zinc-600 tracking-widest">
        ENGINEERING EXPERIMENT 2a93 // CONCORDE DESIGN
      </div>
    </div>
  );
}
