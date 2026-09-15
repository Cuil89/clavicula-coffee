"use client";

import { useUI } from "./UIProvider";
import { X, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

export default function MapModal() {
  const { isMapOpen, closeMap } = useUI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-espresso/60 backdrop-blur-md z-[80] transition-opacity duration-500 ${isMapOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMap}
      />
      
      <div 
        className={`fixed inset-0 m-auto w-full max-w-3xl h-[85vh] sm:h-[80vh] sm:rounded-[32px] bg-linen shadow-2xl z-[90] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMapOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8 pointer-events-none"}`}
      >
        <div className="flex items-center justify-between p-6 bg-white border-b border-chestnut/10">
          <h2 className="text-xl font-bold text-espresso flex items-center gap-2">
            <MapPin size={20} className="text-chestnut" /> Kala Ghoda Sanctuary
          </h2>
          <button onClick={closeMap} className="p-2 rounded-full hover:bg-chestnut/10 transition-colors text-espresso">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 relative bg-espresso/5">
          {/* Mock Map Embed */}
          <div className="absolute inset-0 bg-[url('/assets/cafe-twilight-pavilion.jpeg')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-espresso text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-mono tracking-widest uppercase">Maison Brew</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2 text-espresso">Address</h3>
            <p className="text-sm text-espresso/70 leading-relaxed font-serif italic text-lg mb-6">
              48 Ropewalk Lane,<br />
              Kala Ghoda Arts Precinct,<br />
              Mumbai 400001
            </p>
            <div className="flex gap-4">
              <button className="flex-1 py-3 rounded-full border border-chestnut/20 text-chestnut text-sm font-medium hover:bg-chestnut hover:text-white transition-colors flex items-center justify-center gap-2">
                <Navigation size={16} /> Google Maps
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-sm text-espresso uppercase tracking-widest mb-1">Transit</h3>
              <p className="text-sm text-espresso/70">A 5-minute walk from Flora Fountain. Nearest station: Churchgate.</p>
            </div>
            <div>
              <h3 className="font-bold text-sm text-espresso uppercase tracking-widest mb-1">Valet</h3>
              <p className="text-sm text-espresso/70">Complimentary valet service available at the Ropewalk Lane entrance.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
