"use client";

import { useUI } from "./UIProvider";
import { MapPin, ShoppingBag, ShieldCheck } from "lucide-react";

export default function TopAnnouncementBar() {
  const { selectedOutlet, setSelectedOutlet, cartItems, openCart } = useUI();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-espresso text-porcelain text-[11px] md:text-xs py-2 px-3 md:px-6 relative z-50 border-b border-chestnut/20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 md:gap-4">
        {/* CRO Trigger 1 Banner */}
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-chestnut/30 text-amber-300 font-semibold text-[10px] uppercase tracking-wider border border-chestnut/30">
            <ShieldCheck size={12} className="text-amber-300" /> Pay at Outlet
          </span>
          <span className="text-linen/90">
            <strong className="text-porcelain font-bold">Pesan Online Bebas Antre:</strong> Bayar Pas Ambil di Kasir (Rp 0 Biaya Admin &amp; Hemat s.d. Rp6.000 vs Ojol)
          </span>
        </div>

        {/* Quick Outlet Selector & Cart Trigger */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/10 text-[10px] md:text-[11px]">
            <button
              onClick={() => setSelectedOutlet("Slawi")}
              className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                selectedOutlet === "Slawi"
                  ? "bg-chestnut text-white font-bold shadow-sm"
                  : "text-linen/70 hover:text-white"
              }`}
            >
              <MapPin size={10} /> Slawi HQ
            </button>
            <button
              onClick={() => setSelectedOutlet("Guci")}
              className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                selectedOutlet === "Guci"
                  ? "bg-forest text-white font-bold shadow-sm"
                  : "text-linen/70 hover:text-white"
              }`}
            >
              <MapPin size={10} /> Guci Hills
            </button>
          </div>

          <button
            onClick={openCart}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-porcelain transition-colors text-[11px] font-medium"
            aria-label="Buka Keranjang Pesanan"
          >
            <ShoppingBag size={12} className="text-amber-300" />
            <span>Keranjang</span>
            {totalItems > 0 && (
              <span className="w-4 h-4 rounded-full bg-chestnut text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
