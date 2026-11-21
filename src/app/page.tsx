"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, ShoppingBag, MapPin, Clock, Flame } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { useUI } from "@/components/UIProvider";
import InstagramReels from "@/components/InstagramReels";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { addToCart, setSpecialRequest, addToast, openMap } = useUI();
  const [activeTab, setActiveTab] = useState(0);

  const sensoryProfiles = [
    {
      id: 0,
      label: "01 / Floral & Citrus",
      name: "Arabica Lokal Selection (V60 Bar)",
      origin: "Sindoro & Sumbing Highland - 1,500m ASL",
      sweet: 82,
      floral: 94,
      body: 50,
      temp: "92.5°C",
      pour: "Hario V60 (1:15 Ratio)",
      pastry: "Japanese Fruit Sandwich / Sweet Toast",
      notes: "Aroma melati semerbak, keasaman sitrus segar, dan aftertaste madu alami yang elegan.",
      badge: "V60 Bar Selection",
    },
    {
      id: 1,
      label: "02 / Balanced Honey",
      name: "Java Sindoro Honey Process",
      origin: "Gunung Sindoro - 1,450m ASL",
      sweet: 88,
      floral: 55,
      body: 75,
      temp: "91.0°C",
      pour: "Aeropress / V60",
      pastry: "Croffle Nutella Crunch",
      notes: "Rasa madu alam pekat, aprikot manis, dan bodi yang halus membalut lidah.",
      badge: "Signature Micro-Lot",
    },
    {
      id: 2,
      label: "03 / Anatomical Blend",
      name: "Manubrium Signature",
      origin: "Clavicula House Secret Recipe",
      sweet: 90,
      floral: 40,
      body: 88,
      temp: "Chilled on Ice",
      pour: "Espresso Extraction + Layered Cream",
      pastry: "Strawberry Cheesecake / Millescrepes",
      notes: "Sensasi creamy manis harmonis berpadu dengan espresso bold yang berkarakter.",
      badge: "Iconic Signature",
    },
    {
      id: 3,
      label: "04 / Fresh Botanical",
      name: "Brachialis Coffee Mocktail",
      origin: "Espresso + Kiwi + Fresh Banana",
      sweet: 75,
      floral: 65,
      body: 60,
      temp: "Shake Over Clear Ice",
      pour: "Double Strain Highball",
      pastry: "Taiwanese Fried Chicken / Savory Toast",
      notes: "Kombinasi unik eksotik buah kiwi segar, sentuhan pisang lembut, dan espresso punch.",
      badge: "Coffee Mocktail",
    },
  ];

  const currentTab = sensoryProfiles[activeTab];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-image", {
        scale: 1.08,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".value-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: ".value-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".coffee-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: ".coffee-section",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleAddSensoryFlight = () => {
    setSpecialRequest(`Rekomendasi Tasting: ${currentTab.name} (${currentTab.pour})`);
    addToast(`${currentTab.name} ditambahkan ke catatan reservasi meja Anda.`);
    const reservationSection = document.getElementById("reservation-section");
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-linen">
      {/* 01. HERO SECTION */}
      <section className="hero-section relative min-h-[100dvh] w-full flex items-center pt-28 pb-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/30 bg-vanilla px-3.5 py-1.5 mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-chestnut animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-chestnut font-semibold">
                ROASTERY &amp; COFFEE LAB // SLAWI &amp; GUCI HILLS
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl md:text-7xl lg:text-[84px] leading-[0.92] font-black tracking-tighter text-espresso">
                CLAVICULA
              </h1>
            </div>

            <p className="text-2xl md:text-4xl font-serif italic text-chestnut mb-6">
              Coffee &amp; Idea — Where Specialty Meets Human Anatomy.
            </p>

            <p className="text-base md:text-lg text-espresso/80 max-w-[48ch] mb-8 leading-relaxed">
              Dinamai dari <em>clavicula</em> (tulang selangka)—titik simpul anatomis yang menyatukan dan menyeimbangkan gerak tubuh. Clavicula Coffee &amp; Idea hadir di Slawi dan sejuknya dataran tinggi Clavicula Hills Guci sebagai ruang temu hangat untuk menyatukan racikan kopi pilihan, santapan lezat, dan obrolan ide yang mengalir.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/menu"
                className="rounded-full bg-chestnut px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-chestnut/90 transition-all active:scale-95 flex items-center gap-2"
              >
                Lihat Menu Lengkap <ArrowRight size={16} />
              </Link>
              <Link
                href="/space"
                className="rounded-full border border-chestnut/40 bg-white/60 px-7 py-3.5 text-sm font-medium text-espresso hover:bg-vanilla transition-all active:scale-95 flex items-center gap-2"
              >
                <MapPin size={16} className="text-chestnut" /> 2 Outlet Sanctuary
              </Link>
              <button
                onClick={openMap}
                className="text-xs font-mono tracking-wider uppercase text-chestnut underline underline-offset-4 hover:text-espresso transition-colors hidden sm:inline-block"
              >
                Peta &amp; Jam Buka
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full border-t border-chestnut/15 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">6+</span>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 mt-0.5 font-mono">
                  Signature Anatomi
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">2 Outlets</span>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 mt-0.5 font-mono">
                  Slawi &amp; Guci Hills
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">12K - 20K</span>
                <span className="text-[11px] uppercase tracking-wider text-chestnut mt-0.5 font-mono font-semibold">
                  Ngopi Pagi Promo
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">100% Halal</span>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 mt-0.5 font-mono">
                  Kitchen &amp; Coffee
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Hero Visual & Emblem) */}
          <div className="lg:col-span-5 relative h-[540px] lg:h-[660px] w-full mt-6 lg:mt-0 group">
            <div className="absolute inset-0 rounded-t-[200px] rounded-b-[24px] overflow-hidden shadow-2xl border border-chestnut/25 bg-[#FAF6F0]">
              <div className="relative w-full h-full hero-image-container overflow-hidden">
                <Image
                  src="/assets/clavicula/places/clavicula-facade-warm-perfect.jpg"
                  alt="Clavicula Coffee & Idea Identity Facade - Slawi & Guci Hills"
                  fill
                  className="object-cover object-bottom hero-image transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/5 to-transparent"></div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -left-6 top-16 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-chestnut/20 shadow-lg hidden sm:flex items-center gap-2 z-20">
              <div className="w-6 h-6 rounded-full bg-espresso flex items-center justify-center p-0.5 shrink-0">
                <Image src="/assets/clavicula-logo.png" alt="Logo" width={20} height={20} />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-chestnut uppercase">
                COFFEE &amp; IDEA // EST. SLAWI
              </span>
            </div>

            <div className="absolute -right-6 top-1/2 -translate-y-8 bg-vanilla/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-chestnut/20 shadow-xl hidden sm:block z-20 max-w-[220px]">
              <div className="text-[10px] font-mono text-chestnut uppercase tracking-widest mb-1">
                SIGNATURE DRINK
              </div>
              <span className="text-sm font-serif italic text-espresso font-bold block">
                Manubrium &amp; Scapula
              </span>
              <span className="text-xs text-espresso/60 block mt-0.5">Anatomical crafted series</span>
            </div>

            <div className="absolute left-6 bottom-7 bg-espresso/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 shadow-xl z-20 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-white font-mono uppercase">
                GUCI HILLS &bull; HIGH MOUNTAIN MIST
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. VALUE PILLARS */}
      <section className="value-section relative w-full bg-vanilla/40 py-28 px-4 md:px-8 border-y border-chestnut/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-3 font-semibold">
              FILOSOFI &amp; TIGA PILAR CLAVICULA
            </span>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-espresso mb-4">
              Dibuat Dengan Jiwa, Rasa &amp; Nalar
            </h2>
            <p className="text-xl font-serif italic text-espresso/70 max-w-2xl">
              &quot;Dari inspirasi keseimbangan gerak tubuh menuju seduhan kopi pilihan yang jujur, disajikan dalam harmoni santap hangat.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                category: "ANATOMICAL CREATION",
                title: "Menu Khas Anatomi",
                copy: "Penamaan unik bertema anatomi tubuh manusia: Manubrium (Kopi Susu Gula Aren), Acromion, Costa, Sternum, Scapula, hingga Trapezius.",
                cta: "Lihat Signature Drink",
                link: "/menu",
                img: "/images/manubrium.jpg",
              },
              {
                num: "02",
                category: "ROASTERY & CRAFT",
                title: "Signature House Blend & Roastery",
                copy: "Biji sangrai resmi Clavicula (House Blend 80:20, Arabica V60 Bar, dan Fine Robusta). Pesan online & bayar di kasir outlet tanpa antre.",
                cta: "Pesan Biji Kopi & Kopi 1L",
                link: "/terroir",
                img: "/assets/clavicula/places/roastery-lab-clavicula-slawi.jpg",
              },
              {
                num: "03",
                category: "KITCHEN & NOODLE",
                title: "Clavicula Kitchen & Steak",
                copy: "Hidangan lengkap dari Tenderloin Steak, Kepiting Segar (Special Crab), Tomyam Berdua, Clavicula Noodle, hingga Rice Bowl Chashu.",
                cta: "Pilihan Santap",
                link: "/menu",
                img: "/images/clavicula-kitchen-steak.jpg",
              },
              {
                num: "04",
                category: "DUAL SANCTUARY",
                title: "Slawi & Guci Hills",
                copy: "Dua suasana istimewa: Ruang kerja kreatif ber-AC & taman di Slawi, serta hawa dingin pegunungan berkabut di Clavicula Hills Guci.",
                cta: "Jelajahi 2 Outlet",
                link: "/space",
                img: "/assets/clavicula/places/suasana-tempat-clavicula-guci-hills.png",
              },
            ].map((pillar, i) => (
              <Link
                href={pillar.link}
                key={i}
                className="value-card group flex flex-col justify-between bg-white rounded-[24px] p-6 border border-chestnut/15 hover:shadow-warm-card transition-all duration-500 hover:-translate-y-1.5"
              >
                <div>
                  <div className="text-xs font-mono text-chestnut font-semibold mb-3">
                    {pillar.num} &bull; {pillar.category}
                  </div>
                  <h3 className="text-xl font-bold text-espresso mb-2">{pillar.title}</h3>
                  <p className="text-xs md:text-sm text-espresso/70 leading-relaxed mb-5">{pillar.copy}</p>
                  <div className="relative w-full h-36 mb-5 rounded-xl overflow-hidden shadow-sm bg-vanilla">
                    <Image
                      src={pillar.img}
                      alt={pillar.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex items-center text-xs md:text-sm font-semibold text-chestnut group-hover:underline underline-offset-4 pt-2 border-t border-chestnut/10">
                  {pillar.cta} <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03. SIGNATURE ANATOMICAL DRINKS SHOWCASE */}
      <section className="relative w-full bg-linen py-28 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut font-semibold mb-3 block">
                ANATOMY INSPIRED RECIPES
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-espresso">
                Signature Drinks Clavicula
              </h2>
            </div>
            <p className="text-base text-espresso/70 max-w-md font-serif italic">
              Koleksi minuman signature yang terinspirasi dari struktur tulang &amp; otot tubuh—menawarkan keseimbangan rasa kopi, susu, dan bahan premium.
            </p>
          </div>

          {/* ── EDITORIAL SIGNATURE DRINKS LAYOUT ── */}
          {(() => {
            const drinks = [
              { name: "Manubrium", num: "No. 01", price: 33000, img: "/images/manubrium.jpg", note: "Kopi susu gula aren + layer krim lembut", tag: "Best Seller" },
              { name: "Acromion", num: "No. 02", price: 32000, img: "/images/acromion.jpg", note: "Caramelized milk with soft regal biscuit", tag: null },
              { name: "Costa", num: "No. 03", price: 38000, img: "/images/costa.jpg", note: "Nutella spread, iced espresso & ice cream", tag: "Chef's Pick" },
              { name: "Sternum", num: "No. 04", price: 32000, img: "/images/sternum.jpg", note: "Golden caramel drizzle with iced espresso", tag: null },
              { name: "Scapula", num: "No. 05", price: 32000, img: "/images/scapula.jpg", note: "Pandan klepon coconut milk + espresso", tag: null },
              { name: "Trapezius", num: "No. 06", price: 32000, img: "/images/trapezius.jpg", note: "Strawberry swirl & silky cream fusion", tag: null },
            ];
            const [hero, ...rest] = drinks;
            return (
              <div className="flex flex-col gap-4">
                {/* ── ROW 1: Hero + 2 featured side cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* HERO CARD — Manubrium */}
                  <div className="md:col-span-2 relative overflow-hidden rounded-3xl group cursor-pointer min-h-[480px] md:min-h-[520px] bg-espresso shadow-xl">
                    <Image
                      src={hero.img}
                      alt={hero.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* cinematic gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    {/* tag */}
                    {hero.tag && (
                      <div className="absolute top-5 left-5 bg-amber-400 text-espresso text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {hero.tag}
                      </div>
                    )}
                    {/* price badge */}
                    <div className="absolute top-5 right-5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                      Rp {hero.price.toLocaleString("id-ID")}
                    </div>
                    {/* bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.25em] mb-1 block">{hero.num} · Signature</span>
                      <h3 className="text-4xl font-black text-white italic font-serif leading-tight mb-2">{hero.name}</h3>
                      <p className="text-sm text-white/70 leading-relaxed mb-5">{hero.note}</p>
                      <button
                        onClick={() => addToCart({ name: `${hero.name} (Cup)`, price: hero.price, size: "Reguler Cup", image: hero.img, category: "Signature Anatomi" })}
                        className="inline-flex items-center gap-2 bg-white text-espresso text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-amber-400 transition-colors duration-300"
                      >
                        <ShoppingBag size={13} /> Pesan Sekarang
                      </button>
                    </div>
                  </div>

                  {/* RIGHT: 2 stacked featured cards (Costa + Acromion) */}
                  <div className="md:col-span-3 grid grid-rows-2 gap-4">
                    {rest.slice(0, 2).map((drink, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-2xl group cursor-pointer min-h-[200px] bg-espresso shadow-lg">
                        <Image
                          src={drink.img}
                          alt={drink.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
                        {drink.tag && (
                          <div className="absolute top-4 right-4 bg-amber-400 text-espresso text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            {drink.tag}
                          </div>
                        )}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <span className="text-[10px] font-mono text-amber-400/80 uppercase tracking-[0.2em] mb-1">{drink.num}</span>
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="text-2xl font-black text-white italic font-serif leading-tight">{drink.name}</h3>
                              <p className="text-xs text-white/65 mt-1 max-w-xs">{drink.note}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4">
                              <span className="text-xs font-mono text-white/80">Rp {(drink.price / 1000).toFixed(0)}K</span>
                              <button
                                onClick={() => addToCart({ name: `${drink.name} (Cup)`, price: drink.price, size: "Reguler Cup", image: drink.img, category: "Signature Anatomi" })}
                                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full hover:bg-white hover:text-espresso transition-colors duration-300"
                              >
                                <ShoppingBag size={11} /> Pesan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── ROW 2: 3 cinematic portrait cards (Sternum, Scapula, Trapezius) ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {rest.slice(2).map((drink, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-2xl group cursor-pointer bg-espresso shadow-lg" style={{ minHeight: "300px" }}>
                      <Image
                        src={drink.img}
                        alt={drink.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* dark gradient bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      {/* subtle top vignette */}
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

                      {/* num tag top-left */}
                      <div className="absolute top-4 left-4 text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">{drink.num}</div>
                      {/* price top-right */}
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm border border-white/15 text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                        {drink.price / 1000}K
                      </div>

                      {/* bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                        <div>
                          <h3 className="text-xl font-black text-white italic font-serif">{drink.name}</h3>
                          <p className="text-[11px] text-white/60 mt-0.5 leading-snug">{drink.note}</p>
                        </div>
                        {/* horizontal divider */}
                        <div className="w-8 h-px bg-amber-400/60" />
                        <button
                          onClick={() => addToCart({ name: `${drink.name} (Cup)`, price: drink.price, size: "Reguler Cup", image: drink.img, category: "Signature Anatomi" })}
                          className="self-start inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full hover:bg-amber-400 hover:text-espresso hover:border-amber-400 transition-colors duration-300"
                        >
                          <ShoppingBag size={11} /> Pesan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 04. SENSORY DIAL / EXTRACTION SELECTOR */}
      <section className="w-full bg-buttermilk/40 py-28 px-4 md:px-8 border-y border-chestnut/10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut font-semibold mb-2 block">
              SENSORY TASTING LAB
            </span>
            <h2 className="text-4xl font-black text-espresso mb-3">Panduan Rasa &amp; Seduhan</h2>
            <p className="text-chestnut font-serif italic text-lg">
              Temukan profil ekstraksi yang pas untuk mood dan selera Anda hari ini.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {sensoryProfiles.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-chestnut text-white shadow-md scale-105"
                    : "bg-white text-espresso/70 hover:bg-vanilla border border-chestnut/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tasting Card */}
          <div className="bg-white rounded-[28px] p-6 md:p-12 border border-chestnut/15 shadow-warm-card min-h-[380px] flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8">
              <div className="md:col-span-7">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-vanilla text-chestnut text-[11px] font-mono font-bold uppercase mb-2">
                    {currentTab.badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-espresso mb-1">{currentTab.name}</h3>
                  <div className="text-chestnut font-serif italic text-base">{currentTab.origin}</div>
                  <p className="text-xs md:text-sm text-espresso/80 mt-3 leading-relaxed">
                    {currentTab.notes}
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Tingkat Manis / Caramel Sweetness", val: currentTab.sweet },
                    { label: "Keasaman Buah & Floral Acidity", val: currentTab.floral },
                    { label: "Bodi & Ketebalan Crema", val: currentTab.body },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1.5">
                        <span>{bar.label}</span>
                        <span className="font-bold text-chestnut">{bar.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-vanilla rounded-full overflow-hidden border border-chestnut/10">
                        <div
                          className="h-full bg-chestnut rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                          style={{ width: `${bar.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center gap-6 pl-0 md:pl-8 md:border-l border-chestnut/15">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-chestnut mb-1">
                    Suhu Ideal Ekstraksi
                  </div>
                  <div className="text-3xl font-light text-espresso">{currentTab.temp}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-chestnut mb-1">
                    Metode Seduh Rekomendasi
                  </div>
                  <div className="text-lg font-bold text-espresso">{currentTab.pour}</div>
                  <div className="text-xs text-espresso/60 mt-0.5">Disajikan segar per pesanan</div>
                </div>
              </div>
            </div>

            <div className="bg-vanilla/70 rounded-2xl p-5 border border-chestnut/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-chestnut font-bold mb-1">
                  REKOMENDASI PASANGAN SANTAP
                </div>
                <div className="text-base font-serif italic text-espresso">{currentTab.pastry}</div>
              </div>
              <button
                onClick={handleAddSensoryFlight}
                className="whitespace-nowrap px-6 py-2.5 rounded-full bg-chestnut text-white text-xs font-semibold hover:bg-chestnut/90 transition-all shadow-sm"
              >
                Pilih untuk Reservasi Meja
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05. ROASTERY SELECTION (BIJI KOPI PILIHAN) */}
      <section className="coffee-section relative w-full bg-linen py-28 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut font-semibold mb-2 block">
              CLAVICULA ROASTERY // WHOLE BEANS &amp; GROUND
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-espresso lg:w-1/2">
                Koleksi Biji Kopi Sangrai
              </h2>
              <p className="text-sm md:text-base text-espresso/70 lg:w-1/3 leading-relaxed">
                Disangrai langsung oleh roaster kami di Slawi. Biji kopi terseleksi siap seduh di rumah, kantor, atau dinikmati bersama kerabat.
              </p>
            </div>
          </div>

          {/* CINEMATIC ROASTERY VIDEO BANNER */}
          <div className="relative w-full rounded-[32px] overflow-hidden mb-14 border border-chestnut/20 shadow-2xl bg-espresso aspect-[16/9] sm:aspect-[21/9] max-h-[460px] group">
            <video
              src="/assets/video-roaster-cooling.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-semibold uppercase tracking-widest text-caramel mb-3">
                  <Flame size={13} className="text-caramel" /> Live Roasting Session &bull; Slawi Lab
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 tracking-tight">
                  Dedikasi di Balik Mesin Sangrai Clavicula
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-serif italic text-white/80 leading-relaxed mb-5 max-w-xl">
                  &quot;Dari kontrol airflow hingga suhu Maillard, setiap batch biji kopi disangrai presisi untuk menonjolkan profil aroma terbaik tanah Nusantara.&quot;
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.instagram.com/p/DfToychTVCE/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-chestnut to-caramel text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all"
                  >
                    <InstagramIcon size={14} /> Tonton Video Roastery di Instagram Reel ↗
                  </a>
                  <Link
                    href="/terroir"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all"
                  >
                    Pelajari Sains Roastery →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                sku: "RB-01",
                name: "Clavicula House Blend",
                badge: "House Blend 80:20",
                roast: 4,
                price: 65000,
                desc: "80% Arabica : 20% Robusta. Formula andalan Clavicula untuk espresso & es kopi susu dengan rasa cokelat pekat.",
                weight: "200g",
                img: "/assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg",
              },
              {
                sku: "RB-02",
                name: "Arabica Lokal V60",
                badge: "Single Origin",
                roast: 2,
                price: 85000,
                desc: "Biji arabica terroir pilihan petani lokal Nusantara dengan aroma buah manis alami dan aftertaste bersih.",
                weight: "200g",
                img: "/assets/clavicula/roastery/rb-02-arabica-lokal-v60.jpg",
              },
              {
                sku: "RB-03",
                name: "Arabica Impor V60 Luar",
                badge: "Imported Lot",
                roast: 2,
                price: 120000,
                desc: "Kurasi biji kopi impor pilihan Afrika & Amerika Latin dengan aroma floral melati dan keasaman sitrus elegan.",
                weight: "200g",
                img: "/assets/clavicula/roastery/rb-03-arabica-impor-v60-luar.jpg",
              },
              {
                sku: "RB-04",
                name: "Fine Robusta Selection",
                badge: "Fine Robusta",
                roast: 4,
                price: 55000,
                desc: "Pilihan biji robusta berkualitas tinggi dengan bodi tebal, aroma rempah harum, dan rasa manis karamel.",
                weight: "200g",
                img: "/assets/clavicula/roastery/rb-04-fine-robusta-selection.jpg",
              },
            ].map((coffee, i) => (
              <div
                key={i}
                className="coffee-card bg-white rounded-[24px] p-5 border border-chestnut/15 flex flex-col group relative overflow-hidden transition-all duration-500 hover:shadow-warm-card"
              >
                <div className="relative h-60 w-full mb-5 rounded-2xl overflow-hidden bg-vanilla flex items-center justify-center">
                  <Image
                    src={coffee.img}
                    alt={coffee.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-chestnut shadow-sm">
                    {coffee.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-espresso/80 text-white px-2.5 py-0.5 rounded-full text-[11px] font-mono">
                    {coffee.weight}
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-espresso mb-1">{coffee.name}</h3>
                  <p className="text-xs text-espresso/60 mb-4 line-clamp-2">{coffee.desc}</p>

                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-[11px] text-espresso/50 uppercase tracking-widest font-mono mr-2">
                      Roast Level
                    </span>
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className={`w-2 h-2 rounded-full ${
                          j < coffee.roast ? "bg-chestnut" : "bg-chestnut/20"
                        }`}
                      ></div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-chestnut/10">
                    <div>
                      <span className="text-base font-bold text-espresso">
                        Rp {(coffee.price / 1000).toLocaleString("id-ID")}.000
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        addToCart({
                          name: `${coffee.name}`,
                          price: coffee.price,
                          size: coffee.weight,
                          grind: "Biji Utuh / Whole Bean (Rekomendasi)",
                          image: coffee.img,
                          category: "Roastery Beans",
                        })
                      }
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-chestnut text-white text-xs font-medium hover:bg-chestnut/90 transition-colors shadow-sm"
                    >
                      <ShoppingBag size={14} /> Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. SPECIAL PROMO BANNER: NGOPI PAGI & NGOPI SORE */}
      <section className="w-full bg-espresso text-porcelain py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-chestnut/20 blur-3xl pointer-events-none"></div>
        <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-caramel/30 bg-caramel/10 px-3 py-1 mb-4">
              <Clock size={13} className="text-caramel" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-caramel font-bold">
                PROMO KHUSUS SETIAP HARI
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Menu Ngopi Pagi &amp; Ngopi Sore
            </h2>
            <p className="text-caramel font-serif italic text-xl md:text-2xl mb-6">
              Harga Spesial 12K &mdash; 20K (Pukul 08.00 - 10.00 &amp; 15.00 - 17.00 WIB)
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              Awali pagi hari yang bersemangat atau lepaskan penat sore bersama seduhan kopi terbaik dan camilan hangat di Clavicula Coffee Slawi.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-white font-bold">Americano / Long Black</div>
                <div className="text-caramel font-mono text-sm mt-1">12K</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-white font-bold">Coffee Late</div>
                <div className="text-caramel font-mono text-sm mt-1">15K</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-white font-bold">Kentang Goreng</div>
                <div className="text-caramel font-mono text-sm mt-1">15K</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-white font-bold">Pisang Bakar</div>
                <div className="text-caramel font-mono text-sm mt-1">15K</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-white font-bold">Pancake Oneslice</div>
                <div className="text-caramel font-mono text-sm mt-1">15K</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-white font-bold">Savory Toast Chicken</div>
                <div className="text-caramel font-mono text-sm mt-1">20K</div>
              </div>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-caramel text-espresso text-xs md:text-sm font-bold hover:bg-caramel/90 transition-colors"
            >
              Lihat Seluruh Daftar Menu <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Column: Authentic Coffee Menu Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <Link
              href="/menu"
              className="group relative w-full max-w-sm aspect-[1/1.41] rounded-[28px] overflow-hidden border border-white/20 shadow-2xl bg-[#1a1410] flex items-center justify-center transition-all duration-500 hover:border-caramel/50 hover:shadow-warm-card hover:-translate-y-1 block"
            >
              <Image
                src="/assets/clavicula-menu-coffee-poster.jpg"
                alt="Poster Menu Kopi Clavicula - Espresso, Signature &amp; Manual Brew"
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Top Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="bg-espresso/90 backdrop-blur-md text-[10px] font-mono tracking-widest text-caramel uppercase font-bold px-3 py-1 rounded-full border border-caramel/30">
                  COFFEE MENU CHART
                </span>
                <span className="bg-caramel text-espresso text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Resmi
                </span>
              </div>

              {/* Bottom Hover Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-espresso via-espresso/80 to-transparent flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity z-10">
                <span className="text-xs font-semibold text-white/90">
                  Buka Menu Lengkap &bull; 88 Pilihan HD
                </span>
                <span className="text-xs font-bold text-caramel flex items-center gap-1 group-hover:underline">
                  Buka <ArrowRight size={13} />
                </span>
              </div>
            </Link>
            <div className="text-[11px] font-mono text-white/50 text-center mt-3 tracking-wider">
              ✦ Espresso Based &bull; Signature Drinks &bull; Manual Brew
            </div>
          </div>
        </div>
      </section>

      {/* 07. KITCHEN ATELIER & SPECIAL CLAVICULA DISHES */}
      <section className="w-full bg-vanilla/40 py-28 px-4 md:px-8 border-b border-chestnut/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Authentic Special Menu Chart */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Link
                href="/menu"
                className="group relative w-full max-w-sm sm:max-w-md aspect-[1/1.41] rounded-[28px] overflow-hidden border border-chestnut/20 shadow-2xl bg-[#1a1410] flex items-center justify-center transition-all duration-500 hover:border-chestnut/50 hover:shadow-warm-card hover:-translate-y-1 block"
              >
                <Image
                  src="/assets/clavicula-menu-special-food-poster.jpg"
                  alt="Poster Special Menu Clavicula - Tenderloin Steak, Tomyam, Chicken Steak, Fish and Chip"
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="bg-espresso/90 backdrop-blur-md text-[10px] font-mono tracking-widest text-caramel uppercase font-bold px-3 py-1 rounded-full border border-caramel/30">
                    SPECIAL MENU CLAVICULA
                  </span>
                  <span className="bg-chestnut text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    Chef Choice
                  </span>
                </div>

                {/* Bottom Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-espresso via-espresso/80 to-transparent flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity z-10">
                  <span className="text-xs font-semibold text-white/90">
                    Buka Menu Makanan &bull; 88 Pilihan HD
                  </span>
                  <span className="text-xs font-bold text-caramel flex items-center gap-1 group-hover:underline">
                    Buka <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
              <div className="text-[11px] font-mono text-chestnut/70 text-center mt-3 tracking-wider">
                ✦ Tenderloin Steak &bull; Tomyam Berdua &bull; Chicken Steak &bull; Fish &amp; Chip
              </div>
            </div>

            <div className="lg:col-span-7 pl-0 lg:pl-4">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut font-semibold mb-2 block">
                MAIN COURSE &amp; SPECIAL BOWL
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-espresso mb-8">
                Sajian Santap Pilihan
              </h2>

              <div className="space-y-5">
                {[
                  { name: "Clavicula Tenderloin Steak", price: 80000, desc: "Daging tenderloin empuk premium dengan saus spesial & kentang mashed gurih (80K Nett)." },
                  { name: "Tomyam Seporsi Berdua", price: 50000, desc: "Kuah tomyam asam pedas segar dengan aneka seafood segar porsi komplit berdua." },
                  { name: "Chicken Steak with Sauce", price: 36000, desc: "Fillet ayam panggang krispi disiram saus gurih pilihan dan sayuran saute." },
                  { name: "Fish and Chip", price: 32000, desc: "Fillet ikan renyah golden brown disajikan dengan kentang goreng & saus tartar." },
                  { name: "Modern Fried Rice", price: 27000, desc: "Nasi goreng modern bumbu spesial pilihan: Tomyum, BBQ, Black Pepper, atau Rendang." },
                  { name: "Special Crab (100% Fresh Crab)", price: 100000, desc: "Kepiting segar bumbu rempah melimpah khas Clavicula (Porsi isi 2 / isi 4)." },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group border-b border-chestnut/10 pb-4 flex flex-col justify-between"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h4 className="text-base md:text-lg font-bold text-espresso group-hover:text-chestnut transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-sm md:text-base font-serif italic text-chestnut font-semibold whitespace-nowrap">
                        Rp {(item.price / 1000).toLocaleString("id-ID")}.000
                      </span>
                    </div>
                    <p className="text-xs text-espresso/60">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-chestnut font-bold text-sm hover:underline underline-offset-4"
                >
                  Buka Seluruh Menu Makanan, Snack &amp; Dessert <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08. PATRON LOVE & TESTIMONIALS */}
      <section className="w-full bg-linen py-28 px-4 md:px-8 border-b border-chestnut/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-caramel text-caramel" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-espresso mb-2">
              Cerita Dari Sahabat Clavicula
            </h2>
            <div className="text-xs font-mono tracking-wider text-chestnut uppercase font-semibold">
              4.9 / 5.0 (Rating Ulasan Pengunjung Slawi &amp; Guci)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Tempat ngopi paling estetik dan tenang di Slawi. Rasa kopinya sangat berkarakter, signature Manubrium-nya juara. Pas banget buat nugas atau diskusi santai.",
                author: "Dimas Prasetyo",
                role: "Penikmat Kopi & Freelancer Tegal",
              },
              {
                text: "Clavicula Hills di Guci pemandangannya luar biasa sejuk. Ngopi hangat sambil menikmati view perbukitan pinus benar-benar sanctuary terbaik setelah perjalanan.",
                author: "Amanda Putri",
                role: "Wisatawan Guci, Jawa Tengah",
              },
              {
                text: "Konsep nama menu anatomi tubuh manusia sangat cerdas dan unik. Makanan beratnya seperti Steak dan Mie Chashu juga sangat lezat, bukan sekadar pelengkap.",
                author: "Dimas Wicaksono",
                role: "Food & Lifestyle Enthusiast",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-chestnut/15 flex flex-col justify-between shadow-sm hover:shadow-warm-card transition-all"
              >
                <p className="text-sm md:text-base font-serif italic text-espresso/80 leading-relaxed mb-6">
                  &quot;{review.text}&quot;
                </p>
                <div className="pt-4 border-t border-chestnut/10">
                  <div className="font-bold text-espresso text-sm">{review.author}</div>
                  <div className="text-[11px] text-chestnut mt-0.5 uppercase tracking-wider font-mono">
                    {review.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09. INSTAGRAM REELS SHOWCASE */}
      <InstagramReels />

      {/* 10. INSTAGRAM & SOCIAL COMMUNITY BANNER */}
      <section className="w-full bg-vanilla/60 py-20 px-4 md:px-8 text-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center">
          <div className="p-3 bg-white rounded-full border border-chestnut/20 text-chestnut mb-4 shadow-sm">
            <InstagramIcon size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-espresso mb-3">
            Ikuti Keseharian Clavicula
          </h2>
          <p className="text-sm md:text-base text-espresso/70 max-w-xl mb-8 font-serif italic">
            Dapatkan pembaruan tentang live roasting, promo mingguan, acara musik, dan suasana terkini di Slawi maupun Clavicula Hills Guci.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/clavicula_coffee/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-espresso text-white text-xs md:text-sm font-semibold hover:bg-espresso-soft transition-all shadow-md flex items-center gap-2"
            >
              <InstagramIcon size={16} /> @clavicula_coffee (Slawi)
            </a>
            <a
              href="https://www.instagram.com/clavicula_hills/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-forest text-white text-xs md:text-sm font-semibold hover:bg-forest/90 transition-all shadow-md flex items-center gap-2"
            >
              <InstagramIcon size={16} /> @clavicula_hills (Guci)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
