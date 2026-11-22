"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";



import {
  SIGNATURE_LINEUP,
  ALL_MENU_ITEMS,
  CATEGORIES,
} from "@/data/menuData";

const POSTER_GALLERY = [
  { title: "Banner Resmi: Clavicula Coffee & Idea", src: "/images/banner-clavicula.jpg" },
  { title: "Poster Resmi: Our Signature Menu - Manubrium (Kopi Susu Gula Aren)", src: "/assets/clavicula/drinks/manubrium-poster.jpg" },
  { title: "Poster Resmi: Clavicula Tenderloin Steak (80K Nett)", src: "/assets/clavicula/foods/clavicula-tenderloin-steak-poster.jpg" },
  { title: "Poster Resmi: Espresso, Signature & Manual Brew", src: "/assets/clavicula-menu-coffee-poster.jpg" },
  { title: "Poster Resmi: Special Menu Steak, Tomyam & Fried Rice", src: "/assets/clavicula-menu-special-food-poster.jpg" },
  { title: "Espresso & Signature Anatomi", src: "/assets/extracted/clavi_img_1.jpg" },
  { title: "Mocktail Coffee & Non Coffee", src: "/assets/extracted/clavi_img_2.jpg" },
  { title: "Mocktails & Tea Based", src: "/assets/extracted/clavi_img_3.jpg" },
  { title: "Dessert & Snack Clavicula", src: "/assets/extracted/clavi_img_4.jpg" },
  { title: "Special Rice & Noodle Bowl", src: "/assets/extracted/clavi_img_5.jpg" },
  { title: "Mozarella Addict & Menu Paket", src: "/assets/extracted/clavi_img_6.jpg" },
  { title: "Special Crab, Steak & Tomyam", src: "/assets/extracted/clavi_img_7.jpg" },
  { title: "Ice Cream Clavicula", src: "/assets/extracted/clavi_img_8.jpg" },
  { title: "Poster Clavicula Noodle", src: "/assets/extracted/menu_asset_21.jpg" },
  { title: "Poster Menu Ngopi Pagi & Sore", src: "/assets/extracted/menu_asset_22.jpg" },
];

type ColorTheme = "chestnut" | "noir" | "forest";

interface ThemeConfig {
  id: ColorTheme;
  name: string;
  label: string;
  icon: string;
  desc: string;
  mainBg: string;
  transitionGradient: string;
  sectionBg: string;
  sectionAltBg: string;
  sectionBorder: string;
  cardBg: string;
  cardImageBg: string;
  cardBorder: string;
  cardShadow: string;
  headingColor: string;
  subtextColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  controlBg: string;
  controlBorder: string;
  pillActive: string;
  pillInactive: string;
}

const THEME_CONFIGS: Record<ColorTheme, ThemeConfig> = {
  chestnut: {
    id: "chestnut",
    name: "Warm Chestnut & Amber",
    label: "🌰 Warm Chestnut",
    icon: "🌰",
    desc: "Harmonisasi hangat gradasi roasted mocha, butir hazelnut & terakota hangat",
    mainBg: "bg-[#F3EDE2] text-[#1E1610]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#2A170F] via-35% via-[#572E18] via-70% to-[#EDE5D8]",
    sectionBg: "bg-[#EDE5D8]",
    sectionAltBg: "bg-[#E5DACE]",
    sectionBorder: "border-[#8C4A22]/20",
    cardBg: "bg-[#FAF6F0]",
    cardImageBg: "bg-[#EFE7DC]",
    cardBorder: "border-[#8C4A22]/20 hover:border-[#8C4A22]/60",
    cardShadow: "shadow-[0_12px_36px_-12px_rgba(140,74,34,0.14)] hover:shadow-[0_20px_44px_-10px_rgba(140,74,34,0.22)]",
    headingColor: "text-[#1E1610]",
    subtextColor: "text-[#1E1610]/75",
    accentColor: "text-[#8C4A22]",
    badgeBg: "bg-[#8C4A22]",
    badgeText: "text-[#FAF6F0]",
    controlBg: "bg-[#FAF6F0]",
    controlBorder: "border-[#8C4A22]/25",
    pillActive: "bg-[#8C4A22] text-[#FAF6F0] shadow-md font-bold",
    pillInactive: "bg-[#E2D6C5] text-[#3D2818] border border-[#8C4A22]/20 hover:bg-[#8C4A22]/15",
  },
  noir: {
    id: "noir",
    name: "Midnight Roastery Sanctuary",
    label: "🌙 Midnight Roastery",
    icon: "🌙",
    desc: "Kemewahan noir roastery tanpa silau putih, full dark mode amber emas",
    mainBg: "bg-[#140F0C] text-[#F7F2E8]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#16100D] to-[#140F0C]",
    sectionBg: "bg-[#140F0C]",
    sectionAltBg: "bg-[#19130F]",
    sectionBorder: "border-white/10",
    cardBg: "bg-[#1E1611]",
    cardImageBg: "bg-[#130E0A]",
    cardBorder: "border-white/10 hover:border-[#e7a93c]/50",
    cardShadow: "shadow-2xl hover:shadow-[0_20px_44px_-10px_rgba(231,169,60,0.18)]",
    headingColor: "text-[#F7F2E8]",
    subtextColor: "text-[#D5CCC1]",
    accentColor: "text-[#e7a93c]",
    badgeBg: "bg-[#e7a93c]",
    badgeText: "text-[#100d0a]",
    controlBg: "bg-[#1E1611]",
    controlBorder: "border-white/15",
    pillActive: "bg-[#e7a93c] text-[#100d0a] shadow-md font-bold",
    pillInactive: "bg-[#1E1611] text-[#D5CCC1] border border-white/15 hover:border-[#e7a93c]/40",
  },
  forest: {
    id: "forest",
    name: "Guci Pine & Highland Mist",
    label: "🌲 Guci Pine Hills",
    icon: "🌲",
    desc: "Kesejukan kabut pinus pegunungan Guci dengan gradasi hijau botani alami",
    mainBg: "bg-[#E1E7DF] text-[#131F16]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#182319] via-40% via-[#314736] via-75% to-[#E1E7DF]",
    sectionBg: "bg-[#E1E7DF]",
    sectionAltBg: "bg-[#D6DFD4]",
    sectionBorder: "border-[#2C4334]/20",
    cardBg: "bg-[#F7FAF6]",
    cardImageBg: "bg-[#E4ECE3]",
    cardBorder: "border-[#2C4334]/20 hover:border-[#2C4334]/60",
    cardShadow: "shadow-sm hover:shadow-[0_16px_36px_-10px_rgba(44,67,52,0.18)]",
    headingColor: "text-[#131F16]",
    subtextColor: "text-[#131F16]/75",
    accentColor: "text-[#2C4334]",
    badgeBg: "bg-[#2C4334]",
    badgeText: "text-[#F7FAF6]",
    controlBg: "bg-[#F7FAF6]",
    controlBorder: "border-[#2C4334]/25",
    pillActive: "bg-[#2C4334] text-[#F7FAF6] shadow-md font-bold",
    pillInactive: "bg-[#D3DBD0] text-[#1B291F] border border-[#2C4334]/20 hover:bg-[#2C4334]/15",
  },
};

const HERO_BG_PRESETS = [
  {
    id: "twilight",
    name: "Twilight Sanctuary",
    label: "01 · Twilight Pavilion",
    src: "/assets/cafe-twilight-pavilion.jpeg",
    alt: "Warm ambient twilight architectural cafe pavilion with incandescent glow",
    description: "Pendar lampu hangat, interior kayu estetik, dan suasana senja yang tenang.",
    brightness: "brightness-[0.55] contrast-[1.08]",
  },
  {
    id: "slowbar",
    name: "Slow Bar Slawi",
    label: "02 · Slow Bar Slawi (Asli)",
    src: "/assets/clavicula/places/hero-slowbar-clavicula.jpg",
    alt: "Authentic Clavicula Coffee Slow Bar with artisan espresso station",
    description: "Ruang bar asli Clavicula Slawi dengan mesin espresso dan cahaya temaram hangat.",
    brightness: "brightness-[0.50] contrast-[1.10]",
  },
  {
    id: "arches",
    name: "Sunlit Arches",
    label: "03 · Sunlit Arches",
    src: "/assets/sanctuary-interior-arches.jpeg",
    alt: "Minimalist sunlit architectural arches with warm linen daylight",
    description: "Sentuhan arsitektur modern minimalis dengan cahaya alami yang menenangkan.",
    brightness: "brightness-[0.48] contrast-[1.08]",
  },
  {
    id: "guci",
    name: "Guci Pine Hills",
    label: "04 · Pine Forest Guci (Asli)",
    src: "/assets/clavicula/places/suasana-tempat-clavicula-guci-hills.png",
    alt: "Clavicula Hills Guci surrounded by cool mountain pine trees",
    description: "Kesejukan udara pegunungan dan panorama hutan pinus Clavicula Hills Guci.",
    brightness: "brightness-[0.45] contrast-[1.12]",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "paper">("card");
  const [showPosterGallery, setShowPosterGallery] = useState(false);
  const [selectedBg] = useState<string>("twilight");
  const colorTheme: ColorTheme = "chestnut";
  const t = THEME_CONFIGS[colorTheme] || THEME_CONFIGS.chestnut;
  const activeBgPreset = HERO_BG_PRESETS.find((p) => p.id === selectedBg) || HERO_BG_PRESETS[0];
  const lineupTrackRef = useRef<HTMLDivElement>(null);

  const scrollLineup = (direction: "left" | "right") => {
    if (!lineupTrackRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    lineupTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const filteredItems = ALL_MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" ? true : item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={`flex min-h-screen flex-col overflow-hidden ${t.mainBg} selection:bg-chestnut selection:text-white transition-colors duration-500`}>
      
      {/* ─── 1. HERO SECTION (ATMOSPHERIC SANCTUARY COFFEE PHOTO HERO) ───── */}
      <section className="relative min-h-[92svh] flex flex-col justify-center overflow-hidden pt-40 md:pt-48 pb-16 text-[#f1e7d6]">
        {/* Dynamic Atmospheric Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            key={activeBgPreset.id}
            src={activeBgPreset.src}
            alt={activeBgPreset.alt}
            fill
            priority
            className={`object-cover object-center transition-all duration-700 ease-in-out ${activeBgPreset.brightness}`}
          />
          {/* Subtle cinematic gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b09] via-[#0e0b09]/55 to-[#0e0b09]/75 pointer-events-none"></div>
          {/* Subtle amber radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(14,11,9,0.5)_100%)] pointer-events-none"></div>
        </div>

        <div className="container relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#e7a93c]/30 text-[#e7a93c] text-xs font-mono uppercase tracking-widest mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
            Small Batch · In-House Roastery · Slawi &amp; Guci Hills
          </div>

          {/* Heading with generous clearance below floating navbar */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight text-[#f7f2e8] leading-[0.98] max-w-4xl">
            Coffee worth<br />
            <span className="font-serif italic font-normal text-[#e7a93c] tracking-normal">
              slowing down for.
            </span>
          </h1>

          {/* Sub-tagline quote */}
          <p className="mt-4 text-lg sm:text-2xl font-serif italic text-white/90 font-light">
            &ldquo;Secangkir jeda berharga di tengah ritme dunia yang serba terburu-buru.&rdquo;
          </p>

          {/* Lead Paragraph with rich real information */}
          <p className="mt-4 md:mt-6 max-w-2xl text-base sm:text-lg text-[rgba(241,231,214,0.85)] font-light leading-relaxed">
            Dilahirkan dari latar belakang medis di Slawi, nama <strong className="text-white font-medium">Clavicula</strong> (tulang selangka) menjadi simbol simpul penyeimbang yang menyatukan ide, raga, dan rasa. Dari aroma sangrai segar di bar roastery Slawi hingga sejuknya kabut hutan pinus di Clavicula Hills Guci (1.050 mdpl), nikmati kurasi 88 sajian halal berfoto HD: deretan signature anatomi berlayer, seduhan single origin arabika nusantara, serta hidangan dapur hangat mulai dari Tenderloin Steak hingga semangkuk Tomyam gurih.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#lineup"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm bg-[#e7a93c] text-[#100d0a] hover:bg-[#faf3e6] hover:-translate-y-0.5 transition-all shadow-[0_18px_40px_-16px_rgba(231,169,60,0.5)] font-mono tracking-wide"
            >
              Jelajahi The Lineup ⟶
            </a>
            <a
              href="#full-menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#f1e7d6] border border-white/20 hover:bg-white/10 transition-all font-mono tracking-wide"
            >
              Daftar Menu Lengkap (88 Menu HD)
            </a>
            <button
              onClick={() => setShowPosterGallery(!showPosterGallery)}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-mono text-xs uppercase tracking-wider text-[#e7a93c] border border-[#e7a93c]/40 hover:bg-[#e7a93c]/15 transition-all font-semibold shadow-sm"
            >
              <BookOpen size={15} />
              {showPosterGallery ? "Tutup Lembar PDF" : "Buku Menu Fisik (PDF 12 Lembar)"}
            </button>
          </div>

          {/* Hero Foot (Key Metrics) */}
          <div className="mt-14 pt-8 border-t border-[rgba(241,231,214,0.15)] flex flex-wrap items-center gap-6 md:gap-10 text-xs font-mono uppercase tracking-wider text-[rgba(241,231,214,0.7)]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              2 Ruang Sanctuary: Slawi &amp; Guci Hills
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Est. 2020 · In-House Roastery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Anatomy &amp; Single Origin
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              100% Halal Certified Kitchen · All Nett (PPN Incl.)
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. TRANSISI MARQUEE REFINED (REFINED ESPRESSO & WARM GOLD TICKER) ───────────── */}
      <section className="bg-[#120e0b] text-[#e7a93c] py-4 md:py-4.5 overflow-hidden border-y border-[#e7a93c]/20 select-none font-display font-bold text-sm md:text-base tracking-[0.18em] uppercase shadow-inner">
        <div className="animate-ember-marquee flex items-center gap-6 whitespace-nowrap">
          <span>ANATOMICAL SIGNATURE COFFEE</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>IN-HOUSE ROASTERY LAB SLAWI</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>COZY HIGHLAND PINUS GUCI (1.050 MDPL)</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>CLAVICULA TENDERLOIN STEAK 80K NETT</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>SLOW BAR V60 MANUAL BREW NUSANTARA</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>ALL PRICES NETT (PPN INCLUDED)</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>CO-WORKING SPACE &amp; FAST WIFI</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>TOMYAM SEAFOOD WARMTH</span>
          <span className="text-[#e7a93c]/50">✦</span>

          {/* Loop repeat */}
          <span>ANATOMICAL SIGNATURE COFFEE</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>FRESHLY GROUND DAILY</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="text-[#e7a93c]/50">✦</span>
        </div>
      </section>

      {/* ─── 3. MANIFESTO PHILOSOPHY SECTION (COHESIVE ESPRESSO EDITORIAL SPREAD) ─── */}
      <section className="relative py-20 md:py-28 bg-[#120E0C] text-[#F7F2E8] overflow-hidden">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#e7a93c]/[0.06] rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (7 cols): Editorial Typography & Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Eyebrow with hairline rule */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#e7a93c]/70"></span>
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#e7a93c] font-bold">
                  01 // FILOSOFI ANATOMI &bull; COFFEE &amp; IDEA
                </span>
              </div>

              {/* Big Serif Pull Quote */}
              <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-[#F7F2E8] leading-[1.12] tracking-tight mb-8">
                &ldquo;Kami percaya secangkir kopi lebih dari sekadar tegukan yang berlalu.&rdquo;
              </blockquote>

              {/* Storytelling Narrative Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#D5CCC1] font-light leading-relaxed max-w-xl mb-8">
                <p>
                  Terinspirasi dari istilah medis <em className="font-serif italic font-medium text-white">clavicula</em> (tulang selangka)—tulang horizontal tunggal yang mengaitkan lengan dengan tubuh utama, menjaga keseimbangan dan gerak presisi—Clavicula Coffee &amp; Idea lahir di Slawi sebagai ruang temu yang bersahaja.
                </p>
                <p>
                  Bagi kami, seduhan kopi adalah seni presisi yang berakar pada sains: rasio gramasi yang tepat, temperatur air terkontrol, serta profil sangrai drum cast-iron yang disesuaikan dengan karakter tiap varietas biji nusantara. Semuanya diracik demi{" "}
                  <span className="font-serif italic font-normal text-[#e7a93c] text-lg sm:text-xl">
                    menyatukan ide, percakapan hangat, dan kejujuran rasa.
                  </span>
                </p>
                <p className="text-sm sm:text-base text-[#D5CCC1]/85">
                  Kopi adalah katalis, sedangkan &ldquo;Idea&rdquo; adalah gagasan yang lahir darinya. Di meja kami, Anda bebas melambat, membaca buku, bekerja, atau bertukar cerita tanpa diburu waktu.
                </p>
              </div>

              {/* Editorial Highlights / Badges Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-6 border-t border-white/10 w-full">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-xs font-mono text-[#D5CCC1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
                  <span>DUA OUTLET &bull; SLAWI &amp; GUCI</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-xs font-mono text-[#D5CCC1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
                  <span>IN-HOUSE CAST-IRON ROAST</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-xs font-mono text-[#D5CCC1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
                  <span>ALL PRICES NETT (PPN INCL.)</span>
                </div>
                <a
                  href="#lineup"
                  className="text-xs font-mono tracking-wider uppercase text-[#e7a93c] font-semibold hover:underline inline-flex items-center gap-1.5 ml-auto pt-1"
                >
                  Jelajahi 8 Sajian Ikonik &rarr;
                </a>
              </div>

            </div>

            {/* Right Column (5 cols): Cohesive Video Composition */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#1A1410] shadow-2xl group max-w-[420px] mx-auto lg:ml-auto hover:border-[#e7a93c]/30 transition-all duration-500">
                <div className="relative aspect-[9/14] sm:aspect-[4/5] w-full overflow-hidden bg-black">
                  <video
                    src="/assets/vidio-rostery.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"></div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm text-[10px] font-mono uppercase tracking-wider text-[#e7a93c] font-semibold flex items-center gap-2 z-10 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
                    Slow Bar &amp; Espresso
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e7a93c] font-semibold block mb-1">
                      DAILY COFFEE CRAFT &bull; SLAWI
                    </span>
                    <p className="font-display font-bold text-lg text-white leading-snug">
                      Freshly Ground for Every Cup
                    </p>
                    <p className="text-xs text-white/70 font-serif italic mt-1 leading-relaxed">
                      Biji kopi pilihan digiling segar untuk racikan espresso dan seduhan presisi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── TRANSITION GRADIENT: SMOOTH ATMOSPHERIC BRIDGE ─────────── */}
      <div className={`w-full h-32 md:h-48 transition-all duration-700 ${t.transitionGradient}`} />

      {/* ─── 4. THE SIGNATURE LINEUP (EMBER HORIZONTAL TRACK IN WARM CREAM) ─ */}
      <section id="lineup" className={`${t.sectionBg} py-20 md:py-28 overflow-hidden border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                THE SIGNATURE LINEUP // CURATED ROASTS &amp; ANATOMY
              </span>
              <h2 className={`font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight ${t.headingColor} leading-tight`}>
                Delapan Sajian Ikonik,<br />
                <span className={`font-serif italic font-normal ${t.accentColor}`}>
                  Ragam Karakter Rasa
                </span>
              </h2>
              <p className={`mt-3 text-sm sm:text-base ${t.subtextColor} font-serif italic max-w-xl leading-relaxed`}>
                Setiap resep signature diciptakan dengan filosofi anatomi gerak tubuh manusia—memadukan kekuatan double shot espresso, kelembutan krim susu, dan sentuhan otentik rempah nusantara.
              </p>
            </div>

            <div className="flex items-center gap-4 self-start lg:self-auto">
              {/* Hint Arrow */}
              <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-espresso/60 mr-2">
                <span>Geser untuk melihat</span>
                <span className="text-chestnut animate-ember-nudge">⟶</span>
              </div>
              {/* Controls */}
              <button
                onClick={() => scrollLineup("left")}
                aria-label="Scroll left"
                className={`w-12 h-12 rounded-full border ${t.controlBorder} ${t.controlBg} ${t.headingColor} flex items-center justify-center hover:scale-105 shadow-sm transition-all`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollLineup("right")}
                aria-label="Scroll right"
                className={`w-12 h-12 rounded-full border ${t.controlBorder} ${t.controlBg} ${t.headingColor} flex items-center justify-center hover:scale-105 shadow-sm transition-all`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div
          ref={lineupTrackRef}
          className="flex gap-6 overflow-x-auto px-4 md:px-8 pb-6 scroll-smooth snap-x snap-mandatory scrollbar-thin max-w-[100vw]"
        >
          {SIGNATURE_LINEUP.map((sig) => (
            <article
              key={sig.index}
              className={`w-[300px] sm:w-[330px] md:w-[350px] shrink-0 snap-start ${t.cardBg} border ${t.cardBorder} rounded-[2rem] overflow-hidden hover:-translate-y-2 ${t.cardShadow} transition-all duration-300 flex flex-col justify-between group`}
            >
              {/* Media Container with clean object-cover & soft ambient backdrop */}
              <div className={`relative aspect-[4/5] w-full bg-[#f6f2ec] overflow-hidden border-b ${t.sectionBorder}`}>
                <Image
                  src={sig.image}
                  alt={sig.name}
                  fill
                  sizes="(max-width: 768px) 300px, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient vignette to give depth without clutter */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30 pointer-events-none" />

                {/* Single Elegant Top-Left Badge */}
                {sig.badge && (
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-mono tracking-widest uppercase border border-amber-500/20 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      {sig.badge}
                    </span>
                  </div>
                )}

                {/* Understated Minimal Top-Right Index */}
                <span className="absolute top-3.5 right-3.5 z-10 font-mono text-[11px] font-semibold text-stone-200 bg-stone-900/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
                  #{sig.index}
                </span>

                {/* Bottom Left Category Eyebrow */}
                <div className="absolute bottom-3 left-4 z-10">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-200 drop-shadow-sm font-semibold">
                    {sig.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className={`font-display text-2xl font-black ${t.headingColor} group-hover:${t.accentColor} transition-colors leading-tight`}>
                      {sig.name}
                    </h3>
                    <span className={`font-mono text-base font-bold ${t.accentColor} whitespace-nowrap bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20`}>
                      Rp {sig.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm ${t.subtextColor} font-medium leading-relaxed mb-3 line-clamp-2`}>
                    {sig.notes}
                  </p>
                </div>

                <div className={`pt-3 border-t ${t.sectionBorder} mt-auto flex items-start gap-2`}>
                  <span className="text-amber-800/60 text-xs font-serif italic shrink-0">✦</span>
                  <p className={`text-[11px] ${t.subtextColor} font-serif italic leading-relaxed opacity-80 line-clamp-2`}>
                    {sig.concept}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── 5. SANCTUARY OUTLETS SHOWCASE (REAL CLAVICULA PLACES) ─────── */}
      <section className={`py-20 md:py-28 ${t.sectionAltBg} border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
              DUA RUANG SANCTUARY // SLAWI &amp; GUCI HILLS
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor}`}>
              Dua Suasana, Satu Cita Rasa
            </h2>
            <p className={`mt-2 text-sm ${t.subtextColor} font-serif italic max-w-2xl`}>
              Pilih ritme Anda: bar roastery berenergi kreatif di Slawi, atau ketenangan kabut sejuk hutan pinus di Clavicula Hills Guci (1.050 mdpl).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Outlet 1: Slawi Roastery */}
            <div className={`group ${t.cardBg} rounded-[2.5rem] overflow-hidden border ${t.cardBorder} ${t.cardShadow} transition-all duration-300 flex flex-col justify-between`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <Image
                  src="/assets/clavicula/places/hero-slowbar-clavicula.jpg"
                  alt="Clavicula Coffee &amp; Idea Slow Bar Slawi"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                  Outlet 01 · Slawi (Kalisapu)
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span>📍 Jl. DR. Soetomo No.3, Kalisapu, Slawi</span>
                  <span className="text-[#e7a93c] font-semibold">⏰ 09.00 – 23.00 WIB</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className={`font-display text-2xl font-bold ${t.headingColor} mb-1 transition-colors`}>
                  Slow Bar &amp; Roastery Lab Slawi
                </h3>
                <span className={`text-xs font-mono ${t.accentColor} font-semibold block mb-3`}>
                  Pusat Sangrai Kopi &amp; Ruang Kolaborasi Kreatif (WFC Sanctuary)
                </span>
                <p className={`text-sm ${t.subtextColor} leading-relaxed mb-6`}>
                  Pusat eksplorasi sangrai kopi di jantung Slawi. Mengusung interior modern industrial yang tenang dan sejuk ber-AC, dilengkapi Slow Bar V60 manual brew, colokan di setiap meja, dan WiFi berkecepatan tinggi yang sangat nyaman untuk kerja laptop (WFC), meeting santai, hingga obrolan hangat malam hari.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Slow Bar V60</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ In-House Roastery</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Indoor AC &amp; Colokan WFC</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Outdoor Terrace Rindang</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Live Music Weekend</span>
                </div>
              </div>
            </div>

            {/* Outlet 2: Guci Hills */}
            <div className={`group ${t.cardBg} rounded-[2.5rem] overflow-hidden border ${t.cardBorder} ${t.cardShadow} transition-all duration-300 flex flex-col justify-between`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <Image
                  src="/assets/clavicula/places/ruang-wfc-slawi-dan-view-guci.jpg"
                  alt="Clavicula Coffee &amp; Hills Guci Highland View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                  Outlet 02 · Guci Hills (1.050 MDPL)
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span>📍 Kawasan Wisata Guci, Bojong, Tegal</span>
                  <span className="text-[#e7a93c] font-semibold">⏰ 08.00 – 22.00 WIB</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className={`font-display text-2xl font-bold ${t.headingColor} mb-1 transition-colors`}>
                  Highland Sanctuary Hutan Pinus Guci
                </h3>
                <span className={`text-xs font-mono ${t.accentColor} font-semibold block mb-3`}>
                  Kesejukan Kabut Alami Lereng Gunung Slamet &amp; Rooftop Deck
                </span>
                <p className={`text-sm ${t.subtextColor} leading-relaxed mb-6`}>
                  Sanctuary pegunungan di ketinggian 1.050 mdpl berlatar rimbunnya hutan pinus yang asri. Rasakan hembusan udara dingin yang menyegarkan di area rooftop deck terbuka. Pilihan sempurna untuk menghangatkan badan dengan semangkuk Tomyam Seafood pedas asam, Tenderloin Steak gurih, dan cangkir kopi panas di tengah kabut.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ 360° Highland Pine View</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Open-Air Rooftop Deck</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Hawa Dingin Sejuk Alami</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Steak &amp; Tomyam Warmth</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Spot Foto Estetik Alam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. THE RITUAL (EDITORIAL 2-COLUMN) ─────────────────────── */}
      <section id="ritual" className={`py-20 md:py-28 ${t.sectionBg} border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Media: Authentic V60 Pouring at Clavicula */}
            <div className={`lg:col-span-5 relative aspect-[3/4] rounded-[2rem] overflow-hidden border ${t.cardBorder} shadow-xl ${t.cardBg}`}>
              <Image
                src="/assets/clavicula/places/slow-bar-v60-clavicula.jpg"
                alt="Slow bar pour and manual brew ritual at Clavicula Coffee"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className={`inline-block px-3 py-1 rounded-full ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider mb-2`}>
                  Slow Bar &amp; Roastery Lab
                </span>
                <p className="text-xs font-serif italic text-white/90">
                  Diseduh dengan presisi rasio, temperatur, dan waktu demi memunculkan potensi terbaik biji kopi arabika pilihan.
                </p>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7">
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                THE RITUAL // SENI MENIKMATI KOPI
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor} leading-tight mb-8`}>
                Empat Langkah Menikmati Sajian Clavicula
              </h2>

              <ol className="space-y-6">
                <li className={`flex gap-5 pb-6 border-b ${t.sectionBorder}`}>
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    01
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Hirup Aromanya
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Sebelum menyesap, dekatkan cangkir dan hirup aroma karamel, rempah buah, atau wangi floral yang terperangkap dalam crema espresso murni.
                    </p>
                  </div>
                </li>

                <li className={`flex gap-5 pb-6 border-b ${t.sectionBorder}`}>
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    02
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Sesap Layer Pertama
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Untuk menu anatomi berlayer seperti Manubrium atau Sternum, sesap dahulu krim halusnya sebelum diaduk agar seluruh lapisan rasa terasa utuh.
                    </p>
                  </div>
                </li>

                <li className={`flex gap-5 pb-6 border-b ${t.sectionBorder}`}>
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    03
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Padukan dengan Santapan Dapur
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Seduhan kopi semakin sempurna disandingkan dengan gurihnya Clavicula Tenderloin Steak lada hitam, semangkuk tomyam hangat, atau camilan manis croffle.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5">
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    04
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Duduk &amp; Bertukar Ide
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Biarkan waktu melambat. Ruang kafe kami di Slawi dan pemandangan pinus Guci dirancang agar Anda bisa berdiskusi, bekerja santai, atau melepas penat bersama kerabat.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. THE STATS SECTION ───────────────────────────────────── */}
      <section className={`${t.sectionAltBg} py-16 border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                6+
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Signature Anatomi Ikonik
              </p>
            </div>

            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                2
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Sanctuary Outlet (Slawi &amp; Guci)
              </p>
            </div>

            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                88
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Menu Minuman &amp; Santapan Berfoto HD
              </p>
            </div>

            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                100%
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Halal Certified Kitchen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. THE COMPLETE CAFE MENU (ALL 88 ITEMS FROM WEB ASSETS) ─────── */}
      <section id="full-menu" className={`py-20 md:py-28 ${t.sectionBg} scroll-mt-24 transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          
          {/* Section Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b ${t.sectionBorder}`}>
            <div>
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                DAFTAR MENU RESMI // BUKU MENU KAFE LENGKAP
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor}`}>
                The Complete Cafe Menu
              </h2>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-serif italic max-w-2xl`}>
                Seluruh hidangan dan seduhan resmi dari buku menu fisik kafe Slawi &amp; Guci Hills. Semua harga sudah nett termasuk pajak (PPN) tanpa biaya layanan tersembunyi.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className={`flex items-center gap-1 p-1 rounded-full ${t.controlBg} border ${t.controlBorder} shadow-sm self-start md:self-auto`}>
              <button
                onClick={() => setViewMode("card")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "card"
                    ? `${t.badgeBg} ${t.badgeText} shadow-sm`
                    : `${t.subtextColor}`
                }`}
              >
                Kartu Bergambar
              </button>
              <button
                onClick={() => setViewMode("paper")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "paper"
                    ? `${t.badgeBg} ${t.badgeText} shadow-sm`
                    : `${t.subtextColor}`
                }`}
              >
                Buku Menu (Paper)
              </button>
            </div>
          </div>

          {/* Quick Ordering & Coffee Tips Box */}
          <div className={`mb-8 p-4 md:p-5 rounded-2xl ${t.sectionAltBg} border ${t.sectionBorder} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">☕</span>
              <div>
                <span className={`font-bold ${t.headingColor} block font-mono uppercase text-[11px] tracking-wider`}>
                  Panduan Pemesanan Kopi &amp; Dapur:
                </span>
                <p className={`${t.subtextColor} mt-0.5`}>
                  Seluruh varian kopi berbasis espresso dapat dipesan panas (Hot) maupun dingin (Ice). Untuk pilihan biji sangrai manual brew V60 harian (Gayo, Kamojang, Sindoro, Temanggung), tanyakan beans siap seduh hari ini kepada barista kami!
                </p>
              </div>
            </div>
            <div className={`shrink-0 px-3 py-1.5 rounded-full ${t.controlBg} border ${t.controlBorder} font-mono text-[11px] font-semibold ${t.accentColor}`}>
              ✓ 100% Halal Certified Kitchen
            </div>
          </div>

          {/* Official Scanned PDF Posters Drawer */}
          {showPosterGallery && (
            <div className={`mb-14 p-6 md:p-8 ${t.sectionAltBg} rounded-3xl border ${t.sectionBorder} shadow-sm animate-in fade-in duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`font-display text-lg md:text-xl font-bold ${t.headingColor}`}>
                    Lembar Dokumen Menu Asli PDF (12 Lembar Kafe)
                  </h3>
                  <p className={`text-xs ${t.subtextColor} font-serif italic`}>
                    Arsip visual dokumen resmi dari meja kasir dan dapur Clavicula Slawi &amp; Guci Hills
                  </p>
                </div>
                <button
                  onClick={() => setShowPosterGallery(false)}
                  className={`text-xs font-mono ${t.accentColor} hover:underline font-semibold`}
                >
                  Tutup Galeri
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                {POSTER_GALLERY.map((poster, idx) => (
                  <div
                    key={idx}
                    className={`snap-start shrink-0 w-64 md:w-72 ${t.cardBg} rounded-2xl overflow-hidden border ${t.cardBorder} shadow-sm`}
                  >
                    <div className="relative aspect-[1/1.41] bg-black">
                      <Image
                        src={poster.src}
                        alt={poster.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className={`p-3 ${t.cardBg} border-t ${t.sectionBorder}`}>
                      <span className={`text-xs font-bold ${t.headingColor} line-clamp-1 block`}>
                        {poster.title}
                      </span>
                      <a
                        href={poster.src}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-[10px] font-mono ${t.accentColor} hover:underline flex items-center gap-1 mt-1 font-semibold`}
                      >
                        Buka Resolusi Penuh →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Box & Item Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.subtextColor} opacity-60`}
              />
              <input
                type="text"
                placeholder="Cari menu, kopi, steak, tomyam, camilan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${t.controlBg} rounded-full pl-11 pr-4 py-3 text-xs md:text-sm border ${t.controlBorder} ${t.headingColor} placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#8C4A22]/20 transition-all shadow-sm`}
              />
            </div>
            <div className={`text-xs font-mono ${t.subtextColor} self-center`}>
              Menampilkan <span className={`font-bold ${t.accentColor}`}>{filteredItems.length}</span> pilihan menu
            </div>
          </div>

          {/* Category Filter Pills (Swipeable on mobile like modern food apps) */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 sm:gap-2.5 pb-2 sm:pb-0 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? `${t.pillActive} scale-105`
                    : `${t.pillInactive}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ─── DISPLAY: CARD VIEW (EMBER COFFEE LUXURY LIGHT CARDS) ──── */}
          {filteredItems.length === 0 ? (
            <div className={`py-20 text-center ${t.subtextColor} ${t.cardBg} rounded-3xl border ${t.cardBorder} p-8 shadow-sm`}>
              <p className={`font-serif italic text-2xl ${t.headingColor} mb-2`}>Menu tidak ditemukan</p>
              <p className="text-xs">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={`group ${t.cardBg} rounded-2xl sm:rounded-3xl p-4 sm:p-5 border ${t.cardBorder} hover:-translate-y-1.5 ${t.cardShadow} transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    {item.image ? (
                      <div className={`relative w-full aspect-[4/3] mb-4 rounded-2xl overflow-hidden ${t.cardImageBg} border ${t.sectionBorder}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className={`group-hover:scale-105 transition-transform duration-500 ${
                            item.image.endsWith(".webp")
                              ? "object-contain p-3"
                              : "object-cover"
                          }`}
                        />
                        {item.badge && (
                          <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full ${t.badgeBg} ${t.badgeText} font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className={`w-full h-20 mb-4 rounded-2xl ${t.cardImageBg} border ${t.sectionBorder} flex items-center justify-between px-4`}>
                        <span className={`text-[11px] font-mono tracking-wider ${t.accentColor} uppercase font-semibold`}>
                          ✦ {item.category}
                        </span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded ${t.badgeBg} ${t.badgeText} font-mono text-[9px] font-bold uppercase`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className={`font-display text-lg font-bold ${t.headingColor} transition-colors leading-snug`}>
                        {item.name}
                      </h4>
                      <span className={`font-mono text-base font-bold ${t.accentColor} whitespace-nowrap`}>
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p className={`text-xs ${t.subtextColor} leading-relaxed mb-4`}>
                      {item.notes}
                    </p>
                  </div>

                  <div className={`pt-3 border-t ${t.sectionBorder} flex items-center justify-between text-[11px] font-mono ${t.subtextColor}`}>
                    <span>{item.category}</span>
                    <span className={`${t.accentColor} font-semibold`}>Tersedia di Outlet</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ─── DISPLAY: PAPER STYLE MENU (CLASSIC EDITORIAL LIST) ─── */
            <div className={`${t.cardBg} rounded-3xl p-6 md:p-10 border ${t.cardBorder} shadow-sm divide-y ${t.sectionBorder}`}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:${t.sectionAltBg} px-4 rounded-xl transition-colors`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-display text-base font-bold ${t.headingColor} leading-snug`}>
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${t.badgeBg} ${t.badgeText} font-bold`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${t.subtextColor} font-serif italic mt-0.5`}>
                      {item.notes}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className={`font-mono text-base font-bold ${t.accentColor}`}>
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── 9. QUOTE ATMOSPHERE SECTION ─────────────────────────── */}
          <div className="mt-24 relative rounded-[2.5rem] overflow-hidden bg-espresso text-white p-10 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/clavicula/places/roastery-lab-clavicula-slawi.jpg"
                alt="Clavicula Coffee & Idea Atmosphere Roastery"
                fill
                className="object-cover opacity-20"
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4A055] font-semibold mb-4 block">
                THE ROASTERY PHILOSOPHY
              </span>
              <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-snug tracking-tight mb-6">
                &ldquo;Kopi yang baik tidak pernah rumit. Ia lahir dari ketelitian merawat setiap detail kecil rasa—dari petani kebun, mesin sangrai, hingga senyum di cangkir Anda.&rdquo;
              </blockquote>
              <cite className="font-serif italic text-sm text-[#D4A055] block not-italic">
                — Clavicula Coffee &amp; Idea, Slawi &amp; Guci Hills
              </cite>
            </div>
          </div>

          {/* ─── 10. DINE-IN RESERVATION FOOTER CTA ──────────────────── */}
          <div className="mt-16 bg-gradient-to-r from-espresso via-chestnut to-espresso text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-caramel mb-3 block font-semibold">
                DINE-IN · SLOW BAR · OUTDOOR SANCTUARY
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-4">
                Nikmati Sajian Langsung di Meja Anda
              </h3>
              <p className="text-xs md:text-sm text-white/85 font-serif italic mb-6 leading-relaxed">
                Rencanakan kunjungan Anda bersama keluarga atau rekan kerja. Kunjungi outlet Clavicula Slawi untuk suasana roastery bar &amp; ruang diskusi kreatif (WFC), atau nikmati sejuknya kabut pegunungan pinus di Clavicula Hills Guci.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-xs font-mono text-white/80">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-left">
                  <span className="text-[#e7a93c] font-bold block mb-1">📍 Outlet Slawi (Kalisapu)</span>
                  <p className="text-[11px] text-white/70">Jl. DR. Soetomo No.3 · Buka 09.00 – 23.00 WIB</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-left">
                  <span className="text-[#e7a93c] font-bold block mb-1">📍 Clavicula Hills Guci</span>
                  <p className="text-[11px] text-white/70">Wisata Guci, Bojong · Buka 08.00 – 22.00 WIB</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/reserve"
                  className="px-8 py-3.5 rounded-full bg-caramel text-espresso text-xs font-bold hover:bg-caramel/90 transition-all shadow-md hover:-translate-y-0.5"
                >
                  Reservasi Meja Sekarang →
                </Link>
                <a
                  href="https://ig.me/m/clavicula_coffee"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <InstagramIcon size={14} className="text-white" />
                  DM Instagram @clavicula_coffee
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
