import React, { useState } from "react";
import { Cpu, Zap, Gauge, Shield, Wind, ChevronRight } from "lucide-react";
import { VEHICLES } from "../data";

interface DetailsPageProps {
    activeVehicleId: string;
    onClose: () => void;
    onSelectModel: (id: string) => void;
}

const EXTENDED_SPECS: Record<string, { category: string; icon: any; items: { label: string; value: string }[] }[]> = {
    r8: [
        {
            category: "POWERTRAIN",
            icon: Zap,
            items: [
                { label: "Engine Type", value: "5.2L V10 FSI Naturally Aspirated" },
                { label: "Displacement", value: "5,204 cc" },
                { label: "Max Power", value: "620 HP @ 8,000 rpm" },
                { label: "Max Torque", value: "580 Nm @ 6,500 rpm" },
                { label: "Transmission", value: "7-Speed S Tronic Dual-Clutch" },
                { label: "Drivetrain", value: "Quattro Permanent All-Wheel Drive" },
            ],
        },
        {
            category: "PERFORMANCE",
            icon: Gauge,
            items: [
                { label: "0–100 km/h", value: "3.2 seconds" },
                { label: "0–200 km/h", value: "9.9 seconds" },
                { label: "Top Speed", value: "329 km/h (electronically limited)" },
            ],
        },
        {
            category: "CHASSIS & BODY",
            icon: Shield,
            items: [
                { label: "Body Structure", value: "Audi Space Frame (ASF) Aluminium/Carbon" },
                { label: "Kerb Weight", value: "1,695 kg" },
            ],
        },
    ],
    etron: [
        {
            category: "POWERTRAIN",
            icon: Zap,
            items: [
                { label: "Engine Type", value: "4.0-liter Twin-Turbo V8 Petrol with Mild Hybrid (MHEV)" },
                { label: "Displacement", value: "3,996 cc" },
                { label: "Max Power", value: "630 HP @ 8,000 rpm" },
                { label: "Max Torque", value: "850 Nm @ 2,250-4,500 rpm" },
                { label: "Transmission", value: "8-speed Tiptronic automatic transmission" },
                { label: "Drivetrain", value: "Quattro Permanent All-Wheel Drive" },
            ],
        },
        {
            category: "PERFORMANCE",
            icon: Gauge,
            items: [
                { label: "0–100 km/h", value: "3.8 seconds" },
                { label: "Top Speed", value: "250 km/h" },
            ],
        },
    ],
    rs6: [
        {
            category: "POWERTRAIN",
            icon: Zap,
            items: [
                { label: "Engine Type", value: "4.0-liter Twin-Turbocharged V8 TFSI" },
                { label: "Max Power", value: "621 HP" },
                { label: "Max Torque", value: "850 Nm @ 2,250-4,500 rpm" },
                { label: "Transmission", value: "8-speed ZF Tiptronic automatic" },
                { label: "Drivetrain", value: "Quattro Permanent All-Wheel Drive" },
            ],
        },
        {
            category: "PERFORMANCE",
            icon: Gauge,
            items: [
                { label: "0–100 km/h", value: "3.4 seconds" },
                { label: "Top Speed", value: "305 km/h" },
            ],
        },
    ],
};

export default function DetailsPage({ activeVehicleId, onSelectModel }: DetailsPageProps) {
    const [selectedId, setSelectedId] = useState(activeVehicleId);
    const [activeCat, setActiveCat] = useState(0);

    const vehicle = VEHICLES.find((v) => v.id === selectedId) || VEHICLES[0];
    const specs = EXTENDED_SPECS[selectedId] || EXTENDED_SPECS.r8;
    const activeCategory = specs[activeCat] || specs[0];
    const IconComp = activeCategory.icon;

    return (
        <div className="relative w-full h-full bg-zinc-950 overflow-hidden font-sans">
            {/* 1. Cinematic Backdrop */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60 z-10" />
                <img
                    src={vehicle.image}
                    alt={vehicle.modelName}
                    className="w-full h-full object-cover object-right-bottom scale-110 translate-x-20 opacity-40 blur-[2px] transition-all duration-1000"
                />
            </div>

            {/* 2. Content Layout */}
            <div className="relative z-20 h-full flex flex-col pt-32 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Identity & Selector */}
                    <div className="space-y-10 animate-fade-in-up">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="h-[2px] w-8 translate-y-[-1px]" style={{ backgroundColor: vehicle.accentHex }} />
                                <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: vehicle.accentHex }}>
                                    TECHNICAL ARCHIVE
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none uppercase">
                                {vehicle.modelName}
                            </h1>
                            <p className="text-zinc-400 font-mono text-xs tracking-widest max-w-sm leading-relaxed">
                                {vehicle.series} — {vehicle.description}
                            </p>
                        </div>

                        {/* Model Rapid Selection */}
                        <div className="flex gap-4 border-b border-white/5 pb-8">
                            {VEHICLES.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => { setSelectedId(v.id); setActiveCat(0); onSelectModel(v.id); }}
                                    className={`group flex flex-col gap-2 transition-all ${v.id === selectedId ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
                                >
                                    <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">{v.verticalModel}</span>
                                    <div className={`h-0.5 w-12 transition-all ${v.id === selectedId ? "w-20" : "group-hover:w-16"}`} style={{ backgroundColor: v.id === selectedId ? vehicle.accentHex : "#3f3f46" }} />
                                </button>
                            ))}
                        </div>

                        {/* Core Metrics Cards (Compact) */}
                        <div className="grid grid-cols-3 gap-1">
                            {[
                                { label: "POWER", value: vehicle.power },
                                { label: "0-100", value: vehicle.acceleration },
                                { label: "TOP", value: vehicle.topSpeed },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/5 p-4 group transition-colors hover:bg-white/10">
                                    <span className="text-[8px] text-zinc-500 block font-mono tracking-[0.2em] mb-1">{stat.label}</span>
                                    <span className="text-lg font-black text-white font-display" style={{ color: stat.label === "POWER" ? vehicle.accentHex : "#fff" }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Detailed Table */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 space-y-8 animate-fade-in-right">
                        {/* Category Tabs */}
                        <div className="flex gap-8 border-b border-white/5 overflow-x-auto no-scrollbar">
                            {specs.map((cat, i) => (
                                <button
                                    key={cat.category}
                                    onClick={() => setActiveCat(i)}
                                    className={`pb-4 font-mono text-[10px] tracking-[0.3em] font-bold transition-all whitespace-nowrap border-b-2 ${i === activeCat ? "text-white border-white" : "text-zinc-600 border-transparent hover:text-zinc-400"
                                        }`}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>

                        {/* List */}
                        <div className="space-y-6">
                            {activeCategory.items.map((item, i) => (
                                <div key={item.label} className="flex flex-col gap-1 group">
                                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                        <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="text-sm font-bold text-white group-hover:translate-x-[-4px] transition-transform">
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex items-start gap-3">
                            <Cpu className="w-4 h-4 text-zinc-600 mt-1" />
                            <p className="text-[9px] font-mono text-zinc-500 leading-relaxed tracking-widest uppercase">
                                ENGINEERING SPECIFICATIONS ARE SUBJECT TO CHANGE BASED ON TAILORED DRIVETRAIN OPTIONS.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative vertical lines */}
            <div className="absolute top-0 right-32 w-px h-full bg-white/5 z-0" />
            <div className="absolute top-0 right-48 w-px h-full bg-white/5 z-0" />
        </div>
    );
}
