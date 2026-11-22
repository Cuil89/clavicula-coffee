"use client";

import { useUI } from "./UIProvider";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Coffee,
  CheckCircle,
  TrendingDown,
  MapPin,
  UtensilsCrossed,
  PackageCheck,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/utils/receiptGenerator";
import { GRIND_OPTIONS, PICKUP_TIME_OPTIONS, ONE_LITER_BOTTLES, ROASTERY_BEANS } from "@/data/roasteryData";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    addToCart,
    updateQuantity,
    updateItemGrind,
    clearCart,
    addToast,
    selectedOutlet,
    setSelectedOutlet,
    openPickupTicket,
  } = useUI();

  const [mounted, setMounted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [orderType, setOrderType] = useState<"pickup" | "dine_in">("pickup");
  const [pickupSlot, setPickupSlot] = useState(PICKUP_TIME_OPTIONS[0].id);
  const [customTime, setCustomTime] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("clavicula_customer_info");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name || parsed.phone) {
          if (parsed.name) setCustomerName(parsed.name);
          if (parsed.phone) setCustomerPhone(parsed.phone);
          setIsAutoFilled(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  if (!mounted) return null;

  /* ─── CALCULATION & TAX (PPN 10% KHUSUS SLAWI) ─────────────── */
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // PPN 10% khusus harga dasar Cabang Slawi sesuai struk kasir
  const isSlawi = selectedOutlet === "Slawi";
  const taxRate = isSlawi ? 0.10 : 0;
  const taxAmount = Math.round(subtotal * taxRate);
  const totalNett = subtotal + taxAmount;

  // Comparison with 3rd-party delivery apps (GoFood markup ~20-25% + admin)
  const totalAppPrice = cartItems.reduce((acc, item) => {
    const baseAppPrice = item.appPrice || item.price + 6000;
    return acc + baseAppPrice * item.quantity;
  }, 0) + (isSlawi ? Math.round(subtotal * 0.10) : 0);

  const totalSavings = Math.max(0, totalAppPrice - totalNett);

  /* ─── SMART CROSS-SELL LOGIC ────────────────────────────────── */
  // Check if cart has bottles or beans
  const hasBottle = cartItems.some((it) =>
    it.name.toLowerCase().includes("1 liter") || it.category?.toLowerCase().includes("1 liter")
  );
  const hasBean = cartItems.some((it) =>
    it.category === "Roastery Beans" ||
    it.name.toLowerCase().includes("house blend") ||
    it.name.toLowerCase().includes("arabica lokal") ||
    it.name.toLowerCase().includes("seasonal import") ||
    it.name.toLowerCase().includes("fine robusta") ||
    it.name.toLowerCase().includes("rb-0")
  );
  // Show cross-sell if cart only has single cup drinks or foods
  const showCrossSell = cartItems.length > 0 && !hasBottle && !hasBean;

  /* ─── TIME & OUTLET LABELS ──────────────────────────────────── */
  const selectedSlotObj =
    PICKUP_TIME_OPTIONS.find((s) => s.id === pickupSlot) || PICKUP_TIME_OPTIONS[0];
  const pickupTimeLabel =
    pickupSlot === "custom" && customTime
      ? `Jam Spesifik: ${customTime}`
      : `${selectedSlotObj.label} (${selectedSlotObj.desc})`;

  const outletAddress = isSlawi
    ? "Jl. Dr. Soetomo No. 3, Kalisapu, Slawi, Kab. Tegal"
    : "Jl. Objek Wisata Guci, Tuwel, Bojong, Kab. Tegal";

  const orderTypeLabel =
    orderType === "pickup"
      ? "Ambil di Kasir (Pick-Up / Takeaway)"
      : "Minum di Tempat (Dine-In Saat Tiba)";

  /* ─── CHECKOUT HANDLER ──────────────────────────────────────── */
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customerName.trim()) {
      addToast("Mohon masukkan nama pemesan.");
      return;
    }
    if (!customerPhone.trim()) {
      addToast("Mohon masukkan nomor WhatsApp aktif pemesan.");
      return;
    }

    const digitsOnly = customerPhone.replace(/\D/g, "");
    if (digitsOnly.length < 9) {
      addToast("Nomor WhatsApp belum valid (minimal 10 digit angka).");
      return;
    }

    setIsSubmitting(true);

    // Save customer info in device for instant auto-remember next time
    try {
      localStorage.setItem(
        "clavicula_customer_info",
        JSON.stringify({
          name: customerName.trim(),
          phone: customerPhone.trim(),
        })
      );
    } catch {
      // ignore
    }

    // Generate official Pickup Code: CLV-SLW-XXX or CLV-GCI-XXX
    const randomNum = Math.floor(100 + Math.random() * 900);
    const branchPrefix = isSlawi ? "SLW" : "GCI";
    const pickupCode = `CLV-${branchPrefix}-${randomNum}`;
    const isHighValue = totalNett >= 150000;

    const orderData = {
      pickupCode,
      outlet: selectedOutlet,
      outletAddress,
      orderType,
      orderTypeLabel,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      pickupTime: pickupSlot,
      pickupTimeLabel,
      items: [...cartItems],
      subtotal,
      taxAmount,
      totalAmount: totalNett,
      totalAppPrice,
      totalSavings,
      isHighValue,
      status: "MENUNGGU_KONFIRMASI_WA" as const,
      notes: orderNotes.trim(),
      createdAt: new Date().toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    // Save to localStorage for history
    try {
      const existing = JSON.parse(localStorage.getItem("clavicula_orders") || "[]");
      localStorage.setItem("clavicula_orders", JSON.stringify([orderData, ...existing.slice(0, 9)]));
    } catch {
      // ignore storage error
    }

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      closeCart();
      openPickupTicket(orderData);
      addToast(`Kode Ambil: ${pickupCode}. Silakan kirim WhatsApp untuk konfirmasi kasir!`);
    }, 250);
  };

  /* ─── QUICK CROSS-SELL ADD ──────────────────────────────────── */
  const handleAddManubrium1L = () => {
    const manubriumBot = ONE_LITER_BOTTLES[0];
    addToCart({
      name: "Manubrium 1 Liter",
      price: 125000,
      size: "Kemasan Botol 1 Liter",
      savings: 25000,
      appPrice: 145000,
      image: manubriumBot?.image || "/images/manubrium.jpg",
      category: "1 Liter Bottle",
    });
    addToast("Manubrium 1 Liter ditambahkan ke keranjang!");
  };

  const handleAddHouseBlend = () => {
    const hb = ROASTERY_BEANS[0];
    addToCart({
      name: "Signature House Blend 80:20",
      price: 65000,
      size: "200g",
      grind: "Biji Utuh / Whole Bean (Rekomendasi)",
      savings: 0,
      appPrice: 72000,
      image: hb?.image || "/assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg",
      category: "Roastery Beans",
    });
    addToast("House Blend 200g ditambahkan ke keranjang!");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-espresso/60 backdrop-blur-sm z-[80] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Slide-over Drawer (World-Class Pay at Outlet) */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full max-w-lg bg-linen shadow-2xl z-[90] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── 1. DRAWER HEADER ── */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-chestnut/15 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-vanilla rounded-2xl text-chestnut border border-chestnut/10">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-espresso leading-none">Keranjang Pesanan</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Rp 0 Biaya Admin
                </span>
              </div>
              <span className="text-xs text-chestnut font-serif italic mt-0.5 block">
                Pesan di Web &bull; Ambil &amp; Bayar di Kasir Outlet
              </span>
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

        {/* ── 2. BRANCH SELECTOR DI ATAS KERANJANG (STEP 1) ── */}
        <div className="p-3.5 sm:p-4 bg-espresso text-porcelain border-b border-chestnut/20 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-caramel font-semibold">
              <MapPin size={13} />
              <span>01 / Pilih Cabang Pengambilan:</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-white/10 px-2 py-0.5 rounded-full">
              Bayar di Kasir
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedOutlet("Slawi")}
              className={`p-2.5 rounded-2xl text-left border transition-all ${
                selectedOutlet === "Slawi"
                  ? "bg-white text-espresso border-amber-400 shadow-md font-bold"
                  : "bg-white/10 text-linen/70 border-white/10 hover:bg-white/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">Cabang Utama Slawi</span>
                {selectedOutlet === "Slawi" && <span className="text-[10px] text-chestnut">✓ Aktif</span>}
              </div>
              <span className="text-[10px] block opacity-75 leading-tight mt-0.5">
                Kalisapu, Slawi (Roastery HQ)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedOutlet("Guci")}
              className={`p-2.5 rounded-2xl text-left border transition-all ${
                selectedOutlet === "Guci"
                  ? "bg-white text-espresso border-emerald-400 shadow-md font-bold"
                  : "bg-white/10 text-linen/70 border-white/10 hover:bg-white/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">Cabang Kedua Guci</span>
                {selectedOutlet === "Guci" && <span className="text-[10px] text-forest">✓ Aktif</span>}
              </div>
              <span className="text-[10px] block opacity-75 leading-tight mt-0.5">
                Wisata Guci, Bojong (Hills)
              </span>
            </button>
          </div>
        </div>

        {/* ── 3. SCROLLABLE CONTENT ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center text-espresso/60 py-10">
              <div className="w-16 h-16 rounded-full bg-vanilla flex items-center justify-center mb-3 text-chestnut/40 border border-chestnut/15">
                <Coffee size={32} />
              </div>
              <p className="font-serif italic text-2xl text-espresso mb-1">Keranjang masih kosong</p>
              <p className="text-xs text-espresso/60 max-w-xs mb-6 leading-relaxed">
                Pilih biji sangrai House Blend, Kopi Botol 1 Liter, atau minuman Signature Anatomi favorit Anda.
              </p>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <Link
                  href="/terroir"
                  onClick={closeCart}
                  className="w-full py-3 rounded-full bg-chestnut text-white text-xs font-bold text-center hover:bg-chestnut/90 transition-all shadow-md"
                >
                  Buka Etalase Roastery &amp; Kopi 1L →
                </Link>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="w-full py-2.5 rounded-full bg-white border border-chestnut/20 text-espresso text-xs font-semibold text-center hover:bg-vanilla transition-all"
                >
                  Jelajahi Menu Minuman &amp; Makanan
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Fresh Grind Assurance for Beans */}
              {hasBean && (
                <div className="p-3 bg-amber-50/90 border border-amber-300/70 rounded-2xl flex items-start gap-2.5 shadow-2xs">
                  <ShieldCheck size={18} className="text-chestnut shrink-0 mt-0.5" />
                  <div className="text-[11px] text-espresso/80 leading-relaxed">
                    <strong className="text-chestnut block font-bold">
                      Jaminan Fresh Grind Barista di Kasir:
                    </strong>
                    Untuk menjaga kesegaran maksimal, biji kopi pesanan Bayar di Kasir akan digiling langsung oleh barista saat Anda tiba di outlet (proses 30 detik).
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-2xl border border-chestnut/10 shadow-sm space-y-2.5"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-espresso text-xs sm:text-sm leading-snug">{item.name}</h3>
                          {item.size && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-vanilla text-chestnut font-semibold border border-chestnut/15">
                              {item.size}
                            </span>
                          )}
                        </div>
                        {item.savings && item.savings > 0 ? (
                          <span className="inline-block mt-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Hemat {formatRupiah(item.savings)}
                          </span>
                        ) : null}
                      </div>
                      <span className="font-serif italic text-sm sm:text-base text-chestnut font-bold whitespace-nowrap">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Grind Selector strictly for Roastery Beans only (Never for drinks/food) */}
                    {(item.category === "Roastery Beans" ||
                      item.name.toLowerCase().includes("house blend") ||
                      item.name.toLowerCase().includes("arabica lokal") ||
                      item.name.toLowerCase().includes("seasonal import") ||
                      item.name.toLowerCase().includes("fine robusta") ||
                      item.name.toLowerCase().includes("rb-0")) && (
                      <div className="bg-linen p-2 rounded-xl border border-chestnut/10">
                        <label className="text-[9px] font-mono text-espresso/60 uppercase tracking-wider block mb-1">
                          Tingkat Gilingan:
                        </label>
                        <select
                          value={item.grind || GRIND_OPTIONS[0].label}
                          onChange={(e) => updateItemGrind(item.id, e.target.value)}
                          className="w-full text-xs bg-white border border-chestnut/20 rounded-lg px-2 py-1 font-medium text-espresso focus:outline-none focus:ring-1 focus:ring-chestnut"
                        >
                          {GRIND_OPTIONS.map((g) => (
                            <option key={g.id} value={g.label}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1 border-t border-dashed border-chestnut/10">
                      <span className="text-[10px] text-espresso/50">
                        @{formatRupiah(item.price)}
                      </span>
                      <div className="flex items-center gap-2.5 bg-linen border border-chestnut/20 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-espresso/70 hover:text-chestnut p-0.5 transition-colors"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-espresso/70 hover:text-chestnut p-0.5 transition-colors"
                          aria-label="Tambah jumlah"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── 4. SMART CROSS-SELL 1-KLIK (JIKA HANYA CUP / MAKANAN) ── */}
              {showCrossSell && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 shadow-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-espresso">
                        Sekalian Bawa Pulang Stok di Rumah?
                      </h4>
                      <p className="text-[11px] text-espresso/70 leading-relaxed mt-0.5">
                        Hemat lebih banyak dengan membawa pulang Kopi Botol 1 Liter atau Biji Kopi House Blend untuk stok di kulkas:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleAddManubrium1L}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-amber-300 hover:border-chestnut text-left transition-all shadow-2xs group"
                    >
                      <div>
                        <div className="font-bold text-[11px] text-espresso group-hover:text-chestnut">
                          + Manubrium 1L
                        </div>
                        <div className="text-[10px] text-chestnut font-semibold">
                          Rp 125.000 <span className="text-emerald-700">(Hemat 25K)</span>
                        </div>
                      </div>
                      <Plus size={14} className="text-chestnut shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={handleAddHouseBlend}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-amber-300 hover:border-chestnut text-left transition-all shadow-2xs group"
                    >
                      <div>
                        <div className="font-bold text-[11px] text-espresso group-hover:text-chestnut">
                          + House Blend 200g
                        </div>
                        <div className="text-[10px] text-chestnut font-semibold">
                          Rp 65.000 <span className="text-espresso/60">(Biji Utuh)</span>
                        </div>
                      </div>
                      <Plus size={14} className="text-chestnut shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── 5. TRANSPARANSI HARGA KASIR (PPN 10% SLAWI) ── */}
              <div className="p-3.5 rounded-2xl bg-white border border-chestnut/10 shadow-sm space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-espresso font-bold mb-1">
                  <TrendingDown size={14} className="text-emerald-600" />
                  <span>Rincian Transparan Struk Kasir ({selectedOutlet}):</span>
                </div>

                <div className="flex justify-between text-espresso/70 text-[11px]">
                  <span>Subtotal Pesanan:</span>
                  <span className="font-semibold text-espresso">{formatRupiah(subtotal)}</span>
                </div>

                {isSlawi ? (
                  <div className="flex justify-between text-espresso/70 text-[11px]">
                    <span className="flex items-center gap-1">
                      PPN 10% (Khusus Resto Slawi):
                      <span title="PPN 10% sesuai peraturan kasir outlet Slawi">
                        <Info size={11} className="text-espresso/40" />
                      </span>
                    </span>
                    <span className="font-semibold text-espresso">{formatRupiah(taxAmount)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-espresso/70 text-[11px]">
                    <span>PPN Resto:</span>
                    <span className="text-emerald-700 font-medium">Sudah Termasuk (Nett Guci)</span>
                  </div>
                )}

                <div className="flex justify-between text-espresso/70 text-[11px]">
                  <span>Biaya Admin &amp; Layanan Web:</span>
                  <span className="text-emerald-600 font-bold">Rp 0 (GRATIS)</span>
                </div>

                <div className="pt-2 border-t border-dashed border-chestnut/15 flex justify-between items-center">
                  <div>
                    <span className="font-black text-espresso text-xs block">
                      TOTAL NETT BAYAR DI KASIR:
                    </span>
                    <span className="text-[10px] text-espresso/50">
                      100% Cocok dengan Struk Mesin Kasir
                    </span>
                  </div>
                  <span className="font-serif italic font-black text-base text-chestnut">
                    {formatRupiah(totalNett)}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="bg-emerald-50 text-emerald-800 p-1.5 rounded-lg text-center text-[10px] font-bold">
                    🎉 Lebih murah {formatRupiah(totalSavings)} dibanding pesan via aplikasi ojol!
                  </div>
                )}
              </div>

              {/* ── 6. FORM AMBIL CEPAT (4 FIELD, TANPA RESERVASI MEJA) ── */}
              <div className="p-4 rounded-2xl bg-white border border-chestnut/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-espresso uppercase font-mono tracking-wider">
                    02 / Data Pengambilan (Tanpa Login):
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-semibold">15 Detik Selesai</span>
                </div>

                {/* Auto-filled banner if returning customer */}
                {isAutoFilled && (
                  <div className="flex items-center justify-between text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles size={12} className="text-emerald-600 shrink-0" />
                      Data nama &amp; WA terisi otomatis dari pesanan Anda sebelumnya
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerName("");
                        setCustomerPhone("");
                        setIsAutoFilled(false);
                        try {
                          localStorage.removeItem("clavicula_customer_info");
                        } catch {}
                      }}
                      className="text-[9px] underline hover:text-chestnut ml-2 text-emerald-700 shrink-0 font-semibold"
                    >
                      (Ganti)
                    </button>
                  </div>
                )}

                {/* Field 1: Nama */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-espresso/60 block mb-1">
                    Nama Pemesan *
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Dimas / Farhan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2 rounded-xl border border-chestnut/20 bg-linen focus:bg-white focus:outline-none focus:ring-1 focus:ring-chestnut font-medium text-espresso"
                  />
                </div>

                {/* Field 2: Nomor WhatsApp */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-espresso/60 block mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2 rounded-xl border border-chestnut/20 bg-linen focus:bg-white focus:outline-none focus:ring-1 focus:ring-chestnut font-medium text-espresso"
                  />
                  <span className="text-[9px] text-espresso/50 mt-0.5 block">
                    Kasir akan mengirim update &amp; konfirmasi pesanan ke nomor ini
                  </span>
                </div>

                {/* Field 3: Tipe Pesanan (Radio: Pick-Up vs Dine-In) */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-espresso/60 block mb-1.5">
                    Tipe Pesanan *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        orderType === "pickup"
                          ? "bg-amber-50/80 border-chestnut text-espresso font-bold shadow-2xs"
                          : "bg-linen border-chestnut/15 text-espresso/70 hover:border-chestnut/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="orderType"
                        value="pickup"
                        checked={orderType === "pickup"}
                        onChange={() => setOrderType("pickup")}
                        className="text-chestnut focus:ring-chestnut"
                      />
                      <PackageCheck size={14} className="text-chestnut shrink-0" />
                      <span className="text-[11px] leading-tight">Ambil di Kasir (Pick-Up)</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        orderType === "dine_in"
                          ? "bg-amber-50/80 border-chestnut text-espresso font-bold shadow-2xs"
                          : "bg-linen border-chestnut/15 text-espresso/70 hover:border-chestnut/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="orderType"
                        value="dine_in"
                        checked={orderType === "dine_in"}
                        onChange={() => setOrderType("dine_in")}
                        className="text-chestnut focus:ring-chestnut"
                      />
                      <UtensilsCrossed size={14} className="text-chestnut shrink-0" />
                      <span className="text-[11px] leading-tight">Minum di Tempat (Dine-In)</span>
                    </label>
                  </div>
                  <span className="text-[9px] text-espresso/50 mt-1 block">
                    {orderType === "dine_in"
                      ? "Pilih meja saat Anda tiba — tidak ada biaya reservasi."
                      : "Pesanan dikemas rapi untuk dibawa pulang tanpa antre."}
                  </span>
                </div>

                {/* Field 4: Estimasi Waktu Ambil */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-espresso/60 block mb-1.5">
                    Estimasi Waktu Kedatangan di Kasir *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {PICKUP_TIME_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          pickupSlot === opt.id
                            ? "bg-amber-50/80 border-chestnut text-espresso font-semibold"
                            : "bg-linen border-chestnut/15 text-espresso/70 hover:border-chestnut/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="pickupSlot"
                          value={opt.id}
                          checked={pickupSlot === opt.id}
                          onChange={() => setPickupSlot(opt.id)}
                          className="mt-0.5 text-chestnut focus:ring-chestnut"
                        />
                        <div className="leading-tight">
                          <span className="text-[11px] font-bold block">{opt.label}</span>
                          <span className="text-[9px] text-espresso/50 block">{opt.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {pickupSlot === "custom" && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Contoh: Jam 15.30 WIB atau Besok Pagi 09.00"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-chestnut/20 focus:outline-none focus:ring-1 focus:ring-chestnut bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Optional Catatan */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-espresso/60 block mb-1">
                    Catatan untuk Kasir / Barista (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Less ice, gula aren dipisah, atau minta paper bag"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-chestnut/20 bg-linen focus:bg-white focus:outline-none focus:ring-1 focus:ring-chestnut resize-none text-espresso"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── 7. DRAWER FOOTER: TOMBOL CHECKOUT (BAYAR DI KASIR) ── */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-chestnut/15 space-y-2.5 shadow-lg shrink-0">
            {/* Branch Selection Guard (Anti-Salah Outlet) */}
            <div className="flex items-center justify-between p-2.5 bg-vanilla/70 border border-chestnut/15 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-chestnut shrink-0" />
                <div>
                  <span className="font-bold text-espresso block text-[11px]">
                    Outlet Ambil: {isSlawi ? "Cabang 01 Slawi (Roastery HQ)" : "Cabang 02 Guci Hills"}
                  </span>
                  <span className="text-[10px] text-espresso/60 block">
                    {isSlawi ? "Buka 08.00 — 23.00 WIB" : "Buka 09.00 — 21.00 WIB"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOutlet(isSlawi ? "Guci" : "Slawi")}
                className="text-[10px] font-mono text-chestnut hover:bg-chestnut hover:text-white font-bold px-2 py-1 rounded-lg bg-white border border-chestnut/20 transition-all shrink-0"
              >
                Ganti Cabang ⇄
              </button>
            </div>

            {/* Smart Safety Cap Alert (Partai Besar vs Reguler) */}
            {totalNett >= 150000 ? (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-espresso leading-snug flex items-start gap-2">
                <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block text-[11px]">
                    Proteksi Pesanan Besar (&ge; Rp 150.000)
                  </span>
                  <span className="text-espresso/70 text-[10px] leading-tight block">
                    Untuk menjaga kesegaran hidangan, kasir akan memvalidasi &amp; mengirim QRIS DP via WhatsApp sebelum pesanan mulai dimasak.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 leading-tight flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>
                  <strong>Fresh Guarantee:</strong> Makanan &amp; minuman baru dibuat saat Anda konfirmasi WA atau tiba di kasir.
                </span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="text-[10px] text-espresso/60 block uppercase font-mono">
                  Total Bayar di Kasir {selectedOutlet}:
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  ✓ Rp 0 Admin &bull; Tunai / QRIS di Kasir
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif italic text-2xl font-black text-chestnut">
                  {formatRupiah(totalNett)}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full bg-chestnut hover:bg-chestnut/90 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <CheckCircle size={18} />
              <span>Buat Kode Ambil &amp; Konfirmasi ke Kasir</span>
            </button>

            {/* Anti-Ambiguity Reminder */}
            <p className="text-[10px] text-center text-espresso/60 font-medium leading-relaxed">
              🔒 <strong>Bayar di Outlet:</strong> Tidak perlu transfer sekarang. Tunjukkan kode tiket di kasir saat mengambil pesanan.
            </p>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-espresso/40 hover:text-chestnut transition-colors pt-0.5"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </>
  );
}
