import React from "react";
import { VehicleSpec } from "../types";
import { ShieldCheck, Flame, Cpu, ToggleLeft } from "lucide-react";

interface SpecsWidgetProps {
  specs: VehicleSpec[];
  topSpeed: string;
  acceleration: string;
  power: string;
  accentColor: string;
  accentHex: string;
}

export default function SpecsWidget({
  specs,
  topSpeed,
  acceleration,
  power,
  accentColor,
  accentHex
}: SpecsWidgetProps) {
  return (
    <div className="space-y-6 max-w-sm w-full bg-black/30 backdrop-blur-md p-6 border border-white/5 font-mono">
      {/* Mini Title */}
      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
        <Cpu className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
          CORE VEHICLE SPECIFICATIONS
        </span>
      </div>

      {/* Grid of basic parameters */}
      <div className="grid grid-cols-2 gap-4">
        {specs.map((spec) => (
          <div key={spec.label} className="space-y-1 group">
            <span className="text-[9px] tracking-wider text-zinc-500 uppercase block group-hover:text-zinc-400 transition-colors">
              {spec.label}
            </span>
            <span className="text-sm font-semibold text-zinc-200 block transition-transform group-hover:translate-x-0.5 duration-200">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="bg-zinc-950/70 border border-white/5 p-3 text-center space-y-1">
          <span className="text-[8px] text-zinc-500 block uppercase font-sans tracking-widest font-semibold">POWER</span>
          <span className="text-sm md:text-base font-black tracking-tight" style={{ color: accentHex }}>{power}</span>
        </div>
        <div className="bg-zinc-950/70 border border-white/5 p-3 text-center space-y-1">
          <span className="text-[8px] text-zinc-500 block uppercase font-sans tracking-widest font-semibold">0-100 KM/H</span>
          <span className="text-sm md:text-base font-black tracking-tight text-white">{acceleration}</span>
        </div>
        <div className="bg-zinc-950/70 border border-white/5 p-3 text-center space-y-1">
          <span className="text-[8px] text-zinc-500 block uppercase font-sans tracking-widest font-semibold">TOP SPEED</span>
          <span className="text-sm md:text-base font-black tracking-tight text-white" style={{ color: accentHex }}>{topSpeed}</span>
        </div>
      </div>

      {/* Technology Badges */}
      <div className="flex justify-between items-center bg-white/5 p-2.5 text-[9px] text-zinc-400 border border-white/10">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          ACTIVE QUATTRO DRIVE
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-400" />
          S-PERFORMANCE VALVES
        </span>
      </div>
    </div>
  );
}
