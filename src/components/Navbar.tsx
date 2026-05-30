import React, { useState } from "react";
import { Search, X } from "lucide-react";

export type PageView = "home" | "details" | "gallery" | "company";

interface NavbarProps {
  onSelectModel: (id: string) => void;
  activeId: string;
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export default function Navbar({ onSelectModel, activeId, activePage, onNavigate }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: "MODELS", page: "home" },
    { label: "DETAILS", page: "details" },
    { label: "GALLERY", page: "gallery" },
    { label: "OUR COMPANY", page: "company" },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-black/40 to-transparent">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-1 group cursor-pointer" onClick={() => { onSelectModel("r8"); onNavigate("home"); }}>
          <svg
            className="h-6 md:h-8 text-white transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 100 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            id="brand-logo-rings"
          >
            <circle cx="20" cy="20" r="12" />
            <circle cx="40" cy="20" r="12" />
            <circle cx="60" cy="20" r="12" />
            <circle cx="80" cy="20" r="12" />
          </svg>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.3em] font-semibold text-zinc-400 pl-2 group-hover:text-white transition-colors">
            AUTOMOTIVE
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center justify-center gap-10">
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className={`relative text-xs tracking-[0.25em] font-bold transition-colors py-2 uppercase focus:outline-none group ${isActive ? "text-white" : "text-zinc-300 hover:text-white"}`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-red-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            );
          })}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-zinc-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Search models"
            id="btn-search-trigger"
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            id="btn-mobile-menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-3/4 h-0.5 bg-white self-end transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Search Panel */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-6">
          <button onClick={() => setSearchOpen(false)} className="absolute top-6 right-6 md:right-12 p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all" id="btn-close-search">
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-2xl text-center space-y-8">
            <h3 className="font-mono text-xs tracking-[0.4em] text-red-500 uppercase">INSTANT MODEL RETRIEVAL</h3>
            <div className="relative">
              <input autoFocus type="text" placeholder="Search models (e.g. R8, GT, Avant)..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-red-500 px-4 py-4 text-2xl md:text-4xl text-center font-display font-light text-white placeholder-zinc-700 outline-none transition-colors"
                id="search-input-field" />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 w-6 h-6" />
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {["R8 Spyder", "E-Tron GT", "RS 6 Avant", "Quattro Performance"].map((sugg) => (
                <button key={sugg} onClick={() => {
                  setSearchQuery(sugg);
                  if (sugg.toLowerCase().includes("r8")) onSelectModel("r8");
                  else if (sugg.toLowerCase().includes("e-tron") || sugg.toLowerCase().includes("gt")) onSelectModel("etron");
                  else if (sugg.toLowerCase().includes("rs 6") || sugg.toLowerCase().includes("avant")) onSelectModel("rs6");
                  onNavigate("home");
                  setSearchOpen(false);
                }} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-white transition-all tracking-wider font-mono">
                  {sugg}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-zinc-950/98 z-40 lg:hidden flex flex-col justify-between p-8 pt-28">
          <div className="space-y-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">QUICK SELECT VEHICLE</p>
            <div className="flex flex-col gap-6">
              {[{ name: "R8 SPYDER V10", id: "r8" }, { name: "RS ELECTRIC GT", id: "etron" }, { name: "RS 6 SPORT WAGON", id: "rs6" }].map((item) => (
                <button key={item.id} onClick={() => { onSelectModel(item.id); onNavigate("home"); setMenuOpen(false); }}
                  className={`text-left text-2xl font-display font-bold tracking-wider hover:text-red-500 transition-colors ${activeId === item.id ? "text-red-500" : "text-zinc-300"}`}>
                  {item.name}
                </button>
              ))}
            </div>
            <hr className="border-zinc-800 my-6" />
            <div className="space-y-4">
              {navLinks.map((link) => (
                <button key={link.label} onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
                  className={`block text-sm tracking-[0.2em] font-semibold transition-colors ${activePage === link.page ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-6 flex justify-between items-center text-[10px] font-mono text-zinc-500 tracking-widest">
            <span>© 2026 AUDI INSPIRED SHOWCASE</span>
            <span>SHERPA / S SPEC</span>
          </div>
        </div>
      )}
    </>
  );
}
