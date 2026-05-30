import React, { useState } from "react";
import { X, Check, Eye, Compass, Shield, Wind, Sparkles } from "lucide-react";
import { Vehicle } from "../types";

interface DetailStationProps {
  vehicle: Vehicle;
  onClose: () => void;
  activeColorName: string;
  onSelectColor: (colorName: string, hex: string) => void;
}

// Available paint colors for configuring
interface PaintColor {
  name: string;
  hex: string;
  type: string; // Metallic, Matte, Gloss
  chargeRef: string;
}

const PRESETS: Record<string, PaintColor[]> = {
  r8: [
    { name: "Tango Red Metallic", hex: "#b91c1c", type: "Metallic", chargeRef: "Standard" },
    { name: "Vegas Yellow Gloss", hex: "#eab308", type: "Gloss Solid", chargeRef: "Premium Shift" },
    { name: "Kemora Gray Matte", hex: "#64748b", type: "Audi Exclusive Matte", chargeRef: "+$4,500" },
    { name: "Mythos Black Pearl", hex: "#18181b", type: "Pearl Effect", chargeRef: "Standard" }
  ],
  etron: [
    { name: "Kemora Blue Metallic", hex: "#06b6d4", type: "RS Exclusive Metallic", chargeRef: "Standard" },
    { name: "Ascari Silver Gloss", hex: "#94a3b8", type: "Ultra Pearl Metallic", chargeRef: "Standard" },
    { name: "Tactical Green Pearl", hex: "#3f6212", type: "Exclusive Pearl", chargeRef: "+$3,200" },
    { name: "Mythos Charcoal Pearl", hex: "#27272a", type: "Metallic Gloss", chargeRef: "Standard" }
  ],
  rs6: [
    { name: "Nardo Gray Gloss", hex: "#4b5563", type: "Legendary Solid Gloss", chargeRef: "Standard" },
    { name: "Sebring Black Crystal", hex: "#0f172a", type: "Crystal Dual Effect", chargeRef: "Premium Shift" },
    { name: "Misano Red Metallic", hex: "#dc2626", type: "Sport Metallic", chargeRef: "Standard" },
    { name: "Goodwood Green Metallic", hex: "#064e3b", type: "Heritage Exclusive", chargeRef: "+$5,000" }
  ]
};

export default function DetailStation({
  vehicle,
  onClose,
  activeColorName,
  onSelectColor
}: DetailStationProps) {
  const currentPaints = PRESETS[vehicle.id] || PRESETS.r8;

  // Track loaded section
  const [activeTab, setActiveTab] = useState<"design" | "tech" | "aero">("design");

  return (
    <div className="fixed inset-0 bg-zinc-950/98 backdrop-blur-xl z-50 overflow-y-auto flex flex-col justify-between">
      {/* Absolute top navbar for configuration drawer */}
      <div className="border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center bg-black/60 sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] tracking-[0.3em] text-red-500 uppercase font-bold">
            CONFIGURATION LABORATORY
          </span>
          <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full hidden sm:block" />
          <span className="text-xs font-mono text-zinc-400 hidden sm:block">
            {vehicle.brand} {vehicle.modelName} Spec Sheet
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-white/30 text-xs font-mono tracking-wider hover:text-red-400 transition-all rounded-none"
          id="btn-close-details"
        >
          <X className="w-3.5 h-3.5" />
          <span>CLOSE CONSOLE</span>
        </button>
      </div>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 flex-grow items-center">
        {/* Left Side: Dynamic preview card and Color paint option selectors */}
        <div className="space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-800 rounded-none opacity-20 blur-xl group-hover:opacity-35 transition-opacity duration-1000" />
            <div className="relative bg-zinc-900/40 border border-white/5 overflow-hidden p-6 md:p-10 text-center">
              {/* Dynamic light reflection color container */}
              <div
                className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80"
                style={{
                  background: `radial-gradient(circle at center, ${
                    currentPaints.find((p) => p.name === activeColorName)?.hex || vehicle.accentHex
                  }15 0%, transparent 70%)`
                }}
              />
              
              <img
                src={vehicle.image}
                alt={vehicle.modelName}
                className="w-full max-w-sm md:max-w-md mx-auto h-auto object-contain object-center scale-100 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 left-4 font-mono text-[8.5px] text-zinc-600 tracking-widest text-left">
                PREVIEWING SELECTION<br />
                <span className="text-zinc-400 text-xs uppercase font-light tracking-wider">
                  {activeColorName}
                </span>
              </div>

              {/* Specs outline inside picture */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[9px] text-zinc-500 bg-black/80 px-2 py-1 border border-white/10">
                <Sparkles className="w-3 h-3 text-red-500 animate-spin" />
                <span>SPECIFIED BUILD FOR RACETRACK INGRESS</span>
              </div>
            </div>
          </div>

          {/* Color Customizer Option Stack */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
              SELECT CUSTOM EXTERIOR PAINT:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="paint-option-grid">
              {currentPaints.map((paint) => {
                const isSelected = activeColorName === paint.name;
                return (
                  <button
                    key={paint.name}
                    onClick={() => onSelectColor(paint.name, paint.hex)}
                    className={`p-3 border text-left flex items-center justify-between transition-all rounded-none ${
                      isSelected
                        ? "border-white bg-white/5"
                        : "border-white/5 hover:border-white/20 bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 border border-white/20 block"
                        style={{ backgroundColor: paint.hex }}
                      />
                      <div>
                        <p className="text-[11px] font-bold text-zinc-200 tracking-wide uppercase leading-tight">
                          {paint.name.split(" ")[0]} {paint.name.split(" ")[1] || ""}
                        </p>
                        <p className="text-[9px] text-zinc-500 font-mono leading-none">
                          {paint.type}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9.5px] font-mono text-zinc-400 block pb-1">
                        {paint.chargeRef}
                      </span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-white stroke-[2.5] inline" />
                      ) : (
                        <div className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Technical Innovation Reviews */}
        <div className="space-y-8 self-center">
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="h-[2px] w-6 bg-red-500" />
              <p className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase">{vehicle.brand} LEGACY</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-wider text-white">
              {vehicle.modelName}
            </h2>
            <p className="font-mono text-xs text-zinc-400">
              {vehicle.series}
            </p>
          </div>

          {/* Quick tab controllers */}
          <div className="flex border-b border-white/5">
            {[
              { id: "design", label: "CRAFTSMANSHIP", icon: Eye },
              { id: "tech", label: "DYNAMICS", icon: Shield },
              { id: "aero", label: "AERODYNAMICS", icon: Wind }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 font-mono text-[10px] tracking-widest font-bold transition-all transition-colors ${
                    isSelected
                      ? "border-red-500 text-white bg-white/5"
                      : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          <div className="min-h-[160px] text-zinc-300 text-sm leading-relaxed space-y-4">
            {activeTab === "design" && (
              <div className="space-y-3 animate-fade-in">
                <p>
                  Every line of the <strong className="text-white">{vehicle.modelName}</strong> represents ultimate sports design with daily ergonomics. From the lightweight hybrid space frame chassis architecture to the customized stitching interior upholstery, it radiates power and pure focus.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400 pt-2 list-none">
                  <li className="flex items-center gap-2">✓ Carbon Fiber Mirror Caps</li>
                  <li className="flex items-center gap-2">✓ Alcantara Multifunction Steering</li>
                  <li className="flex items-center gap-2">✓ Virtual Cockpit Navigation</li>
                  <li className="flex items-center gap-2">✓ Laser Headlamps with Dynamic Blink</li>
                </ul>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-3 animate-fade-in">
                <p>
                  Equipped with a legendary intelligent torque system, this vehicle actively regulates traction across both shafts. High-performance ceramic disc brakes ensure supreme control even at temperatures exceeding 800 degrees.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                  <div className="bg-zinc-900/60 p-3 border border-white/5">
                    <span className="text-zinc-500 text-[9px] block">ENGINE CONFIG</span>
                    <span className="text-white font-semibold">{vehicle.id === "etron" ? "BEV Permanent Dual Sync" : "Natural Aspiration V10"}</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 border border-white/5">
                    <span className="text-zinc-500 text-[9px] block">SUSPENSION</span>
                    <span className="text-white font-semibold">Active Sport Magnetic Ride</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "aero" && (
              <div className="space-y-3 animate-fade-in">
                <p>
                  Optimized for dynamic airflow extraction. An active rear aerodynamic mechanical spoiler deploys automatically above 120 km/h or on manual demand to create maximum stability on high-speed sweeps.
                </p>
                <ul className="space-y-1 text-xs font-mono text-zinc-400 list-none">
                  <li className="flex items-center gap-2">💨 Drag Coefficient: <span className="text-white">0.32 Cd optimized</span></li>
                  <li className="flex items-center gap-2">💨 Underbody Diffuser Ventilation channels for clean vacuum force</li>
                  <li className="flex items-center gap-2">💨 Side Scoop Intakes redesigned for critical cooling</li>
                </ul>
              </div>
            )}
          </div>

          {/* Prompting direct actions */}
          <div className="pt-4 border-t border-zinc-900 flex flex-wrap gap-4">
            <button
              onClick={() => alert(`Your inquiry for the custom configured ${vehicle.brand} ${vehicle.modelName} in "${activeColorName}" paint has been successfully registered. Our personal concierge will reach out via email.`)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase transition-all"
              id="btn-reserve-vehicle"
            >
              RESERVE TAILORED BUILD
            </button>
            <button
              onClick={() => alert("Digital high-fidelity spec-sheet download initiated. Please check your browser files.")}
              className="px-6 py-3 border border-white/20 hover:border-white text-zinc-300 hover:text-white font-bold text-xs tracking-widest uppercase transition-all"
              id="btn-download-brochure"
            >
              DOWNLOAD METRICS SHEET
            </button>
          </div>
        </div>
      </div>

      {/* Laboratory Footer info metrics */}
      <div className="border-t border-white/5 py-4 px-6 md:px-12 bg-black text-center text-zinc-500 text-[10px] font-mono tracking-[0.2em] flex flex-wrap justify-between gap-2">
        <span>© 2026 CHRONOS AUTOMOTIVE INC. PROTOTYPES DIVISION</span>
        <span>TESTBED MODEL IDENTIFIER: {vehicle.id.toUpperCase()}-CONCORDE</span>
      </div>
    </div>
  );
}
