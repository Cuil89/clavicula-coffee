"use client";

import { useUI } from "./UIProvider";
import { ShoppingBag } from "lucide-react";
import { formatRupiah } from "@/utils/receiptGenerator";
import { usePathname } from "next/navigation";

export default function FloatingCartButton() {
  const { cartItems, openCart } = useUI();
  const pathname = usePathname();

  // Terroir page has its own dedicated sticky CTA bar at the bottom
  if (pathname === "/terroir") return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <button
        onClick={openCart}
        className="group flex items-center gap-3 bg-espresso hover:bg-coal text-white pl-4 pr-5 py-3 rounded-full shadow-2xl border border-chestnut/30 transition-all hover:scale-105 active:scale-95"
        aria-label="Lihat Keranjang Pesanan"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-chestnut flex items-center justify-center text-white">
            <ShoppingBag size={18} />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-espresso text-[11px] font-black flex items-center justify-center shadow">
            {totalCount}
          </span>
        </div>
        <div className="text-left">
          <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider leading-none">
            Pay at Outlet
          </div>
          <div className="text-sm font-bold leading-tight font-serif italic text-white">
            {formatRupiah(totalAmount)}
          </div>
        </div>
        <span className="text-xs text-linen/70 font-sans ml-1">Ambil &rarr;</span>
      </button>
    </div>
  );
}
