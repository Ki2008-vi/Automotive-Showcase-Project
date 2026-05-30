import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VEHICLES } from "../data";

interface GalleryPageProps {
    activeVehicleId: string;
    onClose: () => void;
    onSelectModel: (id: string) => void;
}

export default function GalleryPage({ activeVehicleId, onSelectModel }: GalleryPageProps) {
    const [selectedIdx, setSelectedIdx] = useState(
        VEHICLES.findIndex((v) => v.id === activeVehicleId) || 0
    );
    const [photoIdx, setPhotoIdx] = useState(0);

    const vehicle = VEHICLES[selectedIdx];

    // Build array of available photos for the current vehicle (checks all image slots)
    const photos = [
        vehicle.image,
        vehicle.image2,
        vehicle.image3,
        vehicle.image4,
        vehicle.image5,
        vehicle.image6,
        vehicle.image7,
        vehicle.image8,
        vehicle.image9,
        vehicle.image10,
    ].filter((img): img is string => !!img);

    // Reset photo index when vehicle changes
    useEffect(() => {
        setPhotoIdx(0);
    }, [selectedIdx]);

    const prevPhoto = () => {
        setPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const nextPhoto = () => {
        setPhotoIdx((prev) => (prev + 1) % photos.length);
    };

    const selectVehicle = (i: number) => {
        setSelectedIdx(i);
        onSelectModel(VEHICLES[i].id);
    };

    return (
        <div className="relative w-full h-full bg-zinc-950 overflow-hidden font-sans">
            {/* Full-screen car image — changes per photo */}
            <img
                key={`${vehicle.id}-${photoIdx}`}
                src={photos[photoIdx]}
                alt={`${vehicle.modelName} photo ${photoIdx + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 opacity-100"
            />

            {/* Dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />

            {/* Left arrow — previous photo */}
            <button
                onClick={prevPhoto}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all backdrop-blur-sm"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right arrow — next photo */}
            <button
                onClick={nextPhoto}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all backdrop-blur-sm"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-12 pb-12 pt-24 bg-gradient-to-t from-black via-black/60 to-transparent">
                <div className="max-w-7xl mx-auto flex justify-center items-end">
                    {/* Car identity */}

                    {/* Stats */}
                    <div className="hidden md:flex gap-8 text-right">
                        {[
                            { label: "POWER", value: vehicle.power },
                            { label: "0-100", value: vehicle.acceleration },
                            { label: "TOP SPEED", value: vehicle.topSpeed },
                        ].map((s) => (
                            <div key={s.label} className="space-y-1">
                                <span className="font-mono text-[8px] tracking-widest text-zinc-600 block uppercase">{s.label}</span>
                                <span className="font-display font-black text-white text-xl" style={{ color: s.label === "POWER" ? vehicle.accentHex : "#fff" }}>{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photo indicators (for current vehicle's photos) */}
                {photos.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPhotoIdx(i)}
                                className={`transition-all duration-300 h-1 ${i === photoIdx ? "w-8 bg-white" : "w-3 bg-white/25 hover:bg-white/50"}`}
                            />
                        ))}
                    </div>
                )}

                {/* Vehicle selector dots */}
                <div className="flex justify-center gap-3 mt-4">
                    {VEHICLES.map((v, i) => (
                        <button
                            key={v.id}
                            onClick={() => selectVehicle(i)}
                            className={`transition-all duration-300 h-1 ${i === selectedIdx ? "w-12 bg-white" : "w-4 bg-white/20 hover:bg-white/40"}`}
                        />
                    ))}
                </div>

                {/* Label hint */}
                <p className="text-center font-mono text-[8px] tracking-widest text-zinc-600 mt-3 uppercase">
                    ← → Browse Photos &nbsp;|&nbsp; Tap dots to switch model
                </p>
            </div>
        </div>
    );
}
