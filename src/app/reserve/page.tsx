"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useUI } from "@/components/UIProvider";

export default function ReservePage() {
  const { openReservationTicket, addToast, specialRequest } = useUI();
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("08:30 AM Dawn Hearth");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast("Please provide your name and email.");
      return;
    }
    const code = `MB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    openReservationTicket(code);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-linen flex items-center justify-center">
      <div className="w-full max-w-2xl px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-4 block">CONCIERGE</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-espresso mb-4">Reserve Your Table</h1>
          <p className="text-lg font-serif italic text-espresso/70">Secure your sanctuary at Maison Brew.</p>
        </div>

        <form onSubmit={handleReservation} className="rounded-[32px] bg-white p-8 md:p-12 shadow-warm-card border border-chestnut/10">
          <div className="space-y-10">
            {/* Date */}
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-espresso/50 mb-3">Date</label>
              <input 
                type="date" 
                defaultValue="2026-06-18" 
                className="w-full bg-transparent border-b border-chestnut/20 pb-2 text-xl font-medium text-espresso focus:outline-none focus:border-chestnut transition-colors cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-espresso/50 mb-3">Guests</label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 4, '6+'].map(num => (
                  <button 
                    type="button"
                    key={num}
                    onClick={() => setSelectedGuests(typeof num === 'number' ? num : 6)}
                    className={`px-8 py-3 rounded-full border transition-all font-medium ${
                      selectedGuests === num || (num === '6+' && selectedGuests >= 6)
                        ? 'border-chestnut bg-chestnut text-white shadow-md' 
                        : 'border-chestnut/20 text-espresso hover:border-chestnut/50 bg-vanilla/30'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-espresso/50 mb-3">Time</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['08:30 AM Dawn Hearth', '11:00 AM Cupping Hour', '14:30 PM Afternoon Tea', '19:00 PM Evening Aperitif'].map(time => (
                  <button 
                    type="button"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-5 py-4 rounded-2xl border text-left text-sm transition-all font-medium ${
                      selectedTime === time 
                        ? 'border-chestnut bg-chestnut/10 text-chestnut shadow-sm' 
                        : 'border-chestnut/20 text-espresso hover:border-chestnut/50 bg-vanilla/30'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {specialRequest && (
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-chestnut mb-2">Special Request</label>
                <div className="bg-chestnut/10 border border-chestnut/20 rounded-xl p-4 text-sm text-chestnut font-medium">
                  {specialRequest}
                </div>
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-espresso/50 mb-3">Patron Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-chestnut/20 pb-2 text-lg focus:outline-none focus:border-chestnut transition-colors placeholder:text-espresso/20"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-espresso/50 mb-3">Direct Correspondence</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-chestnut/20 pb-2 text-lg focus:outline-none focus:border-chestnut transition-colors placeholder:text-espresso/20"
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-8 group flex items-center justify-between rounded-full bg-chestnut px-8 py-5 text-lg font-medium text-porcelain transition-transform active:scale-[0.98] shadow-lg shadow-chestnut/20">
              Confirm Sanctuary Reservation
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
