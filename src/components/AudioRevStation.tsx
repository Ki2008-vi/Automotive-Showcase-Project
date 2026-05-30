import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Zap, Activity } from "lucide-react";

interface AudioRevStationProps {
  vehicleName: string;
  vehicleId: string; // 'r8' | 'etron' | 'rs6'
  accentColor: string;
  accentHex: string;
}

export default function AudioRevStation({
  vehicleName,
  vehicleId,
  accentColor,
  accentHex
}: AudioRevStationProps) {
  const [rpm, setRpm] = useState(800); // Idle RPM
  const [isRevving, setIsRevving] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audioInited, setAudioInited] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const rpmIntervalRef = useRef<number | null>(null);

  // Initialize Web Audio
  const initAudio = () => {
    if (audioInited) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configure beautiful analog-sounding sawtooth for V10/V8, or triangle for electric
      osc.type = vehicleId === "etron" ? "triangle" : "sawtooth";
      osc.frequency.setValueAtTime(90, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      audioCtxRef.current = ctx;
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setAudioInited(true);
    } catch (err) {
      console.warn("Failed to initialize Web Audio API:", err);
    }
  };

  // Handle Mute shift
  const toggleMute = () => {
    if (!audioInited) {
      initAudio();
    }
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (gainNodeRef.current && audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const targetGain = newMuted ? 0 : getIdealVolume();
      gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.1);
    }
  };

  const getIdealVolume = () => {
    // Electric hum is naturally quieter and futuristic, combustion engines are louder
    if (vehicleId === "etron") return 0.08;
    return 0.04; // low gain for pleasant tone
  };

  // Sync RPM frequency changes
  useEffect(() => {
    if (oscillatorRef.current && audioCtxRef.current) {
      // Scale RPM (800 - 8500) to frequencies (e.g. 50Hz to 320Hz)
      const minFreq = vehicleId === "etron" ? 40 : 45;
      const maxFreq = vehicleId === "etron" ? 550 : 280;
      const freq = minFreq + ((rpm - 800) / (8500 - 800)) * (maxFreq - minFreq);

      oscillatorRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.05);

      if (gainNodeRef.current && !isMuted) {
        // Boost volume dynamic during high-RPM scream
        const volMultiplier = 1 + ((rpm - 800) / 7700) * 0.8;
        gainNodeRef.current.gain.setTargetAtTime(getIdealVolume() * volMultiplier, audioCtxRef.current.currentTime, 0.05);
      }
    }
  }, [rpm, vehicleId, isMuted]);

  // Clean oscillators on dismount or slide change
  useEffect(() => {
    setRpm(800);
    setIsRevving(false);
    if (oscillatorRef.current) {
      oscillatorRef.current.type = vehicleId === "etron" ? "triangle" : "sawtooth";
    }
  }, [vehicleId]);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  // RPM Simulation loop
  useEffect(() => {
    if (isRevving) {
      // Clean previous
      if (rpmIntervalRef.current) clearInterval(rpmIntervalRef.current);

      rpmIntervalRef.current = window.setInterval(() => {
        setRpm((prev) => {
          const limit = vehicleId === "etron" ? 12000 : 8500;
          const step = vehicleId === "etron" ? 500 : 350;
          if (prev >= limit) return limit;
          return prev + step;
        });
      }, 16);
    } else {
      if (rpmIntervalRef.current) clearInterval(rpmIntervalRef.current);

      rpmIntervalRef.current = window.setInterval(() => {
        setRpm((prev) => {
          if (prev <= 800) {
            if (rpmIntervalRef.current) clearInterval(rpmIntervalRef.current);
            return 800;
          }
          // Returns to idle quickly
          return prev - 250;
        });
      }, 16);
    }

    return () => {
      if (rpmIntervalRef.current) clearInterval(rpmIntervalRef.current);
    };
  }, [isRevving, vehicleId]);

  // Generate responsive wave line points
  const getWavePoints = () => {
    const points = [];
    const maxFreq = isRevving ? 5 : 2;
    const maxAmplitude = 10 + (rpm / 8500) * 45;

    for (let i = 0; i <= 100; i += 2) {
      const rad = (i / 100) * Math.PI * 2 * maxFreq;
      const y = 30 + Math.sin(rad + (isRevving ? Date.now() / 60 : Date.now() / 150)) * maxAmplitude;
      points.push(`${i},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  const [waveStr, setWaveStr] = useState("M 0,30 L 100,30");

  useEffect(() => {
    let animId: number;
    const update = () => {
      setWaveStr(getWavePoints());
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [rpm, isRevving]);

  const maxRPM = vehicleId === "etron" ? 12000 : 8500;
  const rpmPercent = ((rpm - 800) / (maxRPM - 800)) * 100;

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-none space-y-4 max-w-sm w-full font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-zinc-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] font-semibold text-zinc-300 uppercase">
            {vehicleId === "etron" ? "E-ACOUSTIC STATION" : "ACTIVE EXHAUST REVVER"}
          </span>
        </div>

        <button
          onClick={toggleMute}
          className={`p-1.5 border hover:border-white transition-all text-xs flex items-center justify-center ${
            isMuted ? "border-white/10 text-zinc-400" : "border-white/40 text-white bg-white/5"
          }`}
          title={isMuted ? "Unmute Engine Sound" : "Mute Sound"}
          id="btn-toggle-mute"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Redline Dynamic Meter */}
      <div className="space-y-1.5 relative py-2">
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-zinc-500 text-[10px] tracking-wider">RPM TELEMETRY</span>
          <span
            className="font-bold font-mono text-base tabular-nums transition-colors duration-100"
            style={{ color: rpmPercent > 80 ? accentHex : "#ffffff" }}
          >
            {rpm.toLocaleString()}
          </span>
        </div>

        {/* Tachometer Bar */}
        <div className="h-2 bg-zinc-900 border border-white/5 overflow-hidden flex relative">
          <div
            className="h-full transition-all duration-75 relative"
            style={{
              width: `${Math.max(1, rpmPercent)}%`,
              backgroundColor: rpmPercent > 85 ? "#ef4444" : rpmPercent > 60 ? "#f59e0b" : accentHex
            }}
          >
            {/* Pulsing light at redline */}
            {rpmPercent > 85 && (
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            )}
          </div>
          {/* Tic marks */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div key={item} className="w-[1px] h-full bg-white text-[8px]" />
            ))}
          </div>
        </div>

        {/* Limit Warning */}
        <div className="flex justify-between text-[9px] text-zinc-500">
          <span>0</span>
          <span>4k</span>
          <span style={{ color: rpmPercent > 80 ? "#ef4444" : "" }}>
            {vehicleId === "etron" ? "12k REDLINE" : "8.5k REDLINE"}
          </span>
        </div>
      </div>

      {/* Acoustic waveform indicator */}
      <div className="h-12 bg-black/60 border border-white/5 rounded-none flex items-center justify-center overflow-hidden relative">
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="w-full h-full opacity-65"
          style={{ stroke: accentHex }}
        >
          <path
            d={waveStr}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        </svg>
        <span className="absolute bottom-1 right-2 text-[8px] text-zinc-600 font-mono tracking-wider">
          {vehicleId === "etron" ? "PULSE MODULATION" : "V-FREQUENCY DETECTOR"}
        </span>
      </div>

      {/* Control Button: Hold down to Rev */}
      <div className="pt-1">
        <button
          onMouseDown={() => {
            initAudio();
            setIsRevving(true);
          }}
          onMouseUp={() => setIsRevving(false)}
          onMouseLeave={() => setIsRevving(false)}
          onTouchStart={() => {
            initAudio();
            setIsRevving(true);
          }}
          onTouchEnd={() => setIsRevving(false)}
          className="w-full text-center py-3 bg-white hover:bg-zinc-100 active:scale-95 text-black font-semibold text-xs tracking-[0.25em] transition-all flex items-center justify-center gap-2 select-none"
          id="btn-rev-trigger"
        >
          <Zap className="w-3.5 h-3.5 fill-black" strokeWidth={1} />
          {isRevving ? "REVVING UP" : "HOLD HERE TO REV"}
        </button>

        {isMuted && (
          <p className="text-[9px] text-zinc-500 text-center mt-2 tracking-wide animate-pulse">
            * Turn on speaker icon in top right of station for true acoustic hum
          </p>
        )}
      </div>
    </div>
  );
}
