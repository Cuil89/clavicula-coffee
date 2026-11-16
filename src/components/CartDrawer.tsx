"use client";

import { useUI } from "./UIProvider";
import { X, Minus, Plus, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, clearCart, addToast } = useUI();
  const [mounted, setMounted] = useState(false);
  const [orderOutlet, setOrderOutlet] = useState<"Slawi" | "Guci">("Slawi");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCheckoutWA = () => {
    if (cartItems.length === 0) return;
    const itemList = cartItems
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.name} (${it.grind || "Menu Dine-in"}) x${it.quantity} = ${formatRupiah(
            it.price * it.quantity
          )}`
      )
      .join("%0A");

    const message = `Halo Clavicula Coffee & Idea!%0ASaya ingin memesan menu / roastery untuk outlet *${orderOutlet}*:%0A%0A${itemList}%0A%0A*Total: ${formatRupiah(
      total
    )}*%0A%0AMohon konfirmasi ketersediaan & pembayaran. Terima kasih!`;

    const waUrl = `https://wa.me/6287733444426?text=${message}`;
    window.open(waUrl, "_blank");
    addToast("Membuka WhatsApp untuk konfirmasi pesanan...");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-espresso/50 backdrop-blur-sm z-[80] transition-opacity duration-500 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-linen shadow-2xl z-[90] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-chestnut/10 bg-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-vanilla rounded-full text-chestnut">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-espresso leading-none">Keranjang Pesanan</h2>
              <span className="text-xs text-chestnut font-serif italic">Clavicula Coffee &amp; Idea</span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-chestnut/10 transition-colors text-espresso"
            aria-label="Tutup Keranjang"
          >
            <X size={20} />
          </button>
        </div>

        {/* Outlet Switcher */}
        {cartItems.length > 0 && (
          <div className="px-6 py-3 bg-vanilla/50 border-b border-chestnut/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-espresso/60">Tujuan Outlet:</span>
            <div className="inline-flex rounded-full bg-white p-1 border border-chestnut/15 text-xs font-medium">
              <button
                onClick={() => setOrderOutlet("Slawi")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  orderOutlet === "Slawi" ? "bg-chestnut text-white" : "text-espresso/70"
                }`}
              >
                Slawi
              </button>
              <button
                onClick={() => setOrderOutlet("Guci")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  orderOutlet === "Guci" ? "bg-chestnut text-white" : "text-espresso/70"
                }`}
              >
                Guci Hills
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-espresso/50">
              <div className="w-16 h-16 rounded-full bg-vanilla flex items-center justify-center mb-4 text-chestnut/40">
                <ShoppingBag size={32} />
              </div>
              <p className="font-serif italic text-xl text-espresso mb-1">Keranjang masih kosong</p>
              <p className="text-xs text-espresso/60 max-w-xs mb-6">
                Pilih menu kopi anatomi, roast beans, atau kitchen plates favorit Anda.
              </p>
              <Link
                href="/menu"
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-chestnut text-white text-xs font-medium hover:bg-chestnut/90 transition-colors"
              >
                Jelajahi Menu Clavicula <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-chestnut/10 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-espresso text-base leading-snug">{item.name}</h3>
                      {item.grind && (
                        <p className="text-[11px] font-mono text-chestnut tracking-wide mt-0.5 uppercase">
                          {item.grind}
                        </p>
                      )}
                    </div>
                    <span className="font-serif italic text-base text-chestnut whitespace-nowrap">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-chestnut/10">
                    <span className="text-xs text-espresso/50">
                      @{formatRupiah(item.price)}
                    </span>
                    <div className="flex items-center gap-3 bg-linen border border-chestnut/20 rounded-full px-2.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-espresso/70 hover:text-chestnut p-0.5"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-espresso/70 hover:text-chestnut p-0.5"
                        aria-label="Tambah jumlah"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-chestnut/10 space-y-4 shadow-lg">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-espresso/70 text-xs">
                <span>Subtotal</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between text-espresso/70 text-xs">
                <span>Pajak (PPN)</span>
                <span className="text-emerald-700 font-medium">Sudah Termasuk</span>
              </div>
              <div className="flex justify-between text-espresso font-bold text-lg pt-2 border-t border-chestnut/10">
                <span>Total Estimasi</span>
                <span className="text-chestnut font-serif italic text-xl">{formatRupiah(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWA}
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle size={18} /> Pesan via WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-espresso/50 hover:text-chestnut transition-colors"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </>
  );
}
