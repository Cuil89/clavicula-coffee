"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { useUI } from "@/components/UIProvider";
import {
  ROASTERY_BEANS,
  ONE_LITER_BOTTLES,
  ANATOMY_DRINKS,
  PROMO_HOURS_ITEMS,
  POPULAR_FOODS,
  GRIND_OPTIONS,
  RoastBean,
  OneLiterBottle,
  AnatomyDrink,
  PromoItem,
  PopularFood,
} from "@/data/roasteryData";
import { formatRupiah } from "@/utils/receiptGenerator";
import {
  Coffee,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Clock,
  MapPin,
  Flame,
  Award,
  Zap,
} from "lucide-react";

/* ─── TICKER DATA ──────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "PESAN DI WEB · BAYAR DI KASIR OUTLET (Rp 0 BIAYA ADMIN)",
  "FRESH GRIND DI KASIR SAAT AMBIL",
  "SLAWI ROASTERY HQ & GUCI HILLS",
  "CLAVICULA SIGNATURE HOUSE BLEND 80:20",
  "KOPI BOTOL 1 LITER UNTUK STOK KULKAS",
  "PROMO NGOPI PAGI 08.00-10.00 & SORE 15.00-17.00",
  "100% GUEST CHECKOUT TANPA LOGIN",
];

export default function TerroirPage() {
  const { addToCart, selectedOutlet, setSelectedOutlet, openCart, cartItems } = useUI();

  /* ─── 3 MAIN TABS STATE ──────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState<"tab-roastery" | "tab-anatomy" | "tab-promo">("tab-roastery");

  /* ─── SELECTION STATES FOR BEANS ─────────────────────────────── */
  const [selectedSizes, setSelectedSizes] = useState<Record<string, "200g" | "500g" | "1kg">>({
    "RB-01": "500g", // Default Best Value
    "RB-02": "200g",
    "RB-03": "200g",
    "RB-04": "200g",
  });

  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, string>>({
    "RB-01": "whole",
    "RB-02": "medium",
    "RB-03": "medium",
    "RB-04": "fine",
  });

  const [stickyVisible, setStickyVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const catalogRef = useRef<HTMLDivElement>(null);

  /* ─── SCROLL INDICATOR ───────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
      setStickyVisible(window.scrollY > 450);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  /* ─── ADD TO CART HANDLERS ───────────────────────────────────── */
  const markAdded = (id: string) => {
    setAddedItems((prev) => [...prev, id]);
    setTimeout(() => setAddedItems((prev) => prev.filter((item) => item !== id)), 2000);
  };

  // 1. Add Roast Bean
  const handleAddBean = useCallback(
    (bean: RoastBean) => {
      const size = selectedSizes[bean.sku] ?? "200g";
      const grindId = selectedGrinds[bean.sku] ?? "whole";
      const grindObj = GRIND_OPTIONS.find((m) => m.id === grindId) ?? GRIND_OPTIONS[0];
      const priceInfo = bean.prices[size];
      const appRefPrice = bean.appComparisonPrice[size];

      addToCart({
        name: `${bean.shortName}`,
        price: priceInfo.price,
        size,
        grind: grindObj.label,
        savings: priceInfo.savings,
        appPrice: appRefPrice,
        image: bean.image,
        category: "Roastery Beans",
      });

      markAdded(bean.sku);
    },
    [addToCart, selectedSizes, selectedGrinds]
  );

  // 2. Add 1 Liter Bottle
  const handleAddBottle = useCallback(
    (bottle: OneLiterBottle) => {
      addToCart({
        name: bottle.name,
        price: bottle.price,
        size: "Botol 1 Liter (5 Porsi)",
        savings: bottle.savings,
        appPrice: bottle.appPrice,
        image: bottle.image,
        category: "1 Liter Bottle",
      });
      markAdded(bottle.id);
    },
    [addToCart]
  );

  // 3. Add Signature Anatomy Drink
  const handleAddAnatomy = useCallback(
    (drink: AnatomyDrink) => {
      addToCart({
        name: `${drink.name} (Cup)`,
        price: drink.price,
        size: "Reguler Cup",
        savings: 5000,
        appPrice: drink.price + 5000,
        image: drink.image,
        category: "Signature Anatomi",
      });
      markAdded(drink.id);
    },
    [addToCart]
  );

  // 4. Add Promo Item
  const handleAddPromo = useCallback(
    (promo: PromoItem) => {
      addToCart({
        name: `${promo.name} [Promo Jam Ngopi]`,
        price: promo.promoPrice,
        savings: promo.normalPrice - promo.promoPrice,
        appPrice: promo.normalPrice + 4000,
        category: promo.category,
      });
      markAdded(promo.id);
    },
    [addToCart]
  );

  // 5. Add Popular Food
  const handleAddFood = useCallback(
    (food: PopularFood) => {
      addToCart({
        name: food.name,
        price: food.price,
        savings: 6000,
        appPrice: food.price + 6000,
        image: food.image,
        category: "Makanan Populer",
      });
      markAdded(food.id);
    },
    [addToCart]
  );

  const heroBean = ROASTERY_BEANS[0]; // Clavicula Signature House Blend 80:20
  const barBeans = ROASTERY_BEANS.slice(1); // Arabica Lokal, Arabica Import, Fine Robusta

  return (
    <>
      {/* ══ SCROLL PROGRESS BAR ══════════════════════════════════ */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      <main className="bg-linen text-espresso overflow-x-hidden pt-12 md:pt-14">
        {/* ══ 1 ▸ CINEMATIC HERO (PAY AT OUTLET ANCHOR) ═════════════ */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-end overflow-hidden bg-espresso text-porcelain">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 bg-espresso">
            <div className="anim-pan w-full h-full opacity-45">
              <Image
                src="/assets/clavicula/places/roastery-lab-clavicula-slawi.jpg"
                alt="Clavicula Roastery Lab Kalisapu Slawi"
                fill
                priority
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pb-12 md:pb-20 w-full">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-chestnut/30 border border-caramel/40 mb-4 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-caramel font-bold">
                  Click &amp; Collect &bull; Pay at Outlet (Rp 0 Admin)
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-black text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] tracking-tighter text-porcelain mb-4">
                Pesan di Web,<br />
                <em className="font-serif font-normal not-italic text-caramel">
                  Ambil &amp; Bayar di Kasir
                </em>
              </h1>

              <p className="font-serif italic text-base md:text-xl text-linen/85 max-w-2xl leading-relaxed mb-6">
                Nikmati harga gerai asli tanpa potongan komisi ojol. Biji kopi sangrai fresh, Kopi Botol 1 Liter, dan menu Signature Anatomi siap diambil tanpa antre di Cabang Slawi &amp; Guci.
              </p>

              {/* Quick Action Row */}
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#etalase"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-chestnut hover:bg-caramel text-white font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-chestnut/40 anim-pulse-glow"
                >
                  <span>Buka Etalase Produk Real-Case</span>
                  <ArrowRight size={16} />
                </a>

                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-porcelain">
                  <span>📍 Outlet Ambil:</span>
                  <span className="font-bold text-amber-300">
                    {selectedOutlet === "Slawi" ? "Cabang Slawi (Roastery)" : "Cabang Guci Hills"}
                  </span>
                </div>
              </div>

              {/* Real-Case Operational Assurance */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-linen/75">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Rp 0 Biaya Transfer / Admin</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-amber-400 shrink-0" />
                  <span>Fresh Grind Barista di Kasir</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Clock size={16} className="text-caramel shrink-0" />
                  <span>Checkout Guest &lt; 15 Detik</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2 ▸ TICKER MARQUEE ═══════════════════════════════════ */}
        <div className="bg-espresso border-y border-chestnut/20 py-3 overflow-hidden">
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-4 px-4">
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-caramel font-semibold whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-chestnut/40">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 3 ▸ BRANCH SWITCHER STRIP ════════════════════════════ */}
        <section className="bg-white border-b border-chestnut/10 sticky top-12 md:top-14 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-espresso/70">
              <MapPin size={15} className="text-chestnut" />
              <span className="font-medium">Lokasi Pengambilan &amp; Pembayaran:</span>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-vanilla rounded-full border border-chestnut/15">
              <button
                type="button"
                onClick={() => setSelectedOutlet("Slawi")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedOutlet === "Slawi"
                    ? "bg-espresso text-porcelain shadow-sm"
                    : "text-espresso/70 hover:text-espresso"
                }`}
              >
                📍 Cabang Slawi (Roastery HQ)
              </button>
              <button
                type="button"
                onClick={() => setSelectedOutlet("Guci")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedOutlet === "Guci"
                    ? "bg-espresso text-porcelain shadow-sm"
                    : "text-espresso/70 hover:text-espresso"
                }`}
              >
                ⛰️ Cabang Guci Hills
              </button>
            </div>
          </div>
        </section>

        {/* ══ 4 ▸ ETALASE PENJUALAN: 3 TAB KATEGORI UTAMA ═══════════ */}
        <section id="etalase" ref={catalogRef} className="py-12 md:py-16 max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-chestnut font-semibold">
              Katalog Resmi Outlet Clavicula
            </span>
            <h2 className="mt-1 font-display font-black text-3xl md:text-5xl tracking-tight text-espresso">
              Etalase Pesan &amp; Ambil
            </h2>
            <p className="mt-2 text-xs md:text-sm text-espresso/70 font-serif italic">
              Pilih menu yang ingin Anda ambil di kasir. Biji kopi, kopi botol kulkas, dan minuman signature siap disiapkan barista tanpa antre.
            </p>
          </div>

          {/* ── THE 3 TABS SELECTOR ── */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap justify-center p-1.5 bg-vanilla rounded-3xl border border-chestnut/15 shadow-sm max-w-full">
              <button
                onClick={() => setActiveTab("tab-roastery")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === "tab-roastery"
                    ? "bg-espresso text-porcelain shadow-md"
                    : "text-espresso/70 hover:text-espresso hover:bg-white/50"
                }`}
              >
                <Coffee size={16} className={activeTab === "tab-roastery" ? "text-amber-400" : "text-chestnut"} />
                <span>1. Take-Home Roastery &amp; Kopi 1L</span>
              </button>

              <button
                onClick={() => setActiveTab("tab-anatomy")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === "tab-anatomy"
                    ? "bg-espresso text-porcelain shadow-md"
                    : "text-espresso/70 hover:text-espresso hover:bg-white/50"
                }`}
              >
                <Sparkles size={16} className={activeTab === "tab-anatomy" ? "text-amber-400" : "text-chestnut"} />
                <span>2. Signature Anatomy Series</span>
              </button>

              <button
                onClick={() => setActiveTab("tab-promo")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === "tab-promo"
                    ? "bg-espresso text-porcelain shadow-md"
                    : "text-espresso/70 hover:text-espresso hover:bg-white/50"
                }`}
              >
                <Flame size={16} className={activeTab === "tab-promo" ? "text-amber-400" : "text-chestnut"} />
                <span>3. Paket Promo &amp; Makanan</span>
              </button>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              TAB 1: TAKE-HOME ROASTERY & KOPI 1 LITER (HIGH TICKET)
             ════════════════════════════════════════════════════════ */}
          {activeTab === "tab-roastery" && (
            <div className="space-y-16 animate-in fade-in duration-300">
              {/* ── 1. HERO PRODUCT: CLAVICULA SIGNATURE HOUSE BLEND 80:20 ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award size={18} className="text-chestnut" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-chestnut">
                    Hero Product &bull; Bintang Utama Roastery
                  </span>
                </div>

                <div className="bg-white rounded-[32px] border-2 border-chestnut/20 overflow-hidden shadow-warm-card grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Image & Badges */}
                  <div className="lg:col-span-5 relative h-[320px] lg:h-auto min-h-[320px] bg-char">
                    <Image
                      src={heroBean.image}
                      alt={heroBean.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full font-mono text-xs font-black bg-amber-400 text-espresso shadow">
                        RESMI ESPRESSO BAR
                      </span>
                      <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold bg-espresso/80 text-porcelain backdrop-blur-sm">
                        80% Arabica : 20% Robusta
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-porcelain">
                      <p className="font-mono text-[11px] text-caramel uppercase tracking-wider">
                        {heroBean.origin}
                      </p>
                      <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight">
                        {heroBean.shortName}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Details, Gramasi, Grind Selector & CTA */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {heroBean.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="px-2.5 py-0.5 rounded-full bg-vanilla text-espresso text-xs font-semibold border border-chestnut/10"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed mb-5">
                        {heroBean.description}
                      </p>

                      {/* ─ Gramasi Selector ─ */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-espresso/60 font-semibold">
                            Pilih Ukuran Kemasan:
                          </label>
                          <span className="text-[11px] text-chestnut font-semibold">
                            Beli banyak lebih hemat
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {(["200g", "500g", "1kg"] as const).map((sz) => {
                            const p = heroBean.prices[sz];
                            const isSel = selectedSizes[heroBean.sku] === sz;
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => setSelectedSizes((prev) => ({ ...prev, [heroBean.sku]: sz }))}
                                className={`relative p-3 rounded-2xl border text-center transition-all ${
                                  isSel
                                    ? "bg-espresso text-porcelain border-espresso shadow-md ring-2 ring-amber-400/50"
                                    : "bg-linen border-chestnut/15 text-espresso hover:border-chestnut/40"
                                }`}
                              >
                                {p.badge && (
                                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-espresso text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shadow">
                                    {p.badge}
                                  </span>
                                )}
                                <div className="font-black text-sm">{sz}</div>
                                <div className={`font-serif italic text-xs mt-0.5 ${isSel ? "text-caramel" : "text-chestnut"}`}>
                                  {formatRupiah(p.price)}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ─ Grind Selector ─ */}
                      <div className="mb-4">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-espresso/60 font-semibold block mb-2">
                          Opsi Gilingan (Grind Size):
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {GRIND_OPTIONS.map((g) => {
                            const isGrind = selectedGrinds[heroBean.sku] === g.id;
                            return (
                              <button
                                key={g.id}
                                type="button"
                                onClick={() => setSelectedGrinds((prev) => ({ ...prev, [heroBean.sku]: g.id }))}
                                className={`p-2 rounded-xl border text-left transition-all ${
                                  isGrind
                                    ? "bg-chestnut text-white border-chestnut shadow-2xs font-semibold"
                                    : "bg-linen border-chestnut/15 text-espresso/80 hover:border-chestnut/30 text-xs"
                                }`}
                              >
                                <span className="font-bold text-xs block leading-tight">{g.short}</span>
                                <span className="text-[9px] opacity-75 block truncate mt-0.5">{g.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ─ Operational Factual Note ─ */}
                      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/80 flex items-start gap-2 text-xs text-espresso/80">
                        <ShieldCheck size={16} className="text-chestnut shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          <strong>Catatan Barista di Kasir:</strong> Untuk menjaga kesegaran dan mencegah salah giling, biji kopi pesanan Bayar di Outlet akan digiling langsung (Fresh Grind) oleh barista saat Anda tiba di kasir (proses 30 detik).
                        </span>
                      </div>
                    </div>

                    {/* ─ Action CTA ─ */}
                    <div className="pt-4 border-t border-chestnut/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-espresso/50 block">Harga Bayar di Kasir:</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif italic text-2xl font-black text-chestnut">
                            {formatRupiah(heroBean.prices[selectedSizes[heroBean.sku] ?? "500g"].price)}
                          </span>
                          <span className="text-[11px] text-espresso/40 line-through">
                            {formatRupiah(heroBean.appComparisonPrice[selectedSizes[heroBean.sku] ?? "500g"])}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddBean(heroBean)}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                          addedItems.includes(heroBean.sku)
                            ? "bg-emerald-600 text-white"
                            : "bg-espresso hover:bg-chestnut text-porcelain"
                        }`}
                      >
                        {addedItems.includes(heroBean.sku) ? (
                          <>
                            <Check size={16} /> Ditambahkan ke Keranjang
                          </>
                        ) : (
                          <>+ Pesan House Blend (Bayar di Kasir)</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 2. OPSI BIJI SEDUH BAR (MANUAL BREW KEDAI) ── */}
              <div>
                <div className="mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-chestnut block">
                    Pilihan Biji Seduh Manual Brew Bar
                  </span>
                  <h3 className="font-display font-black text-2xl text-espresso">
                    Koleksi Biji Single Origin &amp; Robusta Kedai
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {barBeans.map((bean) => {
                    const size = selectedSizes[bean.sku] ?? "200g";
                    const isAdded = addedItems.includes(bean.sku);
                    return (
                      <div
                        key={bean.sku}
                        className="bg-white rounded-[24px] border border-chestnut/12 overflow-hidden flex flex-col shadow-sm"
                      >
                        <div className="relative h-44 bg-char">
                          <Image src={bean.image} alt={bean.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-espresso/80 text-porcelain font-mono text-[10px] font-bold">
                              {bean.sku}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-porcelain">
                            <p className="font-mono text-[10px] text-caramel uppercase">{bean.origin}</p>
                            <h4 className="font-bold text-sm leading-tight truncate">{bean.shortName}</h4>
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1 justify-between space-y-4">
                          <div>
                            <p className="text-xs text-espresso/65 leading-relaxed line-clamp-2 mb-3">
                              {bean.description}
                            </p>

                            {/* Gramasi Selector */}
                            <div className="grid grid-cols-3 gap-1.5 mb-2">
                              {(["200g", "500g", "1kg"] as const).map((sz) => (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => setSelectedSizes((prev) => ({ ...prev, [bean.sku]: sz }))}
                                  className={`p-1.5 rounded-lg border text-center text-xs transition-all ${
                                    size === sz
                                      ? "bg-espresso text-porcelain border-espresso font-bold"
                                      : "bg-linen border-chestnut/15 text-espresso"
                                  }`}
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-chestnut/10 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-espresso/50 block">Bayar Kasir:</span>
                              <span className="font-serif italic font-bold text-base text-chestnut">
                                {formatRupiah(bean.prices[size].price)}
                              </span>
                            </div>

                            <button
                              onClick={() => handleAddBean(bean)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow ${
                                isAdded
                                  ? "bg-emerald-600 text-white"
                                  : "bg-espresso hover:bg-chestnut text-porcelain"
                              }`}
                            >
                              {isAdded ? "✓ Masuk" : "+ Pesan"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── 3. KATALOG RESMI KOPI BOTOL 1 LITER (9 VARIAN LENGKAP) ── */}
              <div>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-chestnut block">
                      Stok Kulkas &bull; Siap Minum (5 Porsi)
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-espresso">
                      Koleksi Resmi Kopi Botol 1 Liter
                    </h3>
                  </div>
                  <p className="text-xs text-espresso/60 font-serif italic max-w-sm">
                    Harga resmi gerai Clavicula. Lebih hemat hingga Rp 40.000 dibanding membeli per-cup atau via ojol.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ONE_LITER_BOTTLES.map((bottle) => {
                    const isAdded = addedItems.includes(bottle.id);
                    return (
                      <div
                        key={bottle.id}
                        className="bg-white rounded-[22px] border border-chestnut/12 overflow-hidden flex flex-col shadow-sm hover:shadow-warm-card transition-all"
                      >
                        <div className="relative h-44 bg-vanilla">
                          <Image src={bottle.image} alt={bottle.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />

                          {bottle.badge && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-mono shadow">
                                {bottle.badge}
                              </span>
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 text-porcelain">
                            <span className="text-[10px] font-mono text-amber-300 block">{bottle.servingCount}</span>
                            <h4 className="font-bold text-base leading-tight truncate">{bottle.name}</h4>
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                          <div>
                            <span className="text-[11px] font-semibold text-chestnut block mb-1">
                              {bottle.flavorNote}
                            </span>
                            <p className="text-xs text-espresso/60 leading-relaxed line-clamp-2">
                              {bottle.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-chestnut/10 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] text-espresso/40 line-through">
                                {formatRupiah(bottle.appPrice)}
                              </div>
                              <div className="font-serif italic font-black text-lg text-chestnut leading-none">
                                {formatRupiah(bottle.price)}
                              </div>
                              <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">
                                Hemat {formatRupiah(bottle.savings)}
                              </span>
                            </div>

                            <button
                              onClick={() => handleAddBottle(bottle)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow ${
                                isAdded
                                  ? "bg-emerald-600 text-white"
                                  : "bg-espresso hover:bg-chestnut text-porcelain"
                              }`}
                            >
                              {isAdded ? "✓ Masuk" : "+ Pesan 1L"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
              TAB 2: SIGNATURE ANATOMY SERIES (12 VARIAN RESMI)
             ════════════════════════════════════════════════════════ */}
          {activeTab === "tab-anatomy" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-vanilla/60 p-4 rounded-2xl border border-chestnut/15 text-xs text-espresso/80 flex items-start gap-2.5">
                <Sparkles size={16} className="text-chestnut shrink-0 mt-0.5" />
                <span>
                  <strong>Penerjemah Rasa Anatomi Clavicula:</strong> Setiap menu dinamai dari anatomi tulang &amp; otot medis oleh dokter pendiri kami. Lihat tag karakter rasa di setiap kartu agar Anda tidak bingung memilih!
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {ANATOMY_DRINKS.map((drink) => {
                  const isAdded = addedItems.includes(drink.id);
                  return (
                    <div
                      key={drink.id}
                      className="bg-white rounded-[22px] border border-chestnut/12 overflow-hidden flex flex-col shadow-sm hover:shadow-warm-card transition-all"
                    >
                      <div className="relative h-48 bg-vanilla">
                        <Image src={drink.image} alt={drink.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />

                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              drink.isCoffee ? "bg-chestnut text-white" : "bg-forest text-white"
                            }`}
                          >
                            {drink.isCoffee ? "Kopi" : "Non-Kopi"}
                          </span>
                          {drink.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-espresso text-[9px] font-black font-mono">
                              {drink.badge}
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-porcelain">
                          <h4 className="font-display font-black text-xl leading-tight">{drink.name}</h4>
                          <span className="text-[10px] font-mono text-amber-300 block line-clamp-1">
                            {drink.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                        <div>
                          <div className="p-2 bg-vanilla/60 rounded-xl border border-chestnut/10 mb-2">
                            <span className="text-[10px] font-mono uppercase text-chestnut font-bold block mb-0.5">
                              Profil Rasa:
                            </span>
                            <span className="text-xs text-espresso font-medium block leading-snug">
                              {drink.flavorNotes}
                            </span>
                          </div>
                          <p className="text-[11px] text-espresso/60 leading-relaxed line-clamp-2">
                            {drink.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-chestnut/10 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-espresso/50 block">Harga Kasir:</span>
                            <span className="font-serif italic font-bold text-lg text-chestnut">
                              {formatRupiah(drink.price)}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAddAnatomy(drink)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-espresso hover:bg-chestnut text-porcelain"
                            }`}
                          >
                            {isAdded ? "✓ Masuk" : "+ Pesan Cup"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
              TAB 3: PAKET HEMAT JAM NGOPI & MAKANAN FAVORIT
             ════════════════════════════════════════════════════════ */}
          {activeTab === "tab-promo" && (
            <div className="space-y-12 animate-in fade-in duration-300">
              {/* ── 1. BANNER PROMO NGOPI PAGI & SORE SLAWI ── */}
              <div className="bg-gradient-to-r from-amber-600 via-chestnut to-espresso text-porcelain rounded-[32px] p-6 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-espresso text-[11px] font-black font-mono uppercase mb-3">
                    <Flame size={13} />
                    PROMO KHUSUS CABANG SLAWI (RP 12.000 – RP 20.000)
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white mb-2 leading-tight">
                    Jam Promo Ngopi Pagi &amp; Sore
                  </h3>
                  <p className="text-xs sm:text-sm text-linen/90 font-serif italic mb-6 leading-relaxed">
                    Berlaku setiap hari di Clavicula Slawi: <strong>Pagi 08.00–10.00 WIB</strong> &amp; <strong>Sore 15.00–17.00 WIB</strong>. Pesan sekarang untuk diambil pada jam promo!
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROMO_HOURS_ITEMS.map((item) => {
                      const isAdded = addedItems.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-2xl flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="font-bold text-xs text-white block">{item.name}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-amber-300 font-bold font-serif italic text-sm">
                                {formatRupiah(item.promoPrice)}
                              </span>
                              <span className="text-[10px] text-white/50 line-through">
                                {formatRupiah(item.normalPrice)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddPromo(item)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                              isAdded
                                ? "bg-emerald-500 text-white"
                                : "bg-amber-400 hover:bg-amber-300 text-espresso shadow"
                            }`}
                          >
                            {isAdded ? "✓" : "+ Ambil"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── 2. MENU MAKANAN POPULER KEDAI ── */}
              <div>
                <div className="mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-chestnut block">
                    Pendamping Ngopi Mantap
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-espresso">
                    Menu Makanan Populer Kedai
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {POPULAR_FOODS.map((food) => {
                    const isAdded = addedItems.includes(food.id);
                    return (
                      <div
                        key={food.id}
                        className="bg-white rounded-[24px] border border-chestnut/12 overflow-hidden flex flex-col shadow-sm"
                      >
                        <div className="relative h-48 bg-vanilla">
                          <Image src={food.image} alt={food.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />

                          {food.badge && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-chestnut text-white text-[10px] font-bold font-mono">
                                {food.badge}
                              </span>
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 text-porcelain">
                            <h4 className="font-bold text-base leading-tight truncate">{food.name}</h4>
                            <span className="text-[10px] font-mono text-amber-300 block truncate">
                              {food.tag}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                          <p className="text-xs text-espresso/65 leading-relaxed">
                            {food.description}
                          </p>

                          <div className="pt-2 border-t border-chestnut/10 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] text-espresso/50 block">Harga Kasir:</span>
                              <span className="font-serif italic font-bold text-lg text-chestnut">
                                {formatRupiah(food.price)}
                              </span>
                            </div>

                            <button
                              onClick={() => handleAddFood(food)}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow ${
                                isAdded
                                  ? "bg-emerald-600 text-white"
                                  : "bg-espresso hover:bg-chestnut text-porcelain"
                              }`}
                            >
                              {isAdded ? "✓ Masuk" : "+ Pesan Makanan"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ══ 5 ▸ B2B WHOLESALE (SUPLAI KAFE & KEDAI) ═══════════════ */}
        <section className="py-16 max-w-7xl mx-auto px-5 md:px-10">
          <div className="bg-espresso rounded-[32px] p-8 md:p-12 text-porcelain relative overflow-hidden border border-chestnut/20">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chestnut/30 text-caramel font-mono text-[11px] font-bold uppercase tracking-wider border border-caramel/20">
                  ✦ B2B Roastery Partnership &bull; Suplai Kafe
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl leading-tight">
                  Paket Grosir Biji Sangrai untuk Kedai Kopi Anda
                </h3>
                <p className="text-xs sm:text-sm text-linen/80 leading-relaxed">
                  Pemilik coffee shop di Tegal, Slawi, Brebes, dan Pemalang yang butuh suplai rutin: Dapatkan House Blend 80:20 (Rp 270K/kg) atau Fine Robusta (Rp 230K/kg) dengan diskon volume min. 5 kg. Ambil langsung di Roastery Kalisapu.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                <div>
                  <span className="text-xs text-caramel font-mono uppercase tracking-widest block">Narahubung Resmi:</span>
                  <div className="font-bold text-white text-base mt-1">Irfan Bagus Dwi Prayoga (Owner)</div>
                  <div className="text-xs text-linen/60 font-mono mt-0.5">+62 877-3344-4426 &bull; Slawi, Tegal</div>
                </div>

                <a
                  href="https://wa.me/6287733444426?text=Halo%20Clavicula%20Roastery!%20Saya%20tertarik%20Paket%20Suplai%20B2B%20Grosir%20Biji%20Kopi%20untuk%20kafe%20saya.%20Mohon%20info%20penawaran%20harga%20dan%20sample%20tester."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  💬 Konsultasi Paket B2B via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══ 6 ▸ STICKY BOTTOM CTA BAR ══════════════════════════════ */}
      <div className={`sticky-cta-bar bg-espresso border-t border-chestnut/20 ${stickyVisible ? "visible" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-linen/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Ambil di <strong className="text-caramel">{selectedOutlet === "Slawi" ? "Cabang Slawi" : "Cabang Guci"}</strong> &bull; Bayar di Kasir Outlet (Rp 0 Admin)
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#etalase"
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-full border border-caramel/40 text-caramel hover:bg-caramel/10 font-semibold text-xs transition-colors text-center"
            >
              Katalog 3 Tab
            </a>
            <button
              onClick={openCart}
              className="flex-1 sm:flex-none py-2.5 px-6 rounded-full bg-chestnut hover:bg-caramel text-white font-bold text-xs transition-all shadow-lg anim-pulse-glow text-center inline-flex items-center justify-center gap-2"
            >
              <span>Buka Keranjang</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-espresso text-[11px] font-black flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
