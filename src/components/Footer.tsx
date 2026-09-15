"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useUI } from "./UIProvider";

export default function Footer() {
  const { openMap, openReservationTicket, addToast, specialRequest } = useUI();
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("08:30 AM Dawn Hearth");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newsletter, setNewsletter] = useState("");

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast("Please provide your name and email.");
      return;
    }
    const code = `MB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    openReservationTicket(code);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter) return;
    addToast("Subscribed to the Cupping Newsletter.");
    setNewsletter("");
  };

  return (
    <footer className="w-full bg-espresso text-porcelain px-4 py-24 md:py-32" id="reservation-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/80">OPEN NOW // 4 SANCTUARY TABLES FREE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight mb-6">
              The Sanctuary Pavilion
            </h2>
            
            <p className="text-lg text-white/70 max-w-[45ch] mb-12 font-serif italic">
              Step away from metropolitan haste. Experience deliberate silence, natural lime-wash acoustics, and slow manual extraction.
            </p>

            <div className="space-y-6 text-sm text-white/80 border-l border-chestnut/30 pl-6">
              <div>
                <strong className="block text-white font-medium mb-1">Location</strong>
                <p>Maison Brew Atelier &amp; Hearth</p>
                <p>48 Ropewalk Lane, Kala Ghoda Arts Precinct</p>
                <p>Mumbai 400001</p>
              </div>
              <div>
                <strong className="block text-white font-medium mb-1">Hours</strong>
                <p>Monday through Sunday: 07:30 &mdash; 22:30 IST</p>
              </div>
            </div>

            <button onClick={openMap} className="mt-12 group flex items-center gap-3 text-sm font-medium hover:text-chestnut transition-colors">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 group-hover:border-chestnut transition-colors flex items-center justify-center shrink-0 bg-white/5">
                 <Image src="/assets/cafe-twilight-pavilion.jpeg" alt="Sanctuary Map Preview" fill className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity" />
                 <MapPin size={16} className="relative z-10 text-white drop-shadow-md" />
              </div>
              Interactive Sanctuary Map
            </button>
          </div>

          {/* Right Column - Reservation Card */}
          <div className="relative">
            <form onSubmit={handleReservation} className="rounded-[24px] bg-[#1A1918] p-7 md:p-10 border border-white/5 shadow-2xl relative z-10">
              <h3 className="text-2xl font-medium mb-8">Reserve Your Table</h3>
              
              <div className="space-y-8">
                {/* Date */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/50 mb-3">Date</label>
                  <input 
                    type="date" 
                    defaultValue="2026-06-18" 
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-lg focus:outline-none focus:border-chestnut transition-colors cursor-pointer"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/50 mb-3">Guests</label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 4, '6+'].map(num => (
                      <button 
                        type="button"
                        key={num}
                        onClick={() => setSelectedGuests(typeof num === 'number' ? num : 6)}
                        className={`px-6 py-2 rounded-full border transition-all ${
                          selectedGuests === num || (num === '6+' && selectedGuests >= 6)
                            ? 'border-chestnut bg-chestnut/10 text-chestnut' 
                            : 'border-white/10 text-white/60 hover:border-white/30'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/50 mb-3">Time</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['08:30 AM Dawn Hearth', '11:00 AM Cupping Hour', '14:30 PM Afternoon Tea', '19:00 PM Evening Aperitif'].map(time => (
                      <button 
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                          selectedTime === time 
                            ? 'border-chestnut bg-chestnut/10 text-chestnut' 
                            : 'border-white/10 text-white/60 hover:border-white/30'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                {specialRequest && (
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-chestnut mb-2">Special Request (From Sensory Dial)</label>
                    <div className="bg-chestnut/10 border border-chestnut/20 rounded-lg p-3 text-sm text-chestnut">
                      {specialRequest}
                    </div>
                  </div>
                )}

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Patron Name" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-2 focus:outline-none focus:border-chestnut transition-colors placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Direct Correspondence" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 pb-2 focus:outline-none focus:border-chestnut transition-colors placeholder:text-white/30"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full mt-4 group flex items-center justify-between rounded-full bg-chestnut px-8 py-4 text-sm font-medium text-porcelain transition-transform active:scale-[0.98]">
                  Confirm Sanctuary Reservation
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
            {/* Soft glow behind card */}
            <div className="absolute inset-0 bg-chestnut/5 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <div className="font-bold tracking-tight text-xl mb-2">MAISON BREW</div>
            <div className="text-xs text-white/50 mb-6 uppercase tracking-widest">
              18&deg;55&apos;24.8&quot;N 72&deg;50&apos;01.6&quot;E // Atelier Sanctuary &amp; Testing Counter
            </div>
            <div className="text-sm text-white/40">
              © 2026 Maison Brew. All Rights Reserved.
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full md:w-auto">
            <form onSubmit={handleNewsletter} className="flex bg-white/5 rounded-full p-1 border border-white/10 max-w-sm">
              <input 
                type="email" 
                placeholder="Join the Cupping Newsletter" 
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                required
                className="bg-transparent px-4 py-2 text-sm focus:outline-none w-full placeholder:text-white/30"
              />
              <button type="submit" className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/20 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
