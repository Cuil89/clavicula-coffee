"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const InteractiveCoffeeBean3D = dynamic(
  () => import("@/components/InteractiveCoffeeBean3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] rounded-[2.5rem] bg-white border border-chestnut/20 flex flex-col items-center justify-center text-espresso/40 font-mono text-xs gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-chestnut/30 border-t-chestnut animate-spin"></div>
        <span>Memuat Laboratorium Anatomi Biji 3D...</span>
      </div>
    ),
  }
);


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
  concept?: string;
};

// ─── THE 8 CURATED SIGNATURE HIGHLIGHTS (EMBER STYLE) ─────────────────────
const SIGNATURE_LINEUP = [
  {
    index: "01",
    name: "Manubrium",
    price: 30000,
    category: "Signature Anatomi",
    notes: "Vanilla velvet cream · Double espresso bold · Sweet balanced finish",
    concept: "Anatomi: Tulang hulu dada — menyatukan ritme napas dan detak jantung",
    image: "/assets/clavicula/drinks/manubrium.webp",
    badge: "Best Seller",
  },
  {
    index: "02",
    name: "Acromion",
    price: 31000,
    category: "Signature Anatomi",
    notes: "Caramelized milk · Espresso aromatik · Remahan biskuit regal gurih",
    concept: "Anatomi: Puncak tulang bahu — jembatan gerakan presisi tangan barista",
    image: "/assets/clavicula/drinks/acromion.webp",
    badge: "Must Try",
  },
  {
    index: "03",
    name: "Costa",
    price: 31000,
    category: "Signature Specialty",
    notes: "Nutella hazelnut legit · Double espresso arabika · Vanilla ice cream scoop",
    concept: "Anatomi: Tulang rusuk — melindungi kehangatan rasa terdalam",
    image: "/assets/clavicula/drinks/costa.webp",
    badge: "Barista Pick",
  },
  {
    index: "04",
    name: "Subclavius",
    price: 31000,
    category: "Artisan Cold Foam",
    notes: "Velvety cold foam · Espresso deep roast · Distinct aromatic punch",
    concept: "Anatomi: Otot pengunci di bawah clavicula — fondasi rasa yang kokoh",
    image: "/assets/extracted/signature_subclavius.jpg",
    badge: "Signature",
  },
  {
    index: "05",
    name: "Scapula",
    price: 29000,
    category: "Signature Nusantara",
    notes: "Pandan klepon nusantara · Kelapa gurih · Double espresso arabika",
    concept: "Anatomi: Tulang belikat — sayap rasa tradisional bernuansa modern",
    image: "/assets/clavicula/drinks/scapula.webp",
    badge: "Nusantara Heritage",
  },
  {
    index: "06",
    name: "Trapezius",
    price: 30000,
    category: "Fruit & Cream Fusion",
    notes: "Fresh strawberry swirl · Susu lembut dingin · Kopi eksotis",
    concept: "Anatomi: Otot trapezius — relaksasi rasa manis segar yang menenangkan",
    image: "/assets/clavicula/drinks/trapezius.webp",
    badge: "Refreshing",
  },
  {
    index: "07",
    name: "Clavicula Tenderloin Steak",
    price: 73000,
    category: "Special Hot Kitchen",
    notes: "Daging sapi tenderloin empuk · Saus spesial lada hitam · Mashed potato & sayur",
    concept: "Main Course Spesial Dapur Clavicula — disajikan fresh setiap pesanan",
    image: "/assets/menu_crops/steak_tenderloin.jpg",
    badge: "Chef Choice",
  },
  {
    index: "08",
    name: "Tomyam Seporsi Berdua",
    price: 50000,
    category: "Sharing Hot Pot",
    notes: "Udang segar & cumi · Kuah tomyam asam pedas segar · Porsi komplit sharing 2 pax",
    concept: "Sajian hangat pas untuk menghalau hawa dingin pegunungan Slawi & Guci",
    image: "/assets/menu_crops/special_tomyam.jpg",
    badge: "Sharing 2 Pax",
  },
];

// ─── COMPLETE CAFE MENU (ALL ITEMS FROM PDF/PAPER MENU) ─────────────────────
const ALL_MENU_ITEMS: MenuItem[] = [
  // 1. SIGNATURE DRINK (ANATOMI)
  {
    id: "sig-01",
    name: "Manubrium",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    notes: "Vanilla velvet cream · Double espresso bold · Creamy finish",
    desc: "Layer krim vanila lembut berpadu double espresso bold, sensasi rasa manis creamy yang seimbang.",
    image: "/assets/clavicula/drinks/manubrium.webp",
    badge: "Best Seller",
    isSignature: true,
  },
  {
    id: "sig-02",
    name: "Acromion",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    notes: "Caramelized milk · Espresso aromatik · Biskuit regal",
    desc: "Kombinasi espresso aromatik dengan susu terkaramelisasi dan sentuhan biskuit regal lembut.",
    image: "/assets/clavicula/drinks/acromion.webp",
    badge: "Must Try",
    isSignature: true,
  },
  {
    id: "sig-03",
    name: "Costa",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    notes: "Nutella legit · Double espresso · Vanilla ice cream scoop",
    desc: "Perpaduan legit nutella, double espresso arabika, dan scoop es krim vanila lembut.",
    image: "/assets/clavicula/drinks/costa.webp",
    badge: "Specialty",
    isSignature: true,
  },
  {
    id: "sig-04",
    name: "Subclavius",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    notes: "Velvety foam crown · Espresso deep roast · Distinct aroma",
    desc: "Mahkota foam lembut berpadu espresso kaya rasa dengan sensasi rasa roasted yang memikat.",
    image: "/assets/extracted/signature_subclavius.jpg",
    badge: "Signature",
    isSignature: true,
  },
  {
    id: "sig-05",
    name: "Trapezius",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    notes: "Fresh strawberry swirl · Susu lembut dingin · Kopi eksotis",
    desc: "Perpaduan swirl buah stroberi segar dengan krim lembut dan sentuhan kopi eksotis.",
    image: "/assets/clavicula/drinks/trapezius.webp",
    isSignature: true,
  },
  {
    id: "sig-06",
    name: "Sternum",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    notes: "Cold brew · Saus karamel leleh · Manis seimbang",
    desc: "Kopi dingin dengan saus karamel leleh berlapis es, manis pas tanpa menenggelamkan rasa kopi.",
    image: "/assets/clavicula/drinks/sternum.webp",
    isSignature: true,
  },
  {
    id: "sig-07",
    name: "Scapula",
    price: 29000,
    category: "Signature Drink (Anatomi)",
    notes: "Pandan klepon nusantara · Kelapa gurih · Espresso harum",
    desc: "Kopi susu klepon pandan kelapa harum khas Nusantara, gurih legit dan berkarakter.",
    image: "/assets/clavicula/drinks/scapula.webp",
    badge: "Heritage",
    isSignature: true,
  },

  // 2. ESPRESSO BASED
  {
    id: "esp-01",
    name: "Single Espresso",
    price: 11000,
    category: "Espresso Based",
    notes: "Ekstraksi murni biji arabika sangrai presisi · Rasa pekat seimbang",
    desc: "Ekstraksi murni single origin dengan crema emas tebal kaya aroma.",
  },
  {
    id: "esp-02",
    name: "Americano",
    price: 16000,
    category: "Espresso Based",
    notes: "Double shot espresso arabika · Air panas atau dingin segar",
    desc: "Espresso murni dilarutkan air mineral, bersih dengan profil rasa jernih.",
  },
  {
    id: "esp-03",
    name: "Long Black",
    price: 16000,
    category: "Espresso Based",
    notes: "Espresso dituangkan di atas air dingin · Crema utuh",
    desc: "Espresso dituangkan di atas air dingin menjaga lapisan crema aromatik tetap utuh.",
  },
  {
    id: "esp-04",
    name: "Es Kopi Susu Clavicula",
    price: 19000,
    category: "Espresso Based",
    notes: "Arabica blend · Susu creamy · Gula aren organik murni",
    desc: "Kopi susu andalan Clavicula dengan gula aren lokal organik legit seimbang.",
    image: "/assets/clavicula/drinks/kopi-susu-ori.webp",
    badge: "Favorit Harian",
  },
  {
    id: "esp-05",
    name: "Flavour Americano",
    price: 18000,
    category: "Espresso Based",
    notes: "Americano segar · Pilihan sirup buah: Peach / Berry / Lemon",
    desc: "Americano dingin berpadu sensasi buah segar pelepas dahaga.",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
  },
  {
    id: "esp-06",
    name: "Coffee Late",
    price: 19000,
    category: "Espresso Based",
    notes: "Double espresso · Steamed milk lembut · Thin microfoam",
    desc: "Perpaduan klasik espresso arabika dengan susu segar berbusa tipis.",
  },
  {
    id: "esp-07",
    name: "Cappuccino",
    price: 19000,
    category: "Espresso Based",
    notes: "Espresso seimbang · Busa susu tebal · Dusting cokelat cocoa",
    desc: "Kopi klasik Italia dengan lapisan busa susu tebal dan taburan cocoa aromatik.",
  },
  {
    id: "esp-08",
    name: "Affogato",
    price: 19000,
    category: "Espresso Based",
    notes: "Scoop vanilla ice cream · Disiram double espresso panas",
    desc: "Perpaduan kontras es krim vanila manis dingin disiram espresso panas pekat.",
    image: "/assets/clavicula/drinks/affogato.webp",
  },
  {
    id: "esp-09",
    name: "Caramel Machiato",
    price: 24000,
    category: "Espresso Based",
    notes: "Susu vanila · Espresso arabika · Drizzle saus karamel leleh",
    desc: "Lapisan susu beraroma vanila, espresso aromatik, dan saus karamel manis legit.",
    image: "/assets/clavicula/drinks/caramel-macchiato.webp",
  },
  {
    id: "esp-10",
    name: "Mocccacino",
    price: 24000,
    category: "Espresso Based",
    notes: "Espresso arabika · Cokelat cocoa pekat · Susu creamy",
    desc: "Harmoni rasa kopi dan cokelat premium yang kaya rasa.",
  },
  {
    id: "esp-11",
    name: "Strawberry Coffee",
    price: 25000,
    category: "Espresso Based",
    notes: "Selai stroberi segar · Susu creamy · Espresso float",
    desc: "Kombinasi unik stroberi asam manis dan espresso arabika aromatik.",
  },
  {
    id: "esp-12",
    name: "Lemonade Coffee",
    price: 24000,
    category: "Espresso Based",
    notes: "Double espresso · Perasan sari lemon asli · Soda dingin",
    desc: "Sensasi kopi soda lemon super segar pelepas penat siang hari.",
    image: "/assets/clavicula/drinks/coffee-lemonade.webp",
    badge: "Refreshing",
  },
  {
    id: "esp-13",
    name: "Flavour Latte",
    price: 25000,
    category: "Espresso Based",
    notes: "Pilihan sirup artisan: Hazelnut / Vanilla / Caramel / Pandan",
    desc: "Caffe latte lembut dipadukan sirup artisan pilihan favorit Anda.",
    image: "/assets/clavicula/drinks/flavour-latte.webp",
  },
  {
    id: "esp-14",
    name: "Cookies Coffee",
    price: 27000,
    category: "Espresso Based",
    notes: "Espresso creamy · Remahan biskuit cookies · Saus cokelat",
    desc: "Kopi susu manis bertabur remah biskuit cookies cokelat renyah.",
    image: "/assets/clavicula/drinks/cookies-coffee.webp",
  },
  {
    id: "esp-15",
    name: "Matcha Coffee",
    price: 29000,
    category: "Espresso Based",
    notes: "Matcha murni Jepang · Susu segar · Double shot espresso",
    desc: "Gradasi warna estetik matcha hijau murni, susu, dan double shot kopi arabika.",
    image: "/assets/clavicula/drinks/matcha-coffee-latte.webp",
    badge: "Popular",
  },
  {
    id: "esp-16",
    name: "Caramel Butterscotch",
    price: 27000,
    category: "Espresso Based",
    notes: "Saus butterscotch mentega harum · Espresso · Susu lembut",
    desc: "Latte aromatik dengan cita rasa butterscotch manis gurih khas.",
  },
  {
    id: "esp-17",
    name: "Moccacino Almond",
    price: 27000,
    category: "Espresso Based",
    notes: "Cokelat moccacino · Kacang almond gurih sangrai",
    desc: "Kombinasi kopi moccacino dengan aroma kacang almond gurih.",
  },
  {
    id: "esp-18",
    name: "Vanila Cream Latte",
    price: 27000,
    category: "Espresso Based",
    notes: "Krim vanila ekstra lembut · Espresso manis lembut",
    desc: "Latte dengan krim vanila ekstra tebal dan tekstur sangat lembut di lidah.",
  },

  // 3. MANUAL BREW (SLOW BAR)
  {
    id: "mb-01",
    name: "V60 Single Origin Nusantara",
    price: 24000,
    category: "Manual Brew",
    notes: "Aceh Gayo / Sindoro Honey / Ijen Anaerob / Flores Bajawa",
    desc: "Penyeduhan pour-over presisi V60 menonjolkan keasaman jernih dan aroma bunga/buah.",
    image: "/assets/clavicula/places/slow-bar-v60-clavicula.jpg",
    badge: "Slow Bar",
  },
  {
    id: "mb-02",
    name: "V60 International Selection",
    price: 36000,
    category: "Manual Brew",
    notes: "Ethiopia Yirgacheffe / Colombia Supremo / Kenya Nyeri",
    desc: "Biji kopi impor pilihan diseduh metode pour-over untuk karakter rasa kelas dunia.",
    image: "/assets/clavicula/roastery/rb-03-arabica-impor-v60-luar.jpg",
    badge: "Curated Beans",
  },
  {
    id: "mb-03",
    name: "Aeropress",
    price: 25000,
    category: "Manual Brew",
    notes: "Tekanan udara mikro · Ekstraksi bersih · Rasa pekat lembut",
    desc: "Ekstraksi tekanan udara menghasilkan cangkir kopi ber-body halus dan kaya rasa.",
  },
  {
    id: "mb-04",
    name: "Vietnam Drip",
    price: 22000,
    category: "Manual Brew",
    notes: "Tetes lambat tradisional · Susu kental manis gurih legit",
    desc: "Seduhan tetes lambat tradisional Vietnam berpadu manisnya susu kental gurih.",
  },
  {
    id: "mb-05",
    name: "French Press",
    price: 18000,
    category: "Manual Brew",
    notes: "Immersion extraction · Full body · Minyak kopi aromatik",
    desc: "Ekstraksi rendam penuh menghasilkan rasa kopi tebal dan aroma maksimal.",
    image: "/assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg",
  },
  {
    id: "mb-06",
    name: "Kopi Tubruk",
    price: 16000,
    category: "Manual Brew",
    notes: "Biji robusta petik merah · Gula terpisah · Seduhan klasik",
    desc: "Seduhan kopi tubruk nusantara klasik dengan biji sangrai segar khas Slawi.",
    image: "/assets/clavicula/roastery/rb-04-fine-robusta-selection.jpg",
  },

  // 4. MOCKTAIL & BLEND
  {
    id: "mck-01",
    name: "Brachialis",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Cold brew aromatik · Jeruk sunkist · Soda dingin",
    desc: "Cold brew aromatik dipadukan ekstrak jeruk sunkist, sirup botanikal, dan soda dingin.",
    image: "/assets/menu_crops/mocktail_brachialis.jpg",
    badge: "Signature Mocktail",
  },
  {
    id: "mck-02",
    name: "Ulnaris",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Bunga telang murni · Lemon segar · Soda botanikal",
    desc: "Mocktail ungu-kebiruan alami dari bunga telang murni berpadu sari lemon dan rempah.",
    image: "/assets/menu_crops/mocktail_ulnaris.jpg",
  },
  {
    id: "mck-03",
    name: "Radius",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Nanas & markisa tropis · Cold brew · Foam aromatik",
    desc: "Sensasi buah tropis nanas dan markisa segar berpadu cold brew dan foam aromatik lembut.",
    image: "/assets/menu_crops/mocktail_radius.jpg",
  },
  {
    id: "mck-04",
    name: "Chocobanana Blend",
    price: 28000,
    category: "Mocktail & Blend",
    notes: "Cokelat pekat · Pisang segar matang · Es halus",
    desc: "Blend cokelat premium dan pisang segar matang dengan es batu halus berlumur karamel.",
    image: "/assets/menu_crops/mocktail_chocobanana.jpg",
  },
  {
    id: "mck-05",
    name: "Costa Blend",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Frappe nutella · Espresso arabika · Whipped cream",
    desc: "Frappe creamy nutella dan kopi susu dengan whipped cream lembut serta topping saus cokelat.",
    image: "/assets/menu_crops/mocktail_costa_blend.jpg",
  },
  {
    id: "mck-06",
    name: "Pink Candy",
    price: 27000,
    category: "Mocktail & Blend",
    notes: "Stroberi manis segar · Hint bubblegum · Garnish lemon",
    desc: "Mocktail ceria bercita rasa stroberi manis segar dengan hint bubblegum dan garnish lemon.",
    image: "/assets/menu_crops/mocktail_pink_candy.jpg",
  },
  {
    id: "mck-07",
    name: "Nutela Blend",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Nutella cokelat hazelnut · Susu murni · Es batu blender halus",
    desc: "Minuman ice blended cokelat nutella legit bertabur bubuk cocoa.",
  },
  {
    id: "mck-08",
    name: "Baileys Coffee",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Espresso · Aroma irish cream lembut · Non-alcohol",
    desc: "Kopi susu dingin creamy dengan sensasi aroma irish cream aromatik (100% halal).",
  },
  {
    id: "mck-09",
    name: "Vomer",
    price: 30000,
    category: "Mocktail & Blend",
    notes: "Racikan mocktail buah segar · Daun mint dingin",
    desc: "Minuman mocktail segar dengan sentuhan buah tropis dan mint dingin.",
  },
  {
    id: "mck-10",
    name: "Fabaceae",
    price: 27000,
    category: "Mocktail & Blend",
    notes: "Mocktail sari herbal botanikal · Soda segar",
    desc: "Kombinasi sari herbal segar dengan sensasi sparkling soda dingin.",
  },

  // 5. SPECIAL BOWL & NOODLE
  {
    id: "bwl-01",
    name: "Rice/Noodle Chicken Chashu with Sauce",
    price: 31000,
    category: "Special Bowl & Noodle",
    notes: "Ayam chashu panggang · Saus BBQ/Teriyaki · Nasi/Mie",
    desc: "Pilihan nasi atau mie kenyal dengan potongan ayam chashu panggang gurih saus spesial.",
    image: "/assets/menu_crops/bowl_chashu.jpg",
    badge: "Best Seller",
  },
  {
    id: "bwl-02",
    name: "Rice/Noodle Chicken Chashu Spicy",
    price: 35000,
    category: "Special Bowl & Noodle",
    notes: "Chashu panggang · Sambal geprek matah pedas · Nasi pulen",
    desc: "Ayam chashu panggang empuk dengan saus sambal geprek matah pedas nampol.",
    image: "/assets/menu_crops/bowl_chashu.jpg",
  },
  {
    id: "bwl-03",
    name: "Mentai Rice (Beef / Chicken)",
    price: 30000,
    category: "Special Bowl & Noodle",
    notes: "Nasi pulen Jepang · Saus mentai bakar lumer · Tobiko",
    desc: "Nasi pulen Jepang diselimuti daging sapi/ayam gurih, saus mentai bakar berlimpah tobiko.",
    image: "/assets/clavicula/foods/mentai-rice.webp",
    badge: "Favorit",
  },
  {
    id: "bwl-04",
    name: "Rice Smoke Beef with Sauce",
    price: 39000,
    category: "Special Bowl & Noodle",
    notes: "Daging sapi asap harum · Telur mata sapi · Saus gurih",
    desc: "Daging sapi asap harum gurih berpadu telur mata sapi dan siraman saus lada hitam / BBQ.",
    image: "/assets/menu_crops/bowl_smoke_beef.jpg",
  },
  {
    id: "bwl-05",
    name: "Special Beef Fried with Sauce",
    price: 33000,
    category: "Special Bowl & Noodle",
    notes: "Daging sapi empuk · Saus spesial tumis · Wijen sangrai",
    desc: "Potongan daging sapi empuk tumis saus gurih dengan bawang bombay dan wijen sangrai wangi.",
    image: "/assets/menu_crops/bowl_smoke_beef.jpg",
  },
  {
    id: "bwl-06",
    name: "Fried Noodles with Egg Salted",
    price: 28000,
    category: "Special Bowl & Noodle",
    notes: "Mie kenyal gurih · Saus kuning telur asin salted egg melimpah",
    desc: "Mie goreng gurih berlumur saus kuning telur asin (salted egg) creamy yang melimpah.",
    image: "/assets/menu_crops/bowl_javanese_fried_noodles.jpg",
  },
  {
    id: "bwl-07",
    name: "Chicken Katsu Spicy",
    price: 26000,
    category: "Special Bowl & Noodle",
    notes: "Fillet ayam krispi panko · Bumbu cabai pedas · Telur ceplok",
    desc: "Fillet ayam goreng krispi golden brown dengan taburan bumbu cabai pedas dan telur.",
    image: "/assets/clavicula/foods/chicken-katsu-spicy.webp",
  },
  {
    id: "bwl-08",
    name: "Chicken Katsu with Sauce",
    price: 30000,
    category: "Special Bowl & Noodle",
    notes: "Dada ayam panko renyah · Saus katsu gurih Jepang",
    desc: "Dada ayam berbalur tepung panko renyah disajikan dengan saus katsu gurih Jepang.",
    image: "/assets/clavicula/foods/chicken-katsu-with-sauce.webp",
  },
  {
    id: "bwl-09",
    name: "Javanese Fried Rice",
    price: 21000,
    category: "Special Bowl & Noodle",
    notes: "Nasi goreng bumbu rempah Jawa · Aroma asap wajan · Telur & kerupuk",
    desc: "Nasi goreng tradisional bumbu rempah Jawa wangi asap wajan, telur, kerupuk, dan acar segar.",
    image: "/assets/clavicula/foods/javanese-fried-rice.webp",
  },
  {
    id: "bwl-10",
    name: "Javanese Fried Noodles",
    price: 21000,
    category: "Special Bowl & Noodle",
    notes: "Bakmi goreng Jawa gurih manis · Sayuran segar · Suwiran ayam",
    desc: "Bakmi goreng Jawa gurih manis dengan sayuran segar, suwiran ayam, dan taburan bawang goreng.",
    image: "/assets/clavicula/foods/javanese-fried-noodles.webp",
  },

  // 6. SPECIAL CLAVICULA (STEAK, SEAFOOD & CAKES)
  {
    id: "spc-01",
    name: "Clavicula Tenderloin Steak",
    price: 73000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Tenderloin beef empuk · Saus spesial · Mashed potato & sayur saute",
    desc: "Daging sapi tenderloin empuk panggang disajikan dengan mashed potato gurih, saus spesial, dan sayur.",
    image: "/assets/menu_crops/steak_tenderloin.jpg",
    badge: "Chef Choice",
    isSignature: true,
  },
  {
    id: "spc-02",
    name: "Tomyam Seporsi Berdua",
    price: 45000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Udang segar, cumi, jamur · Kuah tomyam asam pedas segar · Porsi sharing 2 orang",
    desc: "Sop tomyam asam pedas khas Thailand dengan udang segar, cumi, jamur porsi sharing berdua.",
    image: "/assets/menu_crops/special_tomyam.jpg",
    badge: "Sharing 2 Pax",
    isSignature: true,
  },
  {
    id: "spc-03",
    name: "Chicken Steak with Sauce",
    price: 36000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Fillet ayam panggang krispi juicy · Mashed potato & saus pilihan",
    desc: "Fillet ayam panggang krispi juicy disiram saus gurih pilihan dengan mashed potato & salad segar.",
    image: "/assets/menu_crops/special_chicken_steak.jpg",
  },
  {
    id: "spc-04",
    name: "Fish and Chip",
    price: 32000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Fillet ikan dory golden brown · Kentang goreng · Saus tartar",
    desc: "Fillet ikan dory krispi golden brown disajikan dengan kentang goreng renyah dan saus tartar.",
    image: "/assets/menu_crops/fish_and_chip.jpg",
  },
  {
    id: "spc-05",
    name: "Modern Fried Rice",
    price: 27000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Pilihan bumbu: Tomyum asam pedas / BBQ / Black Pepper / Rendang",
    desc: "Nasi goreng modern bumbu spesial pilihan khas kreasi chef Clavicula.",
    image: "/assets/menu_crops/modern_fried_rice.jpg",
  },
  {
    id: "spc-06",
    name: "Special Crab (100% Fresh Crab)",
    price: 100000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Kepiting segar 100% · Bumbu rempah melimpah khas · Porsi 2 ekor",
    desc: "Kepiting segar bumbu rempah khas Clavicula yang gurih meresap (Porsi isi 2 kepiting utuh).",
    image: "/assets/clavicula/foods/tomyam-seafood.webp",
    badge: "Seafood Spesial",
  },
  {
    id: "spc-07",
    name: "Strawberry Cheesecake",
    price: 28000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Kue keju lembut premium · Selai buah stroberi · Biskuit gurih",
    desc: "Kue keju lembut premium dengan selai buah stroberi segar dan remahan biskuit gurih.",
    image: "/assets/clavicula/foods/strawberry-cheesecake.webp",
  },
  {
    id: "spc-08",
    name: "Millescrepes (Cookies / Matcha)",
    price: 28000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Ratusan lapis crepe lembut · Krim vanila cookies atau matcha Jepang",
    desc: "Ratusan lapisan crepe tipis lembut berseling krim manis vanila cookies atau matcha.",
    image: "/assets/clavicula/foods/mille-crepes.webp",
  },
  {
    id: "spc-09",
    name: "Tiramisu Cake",
    price: 28000,
    category: "Special Clavicula (Steak & Crab)",
    notes: "Tiramisu klasik · Espresso arabika · Keju mascarpone lembut",
    desc: "Kue tiramisu klasik beraroma espresso arabika dengan lapisan keju mascarpone lembut.",
    image: "/assets/clavicula/foods/tiramisu-cake.webp",
  },

  // 7. DESSERT & SNACK
  {
    id: "snk-01",
    name: "Mix Platter Clavicula",
    price: 36000,
    category: "Dessert & Snack",
    notes: "Kentang goreng, sosis bakar, nugget, & saus cocolan · Porsi sharing",
    desc: "Piring camilan komplit porsi sharing: kentang goreng, sosis bakar, nugget, dan saus gurih.",
    image: "/assets/menu_crops/mix_platter.jpg",
    badge: "Sharing Platter",
  },
  {
    id: "snk-02",
    name: "Springroll",
    price: 28000,
    category: "Dessert & Snack",
    notes: "Roll kulit renyah · Sayuran segar gurih & ayam · Saus celup",
    desc: "Roll pembungkus renyah dengan isian sayuran segar gurih dan ayam disajikan dengan saus celup.",
    image: "/assets/menu_crops/springroll.jpg",
  },
  {
    id: "snk-03",
    name: "Beef Burger",
    price: 27000,
    category: "Dessert & Snack",
    notes: "Patty sapi panggang juicy · Keju cheddar · Selada segar & saus",
    desc: "Roti bun empuk dengan patty daging sapi panggang juicy, keju cheddar, selada, dan saus burger.",
    image: "/assets/clavicula/foods/beef-burger.webp",
  },
  {
    id: "snk-04",
    name: "Croffle (Caramel/Straw/Choco/Nutella)",
    price: 27000,
    category: "Dessert & Snack",
    notes: "Croissant waffle renyah mentega · Pilihan glaze manis melimpah",
    desc: "Perpaduan croissant waffle renyah berlapis mentega hangat dengan pilihan topping glaze manis.",
    image: "/assets/menu_crops/croffle.jpg",
    badge: "Popular Snack",
  },
  {
    id: "snk-05",
    name: "Savory Toast",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Roti panggang mentega gurih · Keju leleh · Smoked meat",
    desc: "Roti panggang mentega gurih berisi keju leleh, smoked meat, dan sayuran segar.",
    image: "/assets/menu_crops/savory_toast.jpg",
  },
  {
    id: "snk-06",
    name: "Chicken Pop",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Bite-sized ayam krispi bumbu gurih · Renyah renyah di luar juicy di dalam",
    desc: "Bite-sized daging ayam krispi tepung bumbu gurih yang renyah di luar dan juicy di dalam.",
    image: "/assets/menu_crops/chicken_pop.jpg",
  },
  {
    id: "snk-07",
    name: "Taiwanese Fried Chicken",
    price: 25000,
    category: "Dessert & Snack",
    notes: "Ayam goreng ala Taiwan · Bumbu rempah wangi · Bubuk cabai gurih",
    desc: "Ayam goreng ala Taiwan dengan taburan bumbu rempah wangi dan bubuk cabai pedas gurih.",
    image: "/assets/menu_crops/taiwanese_chicken.jpg",
  },
  {
    id: "snk-08",
    name: "Yakitori",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Sate ayam ala Jepang · Olesan saus tare manis gurih meresap",
    desc: "Sate ayam ala Jepang dipanggang arang dengan olesan saus tare manis gurih yang meresap.",
    image: "/assets/clavicula/foods/yakitori.webp",
  },
  {
    id: "snk-09",
    name: "Dimsum Mentai",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Siomay kukus lembut ayam udang · Saus mentai bakar creamy",
    desc: "Dimsum siomay ayam udang lembut kukus diselimuti saus mentai bakar gurih creamy.",
    image: "/assets/clavicula/foods/dimsum-mentai.webp",
    badge: "Best Seller",
  },
  {
    id: "snk-10",
    name: "Dimsum Original",
    price: 20000,
    category: "Dessert & Snack",
    notes: "Dimsum ayam udang murni kukus · Chili oil wangi gurih",
    desc: "Dimsum kukus lembut isi daging ayam dan udang murni disajikan dengan chili oil wangi.",
    image: "/assets/clavicula/foods/dimsum-ori.webp",
  },
  {
    id: "snk-11",
    name: "Gochucula Chicken Wings",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Sayap ayam goreng renyah · Saus gochujang pedas manis Korea · Wijen",
    desc: "Sayap ayam goreng renyah dibalut saus gochujang pedas manis khas Korea bertabur wijen.",
    image: "/assets/clavicula/foods/gochucula-chicken-wings.webp",
  },
  {
    id: "snk-12",
    name: "Churros",
    price: 23000,
    category: "Dessert & Snack",
    notes: "Stik churros renyah · Cinnamon sugar · Saus cokelat leleh",
    desc: "Stik churros goreng renyah bertabur gula kayu manis dengan dipping saus cokelat leleh.",
    image: "/assets/menu_crops/churros.jpg",
  },
  {
    id: "snk-13",
    name: "Pancake",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Pancake hangat empuk fluffy · Siraman madu/maple & butter",
    desc: "Tumpukan pancake hangat yang lembut dan fluffy dengan siraman madu/sirup maple dan butter.",
    image: "/assets/menu_crops/pancake.jpg",
  },
  {
    id: "snk-14",
    name: "Sate Taichan Mozarella",
    price: 24000,
    category: "Dessert & Snack",
    notes: "Sate ayam taichan bakar gurih · Keju mozarella leleh · Sambal asin",
    desc: "Sate ayam taichan bakar gurih tanpa kecap diselimuti keju mozarella leleh dan sambal pedas.",
    image: "/assets/clavicula/foods/sate-taichan-mozarella.webp",
  },
  {
    id: "snk-15",
    name: "Sate Taichan Daging",
    price: 22000,
    category: "Dessert & Snack",
    notes: "Sate daging ayam bakar rempah · Sambal taichan pedas perasan jeruk nipis",
    desc: "Sate daging ayam bakar bumbu gurih dengan cocolan sambal taichan pedas asin segar.",
  },
  {
    id: "snk-16",
    name: "Chicken Nugget",
    price: 22000,
    category: "Dessert & Snack",
    notes: "Nugget ayam renyah golden brown · Saus tomat & mayones",
    desc: "Nugget daging ayam berkualitas disajikan hangat dengan aneka saus cocolan.",
  },
  {
    id: "snk-17",
    name: "Sweet Toast",
    price: 18000,
    category: "Dessert & Snack",
    notes: "Roti bakar mentega manis · Taburan gula kristal harum",
    desc: "Roti bakar mentega hangat manis sederhana penghangat suasana nongkrong.",
  },
  {
    id: "snk-18",
    name: "Rujak Cireng Ortega",
    price: 22000,
    category: "Dessert & Snack",
    notes: "Cireng krispi kenyal gurih · Bumbu rujak asam manis pedas kental",
    desc: "Cireng goreng renyah kenyal khas Ortega disajikan dengan sambal rujak legit.",
  },
  {
    id: "snk-19",
    name: "Bakso Goreng Ortega",
    price: 18000,
    category: "Dessert & Snack",
    notes: "Bakso goreng mekar krispi di luar · Kenyal gurih di dalam",
    desc: "Bakso goreng mekar renyah dengan rasa gurih daging yang mantap.",
  },
  {
    id: "snk-20",
    name: "Potato Stick / Kentang Goreng",
    price: 18000,
    category: "Dessert & Snack",
    notes: "Kentang goreng stik renyah · Taburan garam gurih gurih asin",
    desc: "Camilan kentang goreng klasik renyah menemani obrolan santai.",
  },

  // 8. NON COFFEE
  {
    id: "nc-01",
    name: "Carcoal (Charcoal Latte)",
    price: 31000,
    category: "Non Coffee",
    notes: "Arang aktif organik · Susu murni segar gurih · Detoks & relaks",
    desc: "Minuman arang aktif organik dengan susu segar manis gurih yang menenangkan dan detoks.",
    image: "/assets/clavicula/drinks/charcoal-blend.webp",
    badge: "Unique",
  },
  {
    id: "nc-02",
    name: "Matcha Latte",
    price: 30000,
    category: "Non Coffee",
    notes: "Matcha murni kualitas tinggi · Susu segar lembut hangat/dingin",
    desc: "Matcha murni kualitas tinggi dipadu susu segar hangat/dingin dengan rasa earthy manis lembut.",
    image: "/assets/clavicula/drinks/matcha-coffee-latte.webp",
    badge: "Favorit",
  },
  {
    id: "nc-03",
    name: "Taro Latte",
    price: 32000,
    category: "Non Coffee",
    notes: "Krim taro ungu legit ubi manis · Susu segar dingin",
    desc: "Krim taro ungu lembut bercita rasa ubi manis yang legit berpadu susu segar dingin.",
    image: "/assets/menu_crops/non_coffee_taro.jpg",
  },
  {
    id: "nc-04",
    name: "Red Velvet Latte",
    price: 31000,
    category: "Non Coffee",
    notes: "Susu creamy lembut · Cita rasa kue red velvet cokelat manis",
    desc: "Susu creamy berpadu kue red velvet lembut dengan sensasi cokelat manis dan wangi khas.",
    image: "/assets/menu_crops/non_coffee_matcha_redvelvet.jpg",
  },
  {
    id: "nc-05",
    name: "Chocolate Classic",
    price: 27000,
    category: "Non Coffee",
    notes: "Cokelat pekat pilihan · Susu hangat atau dingin · Kaya rasa cocoa",
    desc: "Cokelat pekat pilihan diseduh dengan susu hangat atau dingin, manis pas dan kaya rasa cocoa.",
    image: "/assets/menu_crops/non_coffee_chocolate.jpg",
  },
  {
    id: "nc-06",
    name: "Sakura Matcha",
    price: 31000,
    category: "Non Coffee",
    notes: "Matcha murni Jepang · Aroma wangi bunga sakura lembut",
    desc: "Kombinasi harum kelopak bunga sakura dengan kelembutan rasa matcha susu.",
  },
  {
    id: "nc-07",
    name: "Unicorn",
    price: 31000,
    category: "Non Coffee",
    notes: "Minuman manis creamy · Warna pastel ceria berpadu vanila",
    desc: "Minuman manis creamy bertema warna pastel lembut dengan hint rasa buah manis.",
  },
  {
    id: "nc-08",
    name: "Chocolatte",
    price: 28000,
    category: "Non Coffee",
    notes: "Sajian minuman cokelat susu kental manis pekat",
    desc: "Sajian minuman cokelat manis pekat dengan susu segar ekstra lembut.",
  },
  {
    id: "nc-09",
    name: "Bubble Gum",
    price: 30000,
    category: "Non Coffee",
    notes: "Susu segar dingin · Rasa permen karet nostalgia masa kecil",
    desc: "Susu segar dingin bercita rasa bubblegum manis segar nostalgia.",
  },
  {
    id: "nc-10",
    name: "Cookies Non-Coffee",
    price: 28000,
    category: "Non Coffee",
    notes: "Susu vanila creamy · Taburan remahan cookies cokelat lezat",
    desc: "Susu vanila creamy bertabur remah biskuit cookies cokelat gurih.",
  },

  // 9. TEA BASED & MOJITO
  {
    id: "tea-01",
    name: "Strawcha & Green Monkey",
    price: 31000,
    category: "Tea Based",
    notes: "Teh hijau segar · Ekstrak sari stroberi & sirup apel dingin",
    desc: "Teh hijau segar berpadu sari buah stroberi dan sirup apel dingin menyegarkan tenggorokan.",
    image: "/assets/menu_crops/tea_strawcha_greenmonkey.jpg",
    badge: "Signature Tea",
  },
  {
    id: "tea-02",
    name: "Strawberry Mojito",
    price: 29000,
    category: "Tea Based",
    notes: "Buah stroberi segar · Daun mint · Sari jeruk nipis · Soda dingin",
    desc: "Potongan buah stroberi segar, daun mint remuk, sari jeruk nipis, dan soda dingin menyegarkan.",
    image: "/assets/menu_crops/tea_mojito_strawberry.jpg",
  },
  {
    id: "tea-03",
    name: "Original Mojito",
    price: 26000,
    category: "Tea Based",
    notes: "Perasan jeruk nipis asli · Daun mint segar · Soda dingin berbuih",
    desc: "Perasan jeruk nipis asli, daun mint segar, dan soda dingin berbuih pelepas dahaga sempurna.",
    image: "/assets/menu_crops/tea_mojito_original.jpg",
  },
  {
    id: "tea-04",
    name: "Manis Manja",
    price: 26000,
    category: "Tea Based",
    notes: "Teh wangi manis buah-buahan tropis · Es batu melimpah",
    desc: "Racikan teh wangi manis buah-buahan tropis dengan es batu melimpah.",
    image: "/assets/menu_crops/tea_manis_manja.jpg",
  },
  {
    id: "tea-05",
    name: "Regal Milktea",
    price: 27000,
    category: "Tea Based",
    notes: "Milk tea seduh autentik · Brown sugar aren · Taburan regal gurih",
    desc: "Milk tea seduh autentik dengan brown sugar dan taburan remahan biskuit regal melimpah.",
    image: "/assets/menu_crops/tea_milktea_series.jpg",
  },
  {
    id: "tea-06",
    name: "Strawberry Fresh Fruit Tea",
    price: 21000,
    category: "Tea Based",
    notes: "Seduhan teh hitam wangi · Ekstrak sari buah stroberi manis dingin",
    desc: "Seduhan teh hitam wangi dengan ekstrak sari stroberi dingin manis menyegarkan.",
    image: "/assets/menu_crops/tea_fresh_flavored.jpg",
  },
  {
    id: "tea-07",
    name: "Cute Monkey",
    price: 30000,
    category: "Tea Based",
    notes: "Teh wangi buah pisang · Sentuhan susu segar dingin",
    desc: "Kreasi teh buah unik dengan rasa manis lembut menyegarkan.",
  },
  {
    id: "tea-08",
    name: "Flavour Mojito",
    price: 30000,
    category: "Tea Based",
    notes: "Pilihan rasa buah segar · Daun mint · Soda dingin",
    desc: "Mojito aneka rasa buah segar dengan daun mint dan soda dingin.",
  },
  {
    id: "tea-09",
    name: "Baby Green",
    price: 29000,
    category: "Tea Based",
    notes: "Seduhan teh hijau lembut menyegarkan tenggorokan",
    desc: "Teh hijau seduhan segar kaya antioksidan beraroma menenangkan.",
  },
  {
    id: "tea-10",
    name: "Banaki Milktea",
    price: 25000,
    category: "Tea Based",
    notes: "Milk tea seduh · Sirup pisang lembut creamy",
    desc: "Milk tea aromatik dengan aroma buah pisang manis harum.",
  },
  {
    id: "tea-11",
    name: "Brownsugar Milktea",
    price: 25000,
    category: "Tea Based",
    notes: "Milk tea klasik · Gula aren karamel gurih manis",
    desc: "Milk tea klasik dengan siraman gula aren karamel gurih harum.",
  },
  {
    id: "tea-12",
    name: "Kiwi Tea",
    price: 21000,
    category: "Tea Based",
    notes: "Teh segar · Ekstrak buah kiwi asam manis dingin",
    desc: "Teh dingin segar dengan sentuhan asam manis buah kiwi tropis.",
  },
  {
    id: "tea-13",
    name: "Lemon Tea",
    price: 18000,
    category: "Tea Based",
    notes: "Teh hitam seduh · Perasan jeruk lemon alami",
    desc: "Sari lemon segar diperas ke dalam seduhan teh dingin pelepas dahaga.",
  },
  {
    id: "tea-14",
    name: "Original Tea (Ice / Hot)",
    price: 14000,
    category: "Tea Based",
    notes: "Seduhan daun teh melati wangi khas kafe Nusantara",
    desc: "Teh melati wangi hangat atau dingin pelepas dahaga sehabis santap santai.",
  },

  // 10. MOZARELLA ADDICT & PAKET HEMAT
  {
    id: "moz-01",
    name: "Hotdog Mozarella",
    price: 38000,
    category: "Mozarella & Paket",
    notes: "Sosis sapi jumbo bakar · Balutan keju mozarella tebal molor",
    desc: "Sosis sapi premium bakar dibalut keju mozarella leleh tebal molor gurih di atas roti hangat.",
    image: "/assets/menu_crops/mozarella_hotdog.jpg",
    badge: "Melted Cheese",
  },
  {
    id: "moz-02",
    name: "Beef Burger Mozarella",
    price: 38000,
    category: "Mozarella & Paket",
    notes: "Burger patty sapi panggang · Lelehan keju mozarella bakar melimpah",
    desc: "Burger daging sapi panggang juicy dengan lelehan keju mozarella bakar melimpah.",
    image: "/assets/menu_crops/mozarella_burger.jpg",
  },
  {
    id: "moz-03",
    name: "Chashu Geprek Mozarella",
    price: 36000,
    category: "Mozarella & Paket",
    notes: "Ayam chashu geprek sambal bawang · Selimut keju mozarella bakar",
    desc: "Nasi ayam chashu geprek sambal bawang pedas ditutup selimut keju mozarella bakar.",
    image: "/assets/menu_crops/mozarella_chashu.jpg",
  },
  {
    id: "moz-04",
    name: "Chicken Katsu Geprek Mozarella",
    price: 33000,
    category: "Mozarella & Paket",
    notes: "Chicken katsu krispi geprek · Keju mozarella gurih kenyang",
    desc: "Chicken katsu krispi geprek dengan lelehan keju mozarella gurih kenyang.",
    image: "/assets/menu_crops/mozarella_katsu.jpg",
  },
  {
    id: "moz-05",
    name: "Special Beef Geprek Mozarella",
    price: 36000,
    category: "Mozarella & Paket",
    notes: "Daging sapi tumis saus geprek · Selimut mozarella bakar",
    desc: "Daging sapi tumis bumbu geprek dengan lelehan keju mozarella gurih mantap.",
  },
  {
    id: "moz-06",
    name: "Sosis Bakar Mozarella",
    price: 33000,
    category: "Mozarella & Paket",
    notes: "Sosis bakar bumbu gurih · Selimut keju mozarella leleh",
    desc: "Sosis bakar bumbu gurih diselimuti keju mozarella molor kenyal.",
  },
  {
    id: "moz-07",
    name: "Paket 1: Chicken Chashu + Original Tea Ice",
    price: 44000,
    category: "Mozarella & Paket",
    notes: "Nasi Chicken Chashu · Es Teh Asli · Free Naynay Puding",
    desc: "Paket hemat kenyang nasi Chicken Chashu saus spesial + Es Teh + Free Puding.",
    image: "/assets/menu_crops/menu_paket_hemat.jpg",
    badge: "Free Puding",
  },
  {
    id: "moz-08",
    name: "Paket 2: Chicken Katsu + Original Tea Ice",
    price: 39000,
    category: "Mozarella & Paket",
    notes: "Nasi Chicken Katsu · Es Teh Asli · Free Naynay Puding",
    desc: "Paket hemat nasi Chicken Katsu saus gurih + Es Teh + Free Puding.",
    badge: "Free Puding",
  },
  {
    id: "moz-09",
    name: "Paket 3: Special Beef + Lemon Tea Ice",
    price: 49000,
    category: "Mozarella & Paket",
    notes: "Nasi Daging Sapi Spesial · Es Lemon Tea · Free Naynay Puding",
    desc: "Paket komplit nasi Daging Sapi tumis spesial + Es Lemon Tea segar + Free Puding.",
    badge: "Free Puding",
  },

  // 11. SPECIAL CLAVI ICE CREAM
  {
    id: "ice-01",
    name: "Special Clavi Ice Cream (Straw Cheese Cake)",
    price: 20000,
    category: "Ice Cream",
    notes: "Es krim cheesecake stroberi · Remahan biskuit renyah gurih",
    desc: "Es krim spesial dessert dengan cita rasa cheesecake stroberi dan remahan biskuit renyah.",
    image: "/assets/menu_crops/ice_cream_straw_cheesecake.jpg",
    badge: "Specialty Dessert",
  },
  {
    id: "ice-02",
    name: "Special Clavi Ice Cream (Taro Cookies)",
    price: 20000,
    category: "Ice Cream",
    notes: "Es krim taro ungu creamy · Taburan biskuit cookies renyah",
    desc: "Es krim taro ungu creamy bertabur biskuit cookies gurih manis dingin.",
    image: "/assets/menu_crops/ice_cream_taro_cookies.jpg",
  },
  {
    id: "ice-03",
    name: "Special Clavi Ice Cream (Oreo Cookies)",
    price: 20000,
    category: "Ice Cream",
    notes: "Es krim vanila premium · Taburan remah biskuit Oreo gurih",
    desc: "Es krim vanila premium bertabur remah biskuit Oreo gurih renyah.",
  },
  {
    id: "ice-04",
    name: "Ice Cream with Topping (Red Velvet / Matcha)",
    price: 15000,
    category: "Ice Cream",
    notes: "Scoop es krim lembut · Taburan bubuk red velvet atau matcha murni",
    desc: "Scoop es krim lembut dengan taburan bubuk red velvet atau matcha murni.",
    image: "/assets/menu_crops/ice_cream_topping.jpg",
  },
  {
    id: "ice-05",
    name: "Ice Cream with Topping (Chocochip / Marshmellow / Regal)",
    price: 15000,
    category: "Ice Cream",
    notes: "Scoop es krim manis · Pilihan topping: Chocochip / Marshmallow / Regal",
    desc: "Es krim manis dengan taburan chocochip, marshmallow empuk, atau biskuit regal.",
  },

  // 12. PROMO NGOPI PAGI & NGOPI SORE (08.00-10.00 & 15.00-17.00)
  {
    id: "prm-01",
    name: "[Promo] Americano / Long Black",
    price: 12000,
    category: "Promo Ngopi Pagi/Sore",
    notes: "Harga promo jam ngopi pagi (08-10) & sore (15-17)",
    desc: "Harga spesial americano double shot segar di waktu ngopi santai.",
    badge: "12K Promo",
  },
  {
    id: "prm-02",
    name: "[Promo] Coffeelate",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    notes: "Latte lembut harga promo hemat",
    desc: "Harga spesial latte lembut di waktu ngopi santai Clavicula.",
    badge: "15K Promo",
  },
  {
    id: "prm-03",
    name: "[Promo] Kentang Goreng",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    notes: "Camilan kentang stik renyah gurih",
    desc: "Camilan kentang renyah hangat harga promo sore.",
    badge: "15K Snack",
  },
  {
    id: "prm-04",
    name: "[Promo] Pisang Bakar",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    notes: "Pisang bakar hangat manis bertabur meses & keju",
    desc: "Pisang bakar legit bertabur topping harga promo santai.",
    badge: "15K Snack",
  },
  {
    id: "prm-05",
    name: "[Promo] Pancake Oneslice",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    notes: "Satu lembar pancake empuk dengan sirup madu/butter",
    desc: "Pancake empuk hangat harga promo sarapan & camilan sore.",
    badge: "15K Snack",
  },
  {
    id: "prm-06",
    name: "[Promo] Savory Toast Chicken",
    price: 20000,
    category: "Promo Ngopi Pagi/Sore",
    notes: "Roti bakar lapis daging ayam gurih kenyang",
    desc: "Roti bakar lapis daging ayam gurih mengenyangkan.",
    badge: "20K Snack",
  },
];

const CATEGORIES = [
  "Semua",
  "Signature Drink (Anatomi)",
  "Espresso Based",
  "Manual Brew",
  "Mocktail & Blend",
  "Special Bowl & Noodle",
  "Special Clavicula (Steak & Crab)",
  "Dessert & Snack",
  "Non Coffee",
  "Tea Based",
  "Mozarella & Paket",
  "Ice Cream",
  "Promo Ngopi Pagi/Sore",
];

const POSTER_GALLERY = [
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
      
      {/* ─── 1. HERO SECTION (WARM ARCHITECTURAL EDITORIAL HERO) ───── */}
      <section className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 border-b border-chestnut/15 bg-gradient-to-b from-[#FAF8F5] via-[#FAF6F0] to-[#FAF8F5]">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (Brand Narrative & Quick Actions) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/30 bg-vanilla px-3.5 py-1.5 mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-chestnut animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-chestnut font-semibold">
                ROASTERY &amp; KITCHEN // BUKU MENU KAFE RESMI
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-espresso leading-[0.94] mb-4">
              Sensasi Rasa,<br />
              <span className="font-serif italic font-normal text-chestnut">
                Presisi Anatomi Kopi.
              </span>
            </h1>

            {/* Subhead / Lead */}
            <p className="text-base sm:text-lg md:text-xl text-espresso/80 max-w-[50ch] mb-8 font-light leading-relaxed">
              Sebuah ruang perjumpaan antara presisi anatomi tubuh dan seni sangrai kopi nusantara. 
              Dari racikan kopi anatomi tubuh, manual brew single origin, hingga hidangan hangat steak tenderloin dan tomyam segar di kabut pinus Guci. Seluruh harga sudah nett termasuk PPN.
            </p>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#lineup"
                className="inline-flex items-center gap-2 rounded-full bg-chestnut px-7 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-chestnut/90 transition-all active:scale-95"
              >
                Jelajahi 8 Sajian Ikonik ↓
              </a>
              <a
                href="#anatomy-3d"
                className="inline-flex items-center gap-2 rounded-full border border-chestnut/30 bg-white/80 px-6 py-3.5 text-xs sm:text-sm font-medium text-espresso hover:bg-vanilla transition-all active:scale-95 shadow-sm"
              >
                <Sparkles size={14} className="text-chestnut" />
                Lab Anatomi Biji 3D
              </a>
              <button
                onClick={() => setShowPosterGallery(!showPosterGallery)}
                className="inline-flex items-center gap-2 rounded-full border border-chestnut/25 bg-vanilla/60 px-5 py-3.5 text-xs font-mono uppercase tracking-wider text-chestnut hover:bg-vanilla transition-all font-semibold"
              >
                <BookOpen size={14} />
                {showPosterGallery ? "Tutup Lembar PDF" : "Buku Menu Fisik (PDF 12 Lembar)"}
              </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full border-t border-chestnut/15 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">88.5+</span>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 font-mono mt-0.5">
                  SCA Cupping Score
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">2 Outlets</span>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 font-mono mt-0.5">
                  Slawi &amp; Guci Hills
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">120+</span>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 font-mono mt-0.5">
                  Pilihan Menu Resmi
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-espresso">100% Halal</span>
                <span className="text-[11px] uppercase tracking-wider text-chestnut font-mono font-semibold mt-0.5">
                  Kitchen &amp; Coffee
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Arch Window featuring Clavicula Facade & Atmosphere */}
          <div className="lg:col-span-5 relative h-[480px] sm:h-[560px] lg:h-[620px] w-full flex items-center justify-center">
            {/* The Arch Frame */}
            <div className="relative w-full max-w-[420px] h-full rounded-t-[220px] rounded-b-[32px] overflow-hidden shadow-2xl border border-chestnut/25 bg-[#FAF6F0]">
              <Image
                src="/assets/clavicula/places/clavicula-facade-warm-perfect.jpg"
                alt="Clavicula Coffee &amp; Idea Outdoor Rooftop Facade"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

              {/* Floating Top Tag */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-chestnut/20 shadow-md whitespace-nowrap">
                <span className="text-[10px] font-mono tracking-wider uppercase text-espresso font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-chestnut"></span>
                  COFFEE &amp; IDEA // EST. SLAWI
                </span>
              </div>

              {/* Floating Center Specialty Badge */}
              <div className="absolute bottom-24 right-6 bg-white/95 backdrop-blur-md border border-chestnut/20 rounded-2xl p-3 shadow-lg max-w-[210px]">
                <span className="text-[9px] font-mono uppercase tracking-wider text-chestnut font-bold block mb-0.5">
                  SIGNATURE DRINK
                </span>
                <p className="font-serif italic font-bold text-xs text-espresso">
                  Manubrium &amp; Scapula
                </p>
                <p className="text-[10px] text-espresso/60 font-sans mt-0.5">
                  Anatomical crafted series
                </p>
              </div>

              {/* Bottom Pill Indicator */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-espresso/85 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center justify-between text-white text-[11px] font-mono">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    GUCI HILLS &bull; HIGH MOUNTAIN MIST
                  </span>
                  <span className="text-white/60 text-[10px]">100% ARABICA</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. MARQUEE STRIP (WARM ESPRESSO & CARAMEL ACCENTS) ───── */}
      <section className="bg-espresso text-[#F5EBE1] py-3.5 md:py-4 overflow-hidden border-y border-chestnut/25 select-none font-display font-medium text-xs md:text-sm tracking-widest shadow-sm">
        <div className="animate-ember-marquee flex items-center gap-8 whitespace-nowrap uppercase">
          <span>ANATOMICAL COFFEE</span>
          <span className="text-caramel">✦</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="text-caramel">✦</span>
          <span>FRESH ROASTED IN-HOUSE</span>
          <span className="text-caramel">✦</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="text-caramel">✦</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="text-caramel">✦</span>
          <span>SLOW BAR SANCTUARY</span>
          <span className="text-caramel">✦</span>
          <span>STEAK &amp; TOMYAM WARMTH</span>
          <span className="text-caramel">✦</span>
          <span>MANUAL BREW NUSANTARA</span>
          <span className="text-caramel">✦</span>
          <span>ALL PRICES NETT (INCL. PPN)</span>
          <span className="text-caramel">✦</span>

          {/* Repeat Loop */}
          <span>ANATOMICAL COFFEE</span>
          <span className="text-caramel">✦</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="text-caramel">✦</span>
          <span>FRESH ROASTED IN-HOUSE</span>
          <span className="text-caramel">✦</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="text-caramel">✦</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="text-caramel">✦</span>
          <span>SLOW BAR SANCTUARY</span>
          <span className="text-caramel">✦</span>
          <span>STEAK &amp; TOMYAM WARMTH</span>
          <span className="text-caramel">✦</span>
          <span>MANUAL BREW NUSANTARA</span>
          <span className="text-caramel">✦</span>
          <span>ALL PRICES NETT (INCL. PPN)</span>
          <span className="text-caramel">✦</span>
        </div>
      </section>

      {/* ─── 3. MANIFESTO PHILOSOPHY SECTION (WARM LINEN) ────────────── */}
      <section className="py-20 md:py-28 bg-linen border-b border-chestnut/15">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-4">
            WHY WE DO THIS // FILOSOFI ANATOMI
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-espresso leading-[1.08] max-w-4xl tracking-tight">
            Kami percaya kopi bukan sekadar tegukan yang berlalu cepat. 
            Seperti clavicula yang menghubungkan kepala, detak dada, dan pergerakan tangan—setiap 
            seduhan kami hadirkan untuk{" "}
            <span className="font-serif italic font-normal text-chestnut">
              menyatukan ide, percakapan hangat, dan rasa yang jujur.
            </span>
          </h2>
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
                      Rp {(sig.price / 1000).toLocaleString("id-ID")}.000
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

      {/* ─── 5. INTERACTIVE 3D ANATOMY LAB (OPTION C: 3D COFFEE BEAN EXPLORATION) ─── */}
      <section id="anatomy-3d" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-chestnut/15 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-2">
              LABORATORIUM ANATOMI &amp; ROASTERY // 3D EXPLORATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-espresso">
              Eksplorasi Anatomi Biji Kopi 3D
            </h2>
            <p className="mt-3 text-sm md:text-base text-espresso/75 font-serif italic">
              Inspeksi detail rekahan anatomi tulang selangka (fissure), kepadatan mikrolot pegunungan, dan perubahan warna profil sangrai in-house Clavicula secara interaktif 360 derajat.
            </p>
          </div>

          <InteractiveCoffeeBean3D />
        </div>
      </section>

      {/* ─── 6. SANCTUARY OUTLETS SHOWCASE (REAL CLAVICULA PLACES) ─────── */}
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
                      Untuk menu anatomi ber-foam seperti Subclavius atau Manubrium, sesap dahulu busa halusnya sebelum diaduk agar seluruh lapisan rasa terasa utuh.
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
                88.5+
              </span>
              <p className="mt-2 text-xs md:text-sm text-espresso/60 font-mono uppercase tracking-wider">
                SCA Cupping Score Arabica
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
                        Rp {(item.price / 1000).toLocaleString("id-ID")}.000
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
                      Rp {(item.price / 1000).toLocaleString("id-ID")}.000
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
                  href="https://wa.me/6287733444426?text=Halo%20Clavicula%2C%20saya%20mau%20tanya%20seputar%20menu%20dan%20kunjungan"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all"
                >
                  Hubungi Barista via WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
