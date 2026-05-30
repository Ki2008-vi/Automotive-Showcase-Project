import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2, Users, Award, Zap, ChevronRight } from "lucide-react";

const OFFICES = [
    {
        city: "Munich",
        country: "Germany",
        address: "12 Chronos Allee, 80331 München",
        phone: "+49 89 123 456 00",
        email: "munich@chronosauto.com",
        hours: "Mon–Fri: 08:00 – 18:00 CET",
        type: "GLOBAL HEADQUARTERS",
    },
    {
        city: "Dubai",
        country: "UAE",
        address: "Tower 7, Sheikh Zayed Rd, Dubai",
        phone: "+971 4 567 8900",
        email: "dubai@chronosauto.com",
        hours: "Sun–Thu: 09:00 – 19:00 GST",
        type: "MIDDLE EAST SHOWROOM",
    },
    {
        city: "Singapore",
        country: "Singapore",
        address: "1 Marina Boulevard, Singapore 018989",
        phone: "+65 6123 4567",
        email: "sg@chronosauto.com",
        hours: "Mon–Sat: 09:00 – 20:00 SGT",
        type: "ASIA PACIFIC CENTRE",
    },
];

const STATS = [
    { icon: Building2, label: "YEARS ENGINEERING", value: "38+" },
    { icon: Users, label: "GLOBAL CLIENTS", value: "12,000+" },
    { icon: Award, label: "INDUSTRY AWARDS", value: "94" },
    { icon: Zap, label: "VEHICLES DELIVERED", value: "85,000+" },
];

export default function OurCompanyPage() {
    const [selectedOffice, setSelectedOffice] = useState(0);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState<"contact" | "about">("contact");

    const office = OFFICES[selectedOffice];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    const updateFormData = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="relative w-full h-full bg-zinc-950 overflow-y-auto no-scrollbar font-sans">
            {/* 1. Hero Dynamic Section (Large like Models Page) */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/60 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent z-0" />

                <div className="relative z-20 text-center space-y-6 pt-20 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.5em] text-red-500 uppercase">
                        <Building2 className="w-3.5 h-3.5" />
                        CHRONOS AUTOMOTIVE INC.
                    </div>
                    <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-widest uppercase italic leading-none">
                        PRECISION<br />
                        <span className="text-zinc-700 not-italic">ENGINEERED</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-zinc-400 font-mono text-[10px] tracking-widest uppercase leading-relaxed px-6">
                        Establishing the absolute standard in high-performance automotive craftsmanship since 1988.
                    </p>
                </div>
            </div>

            {/* 2. Stats Grid (Cinematic) */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5 bg-zinc-900/20">
                {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="p-8 md:p-12 flex flex-col items-center text-center gap-3 border-r border-white/5 last:border-r-0 hover:bg-white/5 transition-colors group">
                            <Icon className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                            <span className="text-3xl md:text-5xl font-display font-black text-white">{stat.value}</span>
                            <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">{stat.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* 3. Navigation Tabs */}
            <div className="sticky top-[80px] z-30 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 flex justify-center">
                {([["contact", "ENQUIRY PORTAL"], ["about", "COMPANY LINEAGE"]] as const).map(([id, label]) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`py-5 px-10 font-mono text-[10px] tracking-[0.4em] font-bold border-b-2 transition-all ${activeTab === id ? "border-red-600 text-white" : "border-transparent text-zinc-600 hover:text-zinc-300"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* 4. Content Area */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 pb-32">

                {activeTab === "contact" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Left: Offices */}
                        <div className="lg:col-span-5 space-y-12 animate-fade-in-up">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-display font-black text-white tracking-widest uppercase italic">GLOBAL PRESENCE</h3>
                                <div className="space-y-3">
                                    {OFFICES.map((o, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedOffice(i)}
                                            className={`w-full text-left p-6 border transition-all flex justify-between items-center ${i === selectedOffice ? "border-red-600 bg-red-950/10" : "border-white/5 bg-zinc-900/30 hover:border-white/20"
                                                }`}
                                        >
                                            <div>
                                                <p className="font-display font-black text-xl text-white tracking-wider uppercase">{o.city}</p>
                                                <p className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">{o.country}</p>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 transition-transform ${i === selectedOffice ? "text-red-500 translate-x-1" : "text-zinc-700"}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Detail box */}
                            <div className="bg-zinc-900/60 p-8 border border-white/10 space-y-6">
                                <h4 className="font-mono text-[10px] tracking-[0.3em] text-red-500 font-bold uppercase">{office.type}</h4>
                                <div className="space-y-4 font-mono text-xs tracking-widest group">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-4 h-4 text-zinc-600 mt-1" />
                                        <span className="text-zinc-300 leading-relaxed">{office.address}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-4 h-4 text-zinc-600" />
                                        <span className="text-zinc-300">{office.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-4 h-4 text-zinc-600" />
                                        <span className="text-zinc-300">{office.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                        <Clock className="w-4 h-4 text-zinc-700" />
                                        <span className="text-zinc-500">{office.hours}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Enquiry Form */}
                        <div className="lg:col-span-7 animate-fade-in-up [animation-delay:200ms]">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-display font-black text-white tracking-widest uppercase italic">DIRECT COMMUNIQUÉ</h3>

                                {submitted ? (
                                    <div className="h-[400px] flex flex-col items-center justify-center text-center gap-4 border border-zinc-800 bg-zinc-900/20">
                                        <CheckCircle className="w-12 h-12 text-emerald-500" />
                                        <div>
                                            <p className="font-display font-black text-2xl text-white tracking-widest">TRANSMISSION SECURED</p>
                                            <p className="font-mono text-[10px] text-zinc-500 mt-2 uppercase tracking-widest">EXPECT RESPONSE WITHIN 24 MICRO-CYCLES</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { id: "name", label: "IDENTIFIER", type: "text", placeholder: "Your name" },
                                                { id: "email", label: "ELECTRONIC MAIL", type: "email", placeholder: "your@email.com" },
                                                { id: "phone", label: "VOICE COMMS", type: "tel", placeholder: "+1..." },
                                                { id: "subject", label: "PRIORITY SUBJECT", type: "text", placeholder: "Enquiry type" },
                                            ].map((f) => (
                                                <div key={f.id} className="space-y-2">
                                                    <label className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase block">{f.label}</label>
                                                    <input
                                                        type={f.type} required
                                                        value={(formData as any)[f.id]}
                                                        onChange={(e) => updateFormData(f.id, e.target.value)}
                                                        placeholder={f.placeholder}
                                                        className="w-full bg-zinc-900/50 border border-white/5 focus:border-red-600 px-5 py-4 text-xs text-white placeholder-zinc-700 outline-none transition-colors font-mono tracking-widest uppercase"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase block">MESSAGE PAYLOAD</label>
                                            <textarea
                                                required rows={6}
                                                value={formData.message}
                                                onChange={(e) => updateFormData("message", e.target.value)}
                                                placeholder="State your enquiry..."
                                                className="w-full bg-zinc-900/50 border border-white/5 focus:border-red-600 px-5 py-4 text-xs text-white placeholder-zinc-700 outline-none transition-colors font-mono tracking-widest uppercase resize-none"
                                            />
                                        </div>
                                        <button type="submit" className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-display font-black text-sm tracking-[0.4em] uppercase transition-all flex items-center justify-center gap-3">
                                            <Send className="w-4 h-4 translate-y-[-1px]" />
                                            INITIATE TRANSMISSION
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "about" && (
                    <div className="space-y-24 animate-fade-in-up">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <span className="h-[2px] w-12 bg-red-600" />
                                    <span className="font-mono text-[10px] tracking-[0.4em] text-red-500 uppercase">OUR GENESIS</span>
                                </div>
                                <h2 className="text-4xl md:text-7xl font-display font-black text-white tracking-widest uppercase leading-none">
                                    A LEGACY<br />
                                    <span className="text-zinc-800 italic">UNCOMPROMISED</span>
                                </h2>
                                <div className="space-y-4 text-zinc-400 font-mono text-xs tracking-widest uppercase leading-relaxed">
                                    <p>In the high-pressure chambers of Munich's precision engineering district, Dr. Klaus Hartmann envisioned an automotive brand that didn't just compete — it dominated.</p>
                                    <p>Chronos was founded in 1988 with a singular mission: To remove everything that wasn't performance. What remained was the absolute essence of driving.</p>
                                </div>
                            </div>
                            <div className="bg-zinc-900/40 p-10 border border-white/5 relative group">
                                <div className="absolute -inset-1 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0" />
                                <div className="relative z-10 space-y-4">
                                    {[
                                        { y: '1988', t: 'FOUNDATION IN MUNICH' },
                                        { y: '1994', n: 'C1 SPYDER LAUNCH' },
                                        { y: '2014', n: 'ELECTRIC RS PROTOTYPE' },
                                        { y: '2026', n: 'NEXT-GEN CONCORDE SERIES' }
                                    ].map((milestone) => (
                                        <div key={milestone.y} className="flex gap-4 items-center">
                                            <span className="font-display font-black text-red-600 text-lg w-16">{milestone.y}</span>
                                            <div className="h-px flex-1 bg-white/5" />
                                            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400">{milestone.t || milestone.n}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-10 px-6 md:px-12 bg-black/40 text-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-zinc-600 uppercase">© 2026 CHRONOS AUTOMOTIVE INC. // CORPORATE PORTAL</span>
                    <div className="flex gap-8 font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Legal Mentions</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Career</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
