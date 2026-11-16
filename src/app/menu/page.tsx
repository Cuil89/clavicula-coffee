"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";



type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  notes: string;
  desc?: string;
  image?: string;
  badge?: string;
  isSignature?: boolean;
  isBestSeller?: boolean;
  concept?: string;
};

// ─── THE 8 CURATED SIGNATURE HIGHLIGHTS (EMBER STYLE) ─────────────────────
const SIGNATURE_LINEUP = [
  {
    index: "01",
    name: "Sternum",
    price: 30000,
    category: "Signature Anatomi",
    notes: "Cold brew arabika · Saus karamel leleh · Manis seimbang creamy",
    concept: "Anatomi: Tulang dada tengah — perisai penyeimbang rasa kopi dan manis karamel dingin",
    image: "/images/menu/drinks/sternum.webp",
    badge: "Caramel Cold Brew",
  },
  {
    index: "02",
    name: "Acromion",
    price: 31000,
    category: "Signature Anatomi",
    notes: "Caramelized milk · Espresso aromatik · Remahan biskuit regal gurih",
    concept: "Anatomi: Puncak tulang bahu — jembatan gerakan presisi tangan barista",
    image: "/images/menu/drinks/acromion.webp",
    badge: "Must Try",
  },
  {
    index: "03",
    name: "Costa",
    price: 31000,
    category: "Signature Specialty",
    notes: "Nutella hazelnut legit · Double espresso arabika · Vanilla ice cream scoop",
    concept: "Anatomi: Tulang rusuk — melindungi kehangatan rasa terdalam",
    image: "/images/menu/drinks/costa.webp",
    badge: "Barista Pick",
  },
  {
    index: "04",
    name: "Manubrium",
    price: 30000,
    category: "Signature Anatomi",
    notes: "Kopi susu gula aren · Layer krim lembut · Double espresso bold",
    concept: "Our Signature Menu — racikan kopi susu gula aren legendaris khas Clavicula",
    image: "/assets/clavicula/drinks/manubrium-fullcard.jpg",
    badge: "Our Signature Menu",
  },
  {
    index: "05",
    name: "Scapula",
    price: 29000,
    category: "Signature Nusantara",
    notes: "Pandan klepon nusantara · Kelapa gurih · Double espresso arabika",
    concept: "Anatomi: Tulang belikat — sayap rasa tradisional bernuansa modern",
    image: "/images/menu/drinks/scapula.webp",
    badge: "Nusantara Heritage",
  },
  {
    index: "06",
    name: "Trapezius",
    price: 30000,
    category: "Fruit & Cream Fusion",
    notes: "Fresh strawberry swirl · Susu lembut dingin · Kopi eksotis",
    concept: "Anatomi: Otot trapezius — relaksasi rasa manis segar yang menenangkan",
    image: "/images/menu/drinks/trapezius.webp",
    badge: "Refreshing",
  },
  {
    index: "07",
    name: "Clavicula Tenderloin Steak",
    price: 80000,
    category: "Special Hot Kitchen",
    notes: "Tenderloin empuk juicy · Dual dipping sauce · Mashed potato & sayuran",
    concept: "Main Course Ikonik Clavicula Slawi & Guci — 100% daging sapi pilihan (Sudah termasuk PPN)",
    image: "/assets/clavicula/foods/steak-tenderloin-card.jpg",
    badge: "Chef Choice · 80K Nett",
  },
  {
    index: "08",
    name: "Dimsum Mentai",
    price: 24000,
    category: "Favorite Snack",
    notes: "Dimsum kukus lembut · Saus mentai creamy torched · Taburan nori & tobiko gurih",
    concept: "Snack favorit Clavicula — perpaduan dimsum daging kenyal dengan lelehan saus mentai bakar",
    image: "/images/menu/foods/dimsum-mentai.webp",
    badge: "Best Seller Snack",
  },
];

// ─── COMPLETE CAFE MENU (ONLY AUTHENTIC FOOD & BEVERAGE PHOTOGRAPHY) ───
const ALL_MENU_ITEMS: MenuItem[] = [
  // 1. SIGNATURE DRINK (ANATOMI)
  {
    id: "sig-01",
    name: "Manubrium",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    notes: "Kopi susu gula aren · Layer krim lembut · Double espresso bold",
    desc: "Minuman kopi susu kekinian dengan tambahan cream dan gula aren yang menciptakan rasa aren khas legit seimbang.",
    image: "/assets/clavicula/drinks/manubrium-fullcard.jpg",
    badge: "Our Signature Menu",
    isSignature: true,
  },
  {
    id: "sig-02",
    name: "Acromion",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    notes: "Caramelized milk · Espresso aromatik · Biskuit regal gurih",
    desc: "Kopi susu kekinian yang dipadu dengan gurihnya biskuit regal lembut dan aroma espresso aromatik.",
    image: "/images/menu/drinks/acromion.webp",
    badge: "Must Try",
    isSignature: true,
  },
  {
    id: "sig-03",
    name: "Costa",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    notes: "Nutella hazelnut legit · Double espresso · Vanilla ice cream scoop",
    desc: "Kopi susu dengan tambahan manisnya Nutella legit berpadu scoop es krim vanila lembut.",
    image: "/images/menu/drinks/costa.webp",
    badge: "Specialty",
    isSignature: true,
  },
  {
    id: "sig-04",
    name: "Sternum",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    notes: "Cold brew arabika · Saus karamel leleh · Manis seimbang creamy",
    desc: "Kopi susu kekinian dengan cita rasa karamel khas dipadu dengan lembutnya whip cream.",
    image: "/images/menu/drinks/sternum.webp",
    badge: "Caramel Cold Brew",
    isSignature: true,
  },
  {
    id: "sig-05",
    name: "Scapula",
    price: 29000,
    category: "Signature Drink (Anatomi)",
    notes: "Pandan klepon nusantara · Kelapa gurih · Double espresso arabika",
    desc: "Kopi susu kekinian dengan cita rasa pandan klepon yang harum, gurih kelapa, dan unik di lidah.",
    image: "/images/menu/drinks/scapula.webp",
    badge: "Nusantara Heritage",
    isSignature: true,
  },
  {
    id: "sig-06",
    name: "Trapezius",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    notes: "Fresh strawberry swirl · Susu lembut dingin · Kopi eksotis",
    desc: "Unik dan segarnya jus stroberi kental berpadu krim lembut dan susu segar yang menyejukkan.",
    image: "/images/menu/drinks/trapezius.webp",
    badge: "Refreshing Fusion",
    isSignature: true,
  },

  // 2. ESPRESSO BASED
  {
    id: "esp-01",
    name: "Es Kopi Susu Clavicula",
    price: 19000,
    category: "Espresso Based",
    notes: "Espresso robusta-arabika · Susu kental manis · Fresh milk dingin",
    desc: "Kopi susu klasik racikan orisinal Clavicula, manis legit pas dan menyegarkan.",
    image: "/images/menu/drinks/kopi-susu-ori.webp",
    badge: "All-Day Classic",
  },
  {
    id: "esp-02",
    name: "Flavour Latte",
    price: 24000,
    category: "Espresso Based",
    notes: "Sirup hazelnut / vanilla / caramel · Double ristretto · Steamed milk",
    desc: "Espresso dengan paduan sirup aromatik pilihan dan tekstur steamed milk lembut silky.",
    image: "/images/menu/drinks/flavour-latte.webp",
    badge: "Barista Special",
  },
  {
    id: "esp-03",
    name: "Coffee Lemonade",
    price: 24000,
    category: "Espresso Based",
    notes: "Lemon segar · Soda dingin effervescent · Espresso float",
    desc: "Sensasi perasan lemon sitrun asam segar dipadukan soda dingin dan ekstrak kopi berkarakter.",
    image: "/images/menu/drinks/coffee-lemonade.webp",
    badge: "Summer Cooler",
  },
  {
    id: "esp-04",
    name: "Flavour Americano",
    price: 18000,
    category: "Espresso Based",
    notes: "Double shot espresso · Cold sparkling/still water · Touch of citrus",
    desc: "Americano dingin jernih berkarakter dengan sentuhan aroma manis buah yang menyegarkan.",
    image: "/images/menu/drinks/flavour-americano.webp",
  },
  {
    id: "esp-05",
    name: "Caramel Machiato",
    price: 24000,
    category: "Espresso Based",
    notes: "Vanilla syrup · Foamed milk · Espresso drizzle · Saus karamel legit",
    desc: "Lapisan susu vanilla lembut ditimpa espresso aromatik dan guratan saus karamel lezat.",
    image: "/images/menu/drinks/caramel-macchiato.webp",
  },
  {
    id: "esp-06",
    name: "Affogato",
    price: 19000,
    category: "Espresso Based",
    notes: "2 scoop vanilla gelato · Hot double ristretto pour",
    desc: "Es krim vanila premium diguyur double espresso panas yang pekat dan harum semerbak.",
    image: "/images/menu/drinks/affogato.webp",
    badge: "Classic Italian",
  },
  {
    id: "esp-07",
    name: "Cookies Coffee",
    price: 26000,
    category: "Espresso Based",
    notes: "Espresso blend · Remahan cookies hitam cokelat · Whipped cream",
    desc: "Minuman kopi dingin creamy bertekstur krispi biskuit cokelat dengan topping krim.",
    image: "/images/menu/drinks/cookies-coffee.webp",
  },
  {
    id: "esp-08",
    name: "Matcha Coffee Latte",
    price: 26000,
    category: "Espresso Based",
    notes: "Pure Uji Matcha · Fresh milk · Layer double shot espresso",
    desc: "Tiga layer warna cantik menyatukan pahit manis matcha otentik dengan espresso harum.",
    image: "/images/menu/drinks/matcha-coffee-latte.webp",
    badge: "Artisan Layer",
  },

  // 3. SPECIAL CLAVICULA (STEAK & KITCHEN)
  {
    id: "spc-01",
    name: "Clavicula Tenderloin Steak",
    price: 80000,
    category: "Special Clavicula (Steak & Kitchen)",
    notes: "Tenderloin empuk juicy · Dual dipping sauce · Mashed potato & sauted vegetables",
    desc: "Steak daging sapi tenderloin pilihan dipanggang empuk dengan mashed potato gurih lembut dan dua pilihan saus lezat. (Harga sudah termasuk PPN).",
    image: "/assets/clavicula/foods/steak-tenderloin-card.jpg",
    badge: "Chef Choice · 80K Nett",
    isBestSeller: true,
  },

  // 4. SPECIAL BOWL & NOODLE
  {
    id: "bwl-01",
    name: "Chicken Katsu With Sauce",
    price: 24000,
    category: "Special Bowl & Noodle",
    notes: "Fillet ayam krispi tebal · Nasi pulen hangat · Saus gurih pilihan (BBQ/Teriyaki)",
    desc: "Ayam fillet katsu goreng renyah keemasan disiram saus gurih spesial di atas semangkuk nasi pulen.",
    image: "/images/menu/foods/chicken-katsu-with-sauce.webp",
    badge: "Best Value",
  },
  {
    id: "bwl-02",
    name: "Chicken Katsu Spicy",
    price: 24000,
    category: "Special Bowl & Noodle",
    notes: "Katsu dada ayam renyah · Bumbu cabai pedas meresap · Nasi hangat",
    desc: "Ayam katsu gurih renyah berpadu baluran saus pedas nikmat untuk penikmat cita rasa pedas mantap.",
    image: "/images/menu/foods/chicken-katsu-spicy.webp",
    badge: "Spicy Lovers",
  },
  {
    id: "bwl-03",
    name: "Mentai Rice Bowl",
    price: 28000,
    category: "Special Bowl & Noodle",
    notes: "Nasi pulen Jepang · Topping daging gurih · Saus mentai creamy torched",
    desc: "Nasi hangat ditutupi daging olahan lezat dan siraman saus mentai bakar beraroma khas smoky menggugah selera.",
    image: "/images/menu/foods/mentai-rice.webp",
    badge: "Torched Mentai",
    isBestSeller: true,
  },
  {
    id: "bwl-04",
    name: "Javanese Fried Rice",
    price: 20000,
    category: "Special Bowl & Noodle",
    notes: "Nasi goreng bumbu rempah Jawa · Suwiran ayam · Kerupuk & acar",
    desc: "Nasi goreng racikan bumbu khas tradisional Jawa beraroma wajan panas smoky gurih manis pas.",
    image: "/images/menu/foods/javanese-fried-rice.webp",
    badge: "Indonesian Classic",
  },
  {
    id: "bwl-05",
    name: "Javanese Fried Noodles",
    price: 20000,
    category: "Special Bowl & Noodle",
    notes: "Mie telur kenyal · Bumbu kecap rempah wangi · Sayuran segar & telur",
    desc: "Mie goreng gurih nikmat dimasak dengan api besar bersama sayur segar, telur, dan bumbu rempah autentik.",
    image: "/images/menu/foods/javanese-fried-noodles.webp",
  },

  // 5. DESSERT & SNACK
  {
    id: "snk-01",
    name: "Yakitori Clavicula",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Sate ayam fillet empuk · Saus tare manis gurih karamel · 4 tusuk porsi",
    desc: "Sate ayam khas Jepang dengan potongan daging paha empuk berlumur saus tare gurih manis dipanggang merata.",
    image: "/images/menu/foods/yakitori.webp",
    badge: "Japanese Pick",
    isBestSeller: true,
  },
  {
    id: "snk-02",
    name: "Dimsum Mentai",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Dimsum kukus lembut · Saus mentai creamy bakar · Taburan nori gurih",
    desc: "Dimsum olahan ayam dan udang kenyal gurih dibalut lelehan saus mentai gurih beraroma bakar torched.",
    image: "/images/menu/foods/dimsum-mentai.webp",
    badge: "Best Seller Snack",
    isBestSeller: true,
  },
  {
    id: "snk-03",
    name: "Dimsum Ori",
    price: 20000,
    category: "Dessert & Snack",
    notes: "Dimsum ayam kukus pulen · Chili oil pedas harum · Porsi 4 pcs",
    desc: "Dimsum kukus renyah gurih daging ayam segar disajikan hangat dengan dipping chili oil aromatik.",
    image: "/images/menu/foods/dimsum-ori.webp",
  },
  {
    id: "snk-04",
    name: "Gochucula Chicken Wings",
    price: 25000,
    category: "Dessert & Snack",
    notes: "Sayap ayam goreng garing · Glaze gochujang manis pedas Korea · Wijen",
    desc: "Sayap ayam renyah berbalut saus gochujang khas Korea dengan sensasi manis gurih pedas bikin nagih.",
    image: "/images/menu/foods/gochucula-chicken-wings.webp",
    badge: "Korean Glazed",
  },
  {
    id: "snk-05",
    name: "Sate Taichan Mozarella",
    price: 26000,
    category: "Dessert & Snack",
    notes: "Daging dada ayam panggang gurih · Sambal taichan pedas asam segar · Keju mozarella leleh",
    desc: "Sate taichan daging ayam lembut diselimuti lelehan keju mozarella molor dan sambal taichan pedas nendang.",
    image: "/images/menu/foods/sate-taichan-mozarella.webp",
    badge: "Mozarella Melt",
  },
  {
    id: "snk-06",
    name: "Hotdog Clavicula",
    price: 26000,
    category: "Dessert & Snack",
    notes: "Sosis bratwurst panggang juicy · Roti bun empuk · Mustard, mayo & keju",
    desc: "Roti hotdog panggang lembut dengan sosis jumbo berkualitas, saus keju gurih, dan taburan saus mustard nikmat.",
    image: "/images/menu/foods/hotdog.webp",
  },
  {
    id: "snk-07",
    name: "Tiramisu Cake",
    price: 35000,
    category: "Dessert & Snack",
    notes: "Ladyfinger sponge renyah lembut · Kopi espresso soak · Krim mascarpone & cocoa",
    desc: "Kue tiramisu klasik Italia dengan lapisan krim lembut berpadu aroma rendaman espresso otentik.",
    image: "/images/menu/foods/tiramisu-cake.webp",
    badge: "Sweet Tooth",
  },
  {
    id: "snk-08",
    name: "Mille Crepes",
    price: 32000,
    category: "Dessert & Snack",
    notes: "Puluhan lapis crepe tipis · Krim vanilla lembut meleleh di mulut",
    desc: "Kue crepe berlapis-lapis tipis dengan isian krim manis lembut segar disajikan dingin pas untuk teman kopi.",
    image: "/images/menu/foods/mille-crepes.webp",
  },

  // 6. NON-COFFEE & BLEND
  {
    id: "nc-01",
    name: "Charcoal Blend",
    price: 24000,
    category: "Non-Coffee & Blend",
    notes: "Activated bamboo charcoal · Susu segar gurih · Manis lembut menenangkan",
    desc: "Minuman non-coffee estetik berwarna abu-abu gelap dengan rasa manis lembut creamy dan khasiat charcoal alami.",
    image: "/images/menu/drinks/charcoal-blend.webp",
    badge: "Detox Blend",
  },
];

const CATEGORIES = [
  "Semua",
  "Signature Drink (Anatomi)",
  "Espresso Based",
  "Special Clavicula (Steak & Kitchen)",
  "Special Bowl & Noodle",
  "Dessert & Snack",
  "Non-Coffee & Blend",
];

const POSTER_GALLERY = [
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

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "paper">("card");
  const [showPosterGallery, setShowPosterGallery] = useState(false);
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
    <main className="flex min-h-screen flex-col overflow-hidden bg-linen text-espresso selection:bg-chestnut selection:text-white">
      
      {/* ─── 1. HERO SECTION (ATMOSPHERIC EMBER COFFEE PHOTO HERO) ───── */}
      <section className="relative min-h-[92svh] flex flex-col justify-end overflow-hidden pb-16 pt-36 md:pt-44 text-[#f1e7d6]">
        {/* Background Image: Overhead Artisanal Coffee Cups Table with Dark Cinematic Scrim */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/ember-hero-table.jpg"
            alt="Artisanal coffee cups slow roast atmosphere at Clavicula Coffee"
            fill
            priority
            className="object-cover object-center brightness-[0.45] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a] via-[#100d0a]/65 to-[#100d0a]/80 pointer-events-none"></div>
        </div>

        <div className="container relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
          {/* Eyebrow */}
          <p className="ember-eyebrow mb-4">
            Small batch · Anatomical roastery · Slawi &amp; Guci Hills
          </p>

          {/* Heading */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[94px] font-black tracking-tight text-[#f1e7d6] leading-[0.92] max-w-4xl">
            Coffee worth<br />
            <span className="font-serif italic font-normal text-[#e7a93c]">
              slowing down for.
            </span>
          </h1>

          {/* Lead Paragraph */}
          <p className="mt-6 md:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-[rgba(241,231,214,0.85)] font-light leading-relaxed">
            Sebuah ruang perjumpaan antara presisi anatomi tubuh dan seni sangrai kopi nusantara. 
            Dari bar roastery di Slawi hingga sejuknya kabut pegunungan pinus di Guci, 
            nikmati kurasi sajian single origin, anatomical signature series, serta hidangan dapur spesial.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#lineup"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm bg-[#e7a93c] text-[#100d0a] hover:bg-[#faf3e6] hover:-translate-y-0.5 transition-all shadow-[0_18px_40px_-16px_rgba(231,169,60,0.5)]"
            >
              Jelajahi The Lineup ⟶
            </a>
            <a
              href="#full-menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#f1e7d6] border border-white/20 hover:bg-white/10 transition-all"
            >
              Daftar Menu Lengkap (120+ Menu)
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
          <div className="mt-16 pt-8 border-t border-[rgba(241,231,214,0.15)] flex flex-wrap items-center gap-6 md:gap-10 text-xs font-mono uppercase tracking-wider text-[rgba(241,231,214,0.7)]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Slawi &amp; Guci Hills, Tegal
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Est. 2020
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Anatomy &amp; Single Origin
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              100% Halal Certified Kitchen
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. TRANSISI MARQUEE EMAS (GOLDEN AMBER STRIP) ───────────── */}
      <section className="bg-[#e7a93c] text-[#100d0a] py-3.5 md:py-4 overflow-hidden border-y border-[#100d0a]/20 select-none font-display font-bold text-base md:text-xl tracking-tight shadow-md">
        <div className="animate-ember-marquee flex items-center gap-6 whitespace-nowrap">
          <span>ANATOMICAL COFFEE</span>
          <span className="opacity-60">✶</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="opacity-60">✶</span>
          <span>FRESH ROASTED IN-HOUSE</span>
          <span className="opacity-60">✶</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="opacity-60">✶</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="opacity-60">✶</span>
          <span>SLOW BAR SANCTUARY</span>
          <span className="opacity-60">✶</span>
          <span>STEAK &amp; TOMYAM WARMTH</span>
          <span className="opacity-60">✶</span>
          <span>MANUAL BREW NUSANTARA</span>
          <span className="opacity-60">✶</span>
          <span>ALL PRICES NETT (INCL. PPN)</span>
          <span className="opacity-60">✶</span>

          {/* Loop repeat */}
          <span>ANATOMICAL COFFEE</span>
          <span className="opacity-60">✶</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="opacity-60">✶</span>
          <span>FRESHLY GROUND DAILY</span>
          <span className="opacity-60">✶</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="opacity-60">✶</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="opacity-60">✶</span>
          <span>SLOW BAR SANCTUARY</span>
          <span className="opacity-60">✶</span>
          <span>STEAK &amp; TOMYAM WARMTH</span>
          <span className="opacity-60">✶</span>
          <span>MANUAL BREW NUSANTARA</span>
          <span className="opacity-60">✶</span>
          <span>ALL PRICES NETT (INCL. PPN)</span>
          <span className="opacity-60">✶</span>
        </div>
      </section>

      {/* ─── 3. MANIFESTO PHILOSOPHY SECTION (COHESIVE ESPRESSO EDITORIAL SPREAD) ─── */}
      <section className="relative py-20 md:py-28 bg-[#120E0C] text-[#F7F2E8] border-b border-[#2A1D15] overflow-hidden">
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
                  01 // FILOSOFI &amp; RUANG TEMU &bull; COFFEE &amp; IDEA
                </span>
              </div>

              {/* Big Serif Pull Quote */}
              <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-[#F7F2E8] leading-[1.12] tracking-tight mb-8">
                &ldquo;Kami percaya secangkir kopi lebih dari sekadar tegukan yang berlalu.&rdquo;
              </blockquote>

              {/* Storytelling Narrative Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#D5CCC1] font-light leading-relaxed max-w-xl mb-8">
                <p>
                  Terinspirasi dari istilah anatomi <em className="font-serif italic font-medium text-white">clavicula</em> (tulang selangka)—titik simpul yang menghubungkan dan menyeimbangkan gerak tubuh—Clavicula Coffee &amp; Idea hadir di Slawi dan sejuknya dataran tinggi Guci sebagai ruang temu yang bersahaja.
                </p>
                <p>
                  Di tengah ritme hari yang serba cepat, kami memberi ruang untuk memperlambat langkah. Menikmati seduhan kopi pilihan yang digiling segar, hidangan lezat yang diracik sepenuh hati, demi{" "}
                  <span className="font-serif italic font-normal text-[#e7a93c] text-lg sm:text-xl">
                    menyatukan ide, percakapan hangat, dan kejujuran rasa.
                  </span>
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
              {/* Outer Card with seamless dark styling */}
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#1A1410] shadow-2xl group max-w-[420px] mx-auto lg:ml-auto hover:border-[#e7a93c]/30 transition-all duration-500">
                
                {/* Slow Bar & Espresso Video Stage */}
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

                  {/* Top Right Monograph Pill */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm text-[10px] font-mono uppercase tracking-wider text-[#e7a93c] font-semibold flex items-center gap-2 z-10 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
                    Slow Bar &amp; Espresso
                  </div>

                  {/* Bottom Video Placard */}
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

      {/* ─── 4. THE SIGNATURE LINEUP (EMBER HORIZONTAL TRACK IN WARM CREAM) ─ */}
      <section id="lineup" className="bg-[#FAF5ED] py-20 md:py-28 overflow-hidden border-b border-chestnut/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-2">
                THE SIGNATURE LINEUP // CURATED ROASTS &amp; ANATOMY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-espresso leading-tight">
                Delapan Sajian Ikonik,<br />
                <span className="font-serif italic font-normal text-chestnut">
                  Ragam Karakter Rasa
                </span>
              </h2>
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
                className="w-12 h-12 rounded-full border border-chestnut/25 bg-white text-espresso flex items-center justify-center hover:bg-chestnut hover:text-white shadow-sm transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollLineup("right")}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full border border-chestnut/25 bg-white text-espresso flex items-center justify-center hover:bg-chestnut hover:text-white shadow-sm transition-all"
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
              className="w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start bg-white border border-chestnut/20 rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between shadow-sm group"
            >
              {/* Media Container (Ember 4:5 Aspect Ratio) */}
              <div className="relative aspect-[4/5] w-full bg-[#FAF6F0] overflow-hidden border-b border-chestnut/10">
                <Image
                  src={sig.image}
                  alt={sig.name}
                  fill
                  className={`group-hover:scale-105 transition-transform duration-700 ${
                    sig.image.endsWith(".webp")
                      ? "object-contain p-4"
                      : "object-cover"
                  }`}
                />

                {/* Bottom Left Tag */}
                <span className="absolute bottom-4 left-4 bg-espresso/85 backdrop-blur-md text-white font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/20">
                  {sig.category}
                </span>

                {/* Top Right Index (01, 02...) */}
                <span className="absolute top-4 right-4 font-display font-black text-2xl text-espresso/80 bg-white/90 backdrop-blur-md px-3 py-1 rounded-2xl border border-chestnut/15 shadow-sm">
                  {sig.index}
                </span>

                {/* Badge if present */}
                {sig.badge && (
                  <span className="absolute top-4 left-4 bg-chestnut text-white font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {sig.badge}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 md:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-2xl font-black text-espresso group-hover:text-chestnut transition-colors leading-tight">
                      {sig.name}
                    </h3>
                    <span className="font-mono text-lg font-bold text-chestnut whitespace-nowrap">
                      Rp {sig.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className="text-sm text-espresso/85 font-medium leading-relaxed mb-3">
                    {sig.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-chestnut/10 mt-auto">
                  <p className="text-xs text-espresso/60 font-serif italic leading-relaxed">
                    {sig.concept}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── 5. SANCTUARY OUTLETS SHOWCASE (REAL CLAVICULA PLACES) ─────── */}
      <section className="py-20 md:py-28 bg-linen border-b border-chestnut/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-2">
              DUA RUANG SANCTUARY // SLAWI &amp; GUCI HILLS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-espresso">
              Dua Suasana, Satu Cita Rasa
            </h2>
            <p className="mt-2 text-sm text-espresso/70 font-serif italic max-w-2xl">
              Pilih ritme Anda: bar roastery berenergi kreatif di Slawi, atau ketenangan kabut sejuk hutan pinus di Clavicula Hills Guci.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Outlet 1: Slawi Roastery */}
            <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-chestnut/20 shadow-sm hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <Image
                  src="/assets/clavicula/places/hero-slowbar-clavicula.jpg"
                  alt="Clavicula Coffee & Idea Slow Bar Slawi"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-chestnut text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  Outlet 01 · Slawi (Kalisapu)
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white/90">
                  Jl. DR. Soetomo No.3, Kalisapu, Slawi, Tegal
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-espresso mb-2 group-hover:text-chestnut transition-colors">
                  Slow Bar &amp; Roastery Lab Slawi
                </h3>
                <p className="text-sm text-espresso/75 leading-relaxed mb-6">
                  Pusat eksplorasi sangrai kopi dengan Slow Bar manual brew V60, interior berkonsep modern industrial yang sejuk untuk WFC, dan outdoor terrace untuk diskusi kreatif.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-espresso/70">
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Slow Bar V60</span>
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Roastery In-House</span>
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Co-Working &amp; WFC</span>
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Live Music Weekend</span>
                </div>
              </div>
            </div>

            {/* Outlet 2: Guci Hills */}
            <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-chestnut/20 shadow-sm hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <Image
                  src="/assets/clavicula/places/ruang-wfc-slawi-dan-view-guci.jpg"
                  alt="Clavicula Coffee & Hills Guci Highland View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-caramel text-espresso font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  Outlet 02 · Guci Hills (Highland)
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white/90">
                  Kawasan Wisata Guci, Bojong, Tegal (Lereng Gn. Slamet)
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-espresso mb-2 group-hover:text-chestnut transition-colors">
                  Highland Sanctuary Hutan Pinus Guci
                </h3>
                <p className="text-sm text-espresso/75 leading-relaxed mb-6">
                  Nikmati udara pegunungan yang sangat dingin dan segar dengan area rooftop terbuka. Menikmati semangkuk tomyam hangat, steak, dan seduhan kopi di tengah panorama hijau.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-espresso/70">
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Highland Pine View</span>
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Open-Air Rooftop Deck</span>
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Hawa Dingin Pegunungan</span>
                  <span className="px-3 py-1 rounded-full bg-vanilla/60 border border-chestnut/15">✓ Steak &amp; Tomyam Warmth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. THE RITUAL (EDITORIAL 2-COLUMN) ─────────────────────── */}
      <section id="ritual" className="py-20 md:py-28 bg-linen border-b border-chestnut/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Media: Authentic V60 Pouring at Clavicula */}
            <div className="lg:col-span-5 relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-chestnut/25 shadow-xl bg-white">
              <Image
                src="/assets/clavicula/places/slow-bar-v60-clavicula.jpg"
                alt="Slow bar pour and manual brew ritual at Clavicula Coffee"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-chestnut text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                  Slow Bar &amp; Roastery Lab
                </span>
                <p className="text-xs font-serif italic text-white/90">
                  Diseduh dengan presisi rasio, temperatur, dan waktu demi memunculkan potensi terbaik biji kopi arabika pilihan.
                </p>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-2">
                THE RITUAL // SENI MENIKMATI KOPI
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-espresso leading-tight mb-8">
                Empat Langkah Menikmati Sajian Clavicula
              </h2>

              <ol className="space-y-6">
                <li className="flex gap-5 pb-6 border-b border-chestnut/15">
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-chestnut min-w-[2.5rem]">
                    01
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-espresso mb-1">
                      Hirup Aromanya
                    </h3>
                    <p className="text-sm text-espresso/70 leading-relaxed">
                      Sebelum menyesap, dekatkan cangkir dan hirup aroma karamel, rempah buah, atau wangi floral yang terperangkap dalam crema espresso murni.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5 pb-6 border-b border-chestnut/15">
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-chestnut min-w-[2.5rem]">
                    02
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-espresso mb-1">
                      Sesap Layer Pertama
                    </h3>
                    <p className="text-sm text-espresso/70 leading-relaxed">
                      Untuk menu anatomi berlayer seperti Manubrium atau Sternum, sesap dahulu krim halusnya sebelum diaduk agar seluruh lapisan rasa terasa utuh.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5 pb-6 border-b border-chestnut/15">
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-chestnut min-w-[2.5rem]">
                    03
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-espresso mb-1">
                      Padukan dengan Santapan Dapur
                    </h3>
                    <p className="text-sm text-espresso/70 leading-relaxed">
                      Seduhan kopi semakin sempurna disandingkan dengan gurihnya Clavicula Tenderloin Steak lada hitam, semangkuk tomyam hangat, atau camilan manis croffle.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5">
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-chestnut min-w-[2.5rem]">
                    04
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-espresso mb-1">
                      Duduk &amp; Bertukar Ide
                    </h3>
                    <p className="text-sm text-espresso/70 leading-relaxed">
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
      <section className="bg-vanilla/40 py-16 border-b border-chestnut/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l border-chestnut/20 pl-5">
              <span className="font-display font-black text-4xl md:text-5xl text-chestnut block leading-none">
                6+
              </span>
              <p className="mt-2 text-xs md:text-sm text-espresso/60 font-mono uppercase tracking-wider">
                Signature Anatomi Ikonik
              </p>
            </div>

            <div className="border-l border-chestnut/20 pl-5">
              <span className="font-display font-black text-4xl md:text-5xl text-chestnut block leading-none">
                2
              </span>
              <p className="mt-2 text-xs md:text-sm text-espresso/60 font-mono uppercase tracking-wider">
                Sanctuary Outlet (Slawi &amp; Guci)
              </p>
            </div>

            <div className="border-l border-chestnut/20 pl-5">
              <span className="font-display font-black text-4xl md:text-5xl text-chestnut block leading-none">
                120+
              </span>
              <p className="mt-2 text-xs md:text-sm text-espresso/60 font-mono uppercase tracking-wider">
                Menu Minuman &amp; Santapan Dapur
              </p>
            </div>

            <div className="border-l border-chestnut/20 pl-5">
              <span className="font-display font-black text-4xl md:text-5xl text-chestnut block leading-none">
                100%
              </span>
              <p className="mt-2 text-xs md:text-sm text-espresso/60 font-mono uppercase tracking-wider">
                Halal Certified Kitchen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. THE COMPLETE CAFE MENU (ALL 120+ ITEMS FROM PDF) ─────── */}
      <section id="full-menu" className="py-20 md:py-28 bg-linen scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-chestnut/15">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-2">
                DAFTAR MENU RESMI // BUKU MENU KAFE LENGKAP
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-espresso">
                The Complete Cafe Menu
              </h2>
              <p className="mt-2 text-xs md:text-sm text-espresso/70 font-serif italic">
                Seluruh hidangan dan seduhan resmi dari 8 halaman buku menu fisik kafe Slawi &amp; Guci. Semua harga sudah nett termasuk PPN.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1.5 rounded-full border border-chestnut/20 shadow-sm">
              <button
                onClick={() => setViewMode("card")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "card"
                    ? "bg-chestnut text-white shadow-sm"
                    : "text-espresso/70 hover:text-espresso"
                }`}
              >
                Kartu Bergambar (Ember View)
              </button>
              <button
                onClick={() => setViewMode("paper")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "paper"
                    ? "bg-chestnut text-white shadow-sm"
                    : "text-espresso/70 hover:text-espresso"
                }`}
              >
                Format Buku Menu (Paper)
              </button>
            </div>
          </div>

          {/* Official Scanned PDF Posters Drawer */}
          {showPosterGallery && (
            <div className="mb-14 p-6 md:p-8 bg-vanilla/80 rounded-3xl border border-chestnut/20 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-espresso">
                    Lembar Dokumen Menu Asli PDF (12 Lembar Kafe)
                  </h3>
                  <p className="text-xs text-espresso/60 font-serif italic">
                    Arsip visual dokumen resmi dari meja kasir dan dapur Clavicula Slawi &amp; Guci Hills
                  </p>
                </div>
                <button
                  onClick={() => setShowPosterGallery(false)}
                  className="text-xs font-mono text-chestnut hover:underline font-semibold"
                >
                  Tutup Galeri
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                {POSTER_GALLERY.map((poster, idx) => (
                  <div
                    key={idx}
                    className="snap-start shrink-0 w-64 md:w-72 bg-white rounded-2xl overflow-hidden border border-chestnut/15 shadow-sm"
                  >
                    <div className="relative aspect-[1/1.41] bg-black">
                      <Image
                        src={poster.src}
                        alt={poster.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-3 bg-white border-t border-chestnut/10">
                      <span className="text-xs font-bold text-espresso line-clamp-1 block">
                        {poster.title}
                      </span>
                      <a
                        href={poster.src}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono text-chestnut hover:underline flex items-center gap-1 mt-1 font-semibold"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40"
              />
              <input
                type="text"
                placeholder="Cari menu, kopi, steak, tomyam, camilan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-full pl-11 pr-4 py-3 text-xs md:text-sm border border-chestnut/20 text-espresso placeholder-espresso/40 focus:outline-none focus:border-chestnut transition-colors shadow-sm"
              />
            </div>
            <div className="text-xs font-mono text-espresso/60 self-center">
              Menampilkan <span className="font-bold text-chestnut">{filteredItems.length}</span> pilihan menu
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-chestnut text-white shadow-md scale-105"
                    : "bg-white text-espresso/75 hover:bg-vanilla border border-chestnut/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ─── DISPLAY: CARD VIEW (EMBER COFFEE LUXURY LIGHT CARDS) ──── */}
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center text-espresso/50 bg-white rounded-3xl border border-chestnut/15 p-8 shadow-sm">
              <p className="font-serif italic text-2xl text-espresso mb-2">Menu tidak ditemukan</p>
              <p className="text-xs">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-3xl p-5 border border-chestnut/15 hover:border-chestnut/40 hover:shadow-warm-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {item.image ? (
                      <div className="relative w-full aspect-[4/3] mb-4 rounded-2xl overflow-hidden bg-[#FAF6F0] border border-chestnut/10">
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
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-chestnut text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-20 mb-4 rounded-2xl bg-vanilla/40 border border-chestnut/10 flex items-center justify-between px-4">
                        <span className="text-[11px] font-mono tracking-wider text-chestnut uppercase font-semibold">
                          ✦ {item.category}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded bg-chestnut/15 text-chestnut font-mono text-[9px] font-bold uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-display text-lg font-bold text-espresso group-hover:text-chestnut transition-colors leading-snug">
                        {item.name}
                      </h4>
                      <span className="font-mono text-base font-bold text-chestnut whitespace-nowrap">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p className="text-xs text-espresso/70 leading-relaxed mb-4">
                      {item.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-chestnut/10 flex items-center justify-between text-[11px] font-mono text-espresso/50">
                    <span>{item.category}</span>
                    <span className="text-chestnut font-semibold">Tersedia di Outlet</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ─── DISPLAY: PAPER STYLE MENU (CLASSIC EDITORIAL LIST) ─── */
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-chestnut/20 shadow-sm divide-y divide-chestnut/15">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-vanilla/40 px-4 rounded-xl transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base font-bold text-espresso leading-snug">
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-vanilla text-chestnut font-bold border border-chestnut/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-espresso/60 font-serif italic mt-0.5">
                      {item.notes}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="font-mono text-base font-bold text-chestnut">
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
              <p className="text-xs md:text-sm text-white/80 font-serif italic mb-8 leading-relaxed">
                Kunjungi outlet Clavicula Slawi untuk suasana roastery bar &amp; ruang diskusi kreatif, 
                atau nikmati sejuknya kabut pegunungan pinus di Clavicula Hills Guci.
              </p>
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
