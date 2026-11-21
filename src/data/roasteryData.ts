export type RoastBean = {
  sku: string;
  name: string;
  shortName: string;
  category: "Blend" | "Single Origin" | "Robusta";
  roastLevel: "Light" | "Light-to-Medium" | "Medium" | "Medium-to-Dark" | "Dark";
  origin: string;
  altitude: string;
  process: string;
  tastingNotes: string[];
  description: string;
  brewRecommendations: string[];
  pairedAnatomyMenu?: string;
  image: string;
  flavorProfile: {
    body: number; // 1-5
    acidity: number; // 1-5
    sweetness: number; // 1-5
    aroma: number; // 1-5
    aftertaste: number; // 1-5
  };
  prices: {
    "200g": { price: number; savings: number; badge?: string };
    "500g": { price: number; savings: number; badge?: string };
    "1kg": { price: number; savings: number; badge?: string };
  };
  stockStatus: {
    slawi: "Ready Stock" | "Stok Menipis" | "Habis";
    guci: "Ready Stock" | "Stok Menipis" | "Habis";
  };
  appComparisonPrice: {
    "200g": number;
    "500g": number;
    "1kg": number;
  };
};

export type OneLiterBottle = {
  id: string;
  name: string;
  pairedAnatomy: string;
  flavorNote: string;
  servingCount: string;
  price: number;
  cupEquivalentPrice: number;
  savings: number;
  image: string;
  description: string;
  appPrice: number;
  badge?: string;
};

export type AnatomyDrink = {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  flavorNotes: string;
  description: string;
  isCoffee: boolean;
  badge?: string;
};

export type PromoItem = {
  id: string;
  name: string;
  promoPrice: number;
  normalPrice: number;
  category: "Kopi Promo" | "Cemilan Promo";
  timeWindow: string;
  description: string;
};

export type PopularFood = {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  description: string;
  badge?: string;
};

/* ─── GRIND OPTIONS (FAKTUAL REAL-CASE) ────────────────────────── */
export const GRIND_OPTIONS = [
  { id: "whole",  label: "Biji Utuh / Whole Bean (Rekomendasi)", short: "Whole Bean", desc: "Digiling fresh saat Anda tiba di kasir" },
  { id: "coarse", label: "Giling Kasar (French Press / Cold Brew)", short: "Kasar", desc: "French Press / Cold Brew" },
  { id: "medium", label: "Giling Sedang (V60 / Drip)", short: "Sedang", desc: "V60 / Kalita / Filter" },
  { id: "fine",   label: "Giling Halus (Tubruk / Mokapot)", short: "Halus", desc: "Tubruk / Mokapot / Espresso" },
];

/* ─── TAB 1: HERO & ROASTERY BEANS ─────────────────────────────── */
export const ROASTERY_BEANS: RoastBean[] = [
  {
    sku: "RB-01",
    name: "Clavicula Signature House Blend (80% Arabica : 20% Robusta)",
    shortName: "Signature House Blend 80:20",
    category: "Blend",
    roastLevel: "Medium-to-Dark",
    origin: "Sindoro Temanggung & Java Robusta Batang",
    altitude: "1.200 – 1.450 mdpl",
    process: "Washed & Natural",
    tastingNotes: ["Dark Chocolate", "Roasted Almond", "Brown Sugar", "Thick Crema"],
    description:
      "Biji kopi resmi yang digunakan di bar espresso Clavicula Coffee. Formulasi presisi 80% Arabika manis dataran tinggi dan 20% Robusta petik merah untuk menghadirkan bodi tebal, crema keemasan, dan aroma cokelat kacang sempurna saat dipadukan dengan susu segar.",
    brewRecommendations: ["Espresso Machine", "Moka Pot", "Vietnam Drip", "Kopi Susu Harian"],
    pairedAnatomyMenu: "Manubrium & Acromion",
    image: "/assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg",
    flavorProfile: {
      body: 5,
      acidity: 2,
      sweetness: 4,
      aroma: 5,
      aftertaste: 4,
    },
    prices: {
      "200g": { price: 65000, savings: 0 },
      "500g": { price: 145000, savings: 17500, badge: "Best Value" },
      "1kg":  { price: 270000, savings: 55000, badge: "Hemat Rp55.000 • Terlaris" },
    },
    stockStatus: {
      slawi: "Ready Stock",
      guci: "Ready Stock",
    },
    appComparisonPrice: {
      "200g": 72000,
      "500g": 165000,
      "1kg": 315000,
    },
  },
  {
    sku: "RB-02",
    name: "Arabica Lokal Selection (Biji V60 Bar)",
    shortName: "Arabica Lokal V60",
    category: "Single Origin",
    roastLevel: "Light-to-Medium",
    origin: "Sindoro & Sumbing Highland, Jawa Tengah",
    altitude: "1.450 – 1.600 mdpl",
    process: "Yellow Honey & Anaerobic Natural",
    tastingNotes: ["Floral Jasmine", "Ripe Peach", "Apricot", "Honey Sweetness"],
    description:
      "Biji kopi arabika Nusantara pilihan yang diseduh harian di slow bar Clavicula. Disangrai dengan profil sangrai light-to-medium untuk menonjolkan aroma melati, keasaman buah segar, dan manis madu alami yang bersih.",
    brewRecommendations: ["Hario V60", "Aeropress", "Kalita Wave", "Japanese Iced"],
    pairedAnatomyMenu: "Manual Brew Bar",
    image: "/assets/clavicula/roastery/rb-02-arabica-lokal-v60.jpg",
    flavorProfile: {
      body: 3,
      acidity: 4,
      sweetness: 5,
      aroma: 5,
      aftertaste: 4,
    },
    prices: {
      "200g": { price: 85000, savings: 0 },
      "500g": { price: 195000, savings: 17500, badge: "Hemat Rp17.500" },
      "1kg":  { price: 370000, savings: 55000, badge: "Hemat Rp55.000" },
    },
    stockStatus: {
      slawi: "Ready Stock",
      guci: "Ready Stock",
    },
    appComparisonPrice: {
      "200g": 95000,
      "500g": 220000,
      "1kg": 420000,
    },
  },
  {
    sku: "RB-03",
    name: "Arabica Seasonal Import (Biji V60 Luar)",
    shortName: "Arabica Seasonal Import",
    category: "Single Origin",
    roastLevel: "Light",
    origin: "African & Central America Seasonal Lot",
    altitude: "1.750 – 2.050 mdpl",
    process: "Washed / Natural Heirloom",
    tastingNotes: ["Wild Berries", "Bergamot", "Jasmine Bloom", "Silky Tea Body"],
    description:
      "Kurasi biji kopi impor pilihan barista yang berganti berkala sesuai panen terbaik dunia. Sangat kompleks, kaya aroma bunga langka, dan berkarakter rasa menyerupai teh Earl Grey eksotis.",
    brewRecommendations: ["Hario V60", "Origami", "Cold Drip Tasting"],
    pairedAnatomyMenu: "Reserve Slow Bar",
    image: "/assets/clavicula/roastery/rb-03-arabica-impor-v60-luar.jpg",
    flavorProfile: {
      body: 2,
      acidity: 5,
      sweetness: 5,
      aroma: 5,
      aftertaste: 5,
    },
    prices: {
      "200g": { price: 120000, savings: 0 },
      "500g": { price: 280000, savings: 20000, badge: "Hemat Rp20.000" },
      "1kg":  { price: 520000, savings: 80000, badge: "Hemat Rp80.000" },
    },
    stockStatus: {
      slawi: "Ready Stock",
      guci: "Stok Menipis",
    },
    appComparisonPrice: {
      "200g": 135000,
      "500g": 315000,
      "1kg": 580000,
    },
  },
  {
    sku: "RB-04",
    name: "Clavicula Fine Robusta (Biji Vietnam Drip / Tubruk Bar)",
    shortName: "Fine Robusta Selection",
    category: "Robusta",
    roastLevel: "Medium-to-Dark",
    origin: "Lereng Gunung Slamet & Batang",
    altitude: "750 – 950 mdpl",
    process: "Natural Fermented",
    tastingNotes: ["Dark Cocoa 85%", "Roasted Hazelnut", "Heavy Body", "Zero Sour"],
    description:
      "Biji robusta petik merah 100% sortasi grade 1. Bodi mantap, pekat, rasa pahit cokelat mewah tanpa getir tajam dan hampir tanpa asam. Pilihan utama untuk kopi tubruk tradisional dan Vietnam Drip kental.",
    brewRecommendations: ["Kopi Tubruk", "Vietnam Drip", "Kopi Susu Kental"],
    pairedAnatomyMenu: "Tubruk & Kopi Tradisional",
    image: "/assets/clavicula/roastery/rb-04-fine-robusta-selection.jpg",
    flavorProfile: {
      body: 5,
      acidity: 1,
      sweetness: 3,
      aroma: 4,
      aftertaste: 5,
    },
    prices: {
      "200g": { price: 55000, savings: 0 },
      "500g": { price: 125000, savings: 12500, badge: "Hemat Rp12.500" },
      "1kg":  { price: 230000, savings: 45000, badge: "Hemat Rp45.000" },
    },
    stockStatus: {
      slawi: "Ready Stock",
      guci: "Ready Stock",
    },
    appComparisonPrice: {
      "200g": 62000,
      "500g": 140000,
      "1kg": 260000,
    },
  },
];

/* ─── TAB 1: KOPI BOTOL 1 LITER (9 VARIAN RESMI) ──────────────── */
export const ONE_LITER_BOTTLES: OneLiterBottle[] = [
  {
    id: "bot-manubrium",
    name: "Manubrium 1 Liter",
    pairedAnatomy: "Signature Kopi Susu",
    flavorNote: "Kopi Susu Signature Creamy Caramel & Aren Khas",
    servingCount: "5 Gelas Siap Minum",
    price: 125000,
    cupEquivalentPrice: 150000,
    savings: 25000,
    image: "/images/manubrium.jpg",
    description: "Kopi susu signature nomor 1 Clavicula. Karakter karamel lembut, aren legit khas, dan espresso mantap. Tahan 5-7 hari di kulkas.",
    appPrice: 145000,
    badge: "Best Seller No. 1",
  },
  {
    id: "bot-acromion",
    name: "Acromion 1 Liter",
    pairedAnatomy: "Signature Regal Coffee",
    flavorNote: "Espresso, Susu Segar & Remahan Regal Gurih",
    servingCount: "5 Gelas Siap Minum",
    price: 124000,
    cupEquivalentPrice: 155000,
    savings: 31000,
    image: "/images/acromion.jpg",
    description: "Perpaduan unik espresso aromatik dengan susu gurih dan biskuit regal. Creamy, kaya tekstur, dan bikin nagih.",
    appPrice: 144000,
    badge: "Favorit Pelanggan",
  },
  {
    id: "bot-choco-latte",
    name: "Choco Latte 1 Liter",
    pairedAnatomy: "Chocolate & Coffee Fusion",
    flavorNote: "Cokelat Pekat & Espresso Creamy",
    servingCount: "5 Gelas Siap Minum",
    price: 118000,
    cupEquivalentPrice: 145000,
    savings: 27000,
    image: "/images/choco-latte.jpg",
    description: "Kombinasi cokelat artisanal pekat dengan susu segar creamy. Manis seimbang dengan sensasi moka mewah.",
    appPrice: 138000,
  },
  {
    id: "bot-flavour-latte",
    name: "Flavour Latte 1 Liter",
    pairedAnatomy: "Artisanal Latte",
    flavorNote: "Pilihan Sirup: Caramel / Hazelnut / Vanilla",
    servingCount: "5 Gelas Siap Minum",
    price: 115000,
    cupEquivalentPrice: 140000,
    savings: 25000,
    image: "/images/flavour-latte.jpg",
    description: "Latte lembut dengan sirup pilihan (bisa request Caramel, Hazelnut, atau Vanilla di catatan pesanan).",
    appPrice: 135000,
  },
  {
    id: "bot-cokelat",
    name: "Cokelat 1 Liter",
    pairedAnatomy: "Non-Coffee Signature",
    flavorNote: "Pure Chocolate & Fresh Milk",
    servingCount: "5 Gelas Siap Minum",
    price: 114000,
    cupEquivalentPrice: 135000,
    savings: 21000,
    image: "/images/cokelat.jpg",
    description: "Minuman cokelat murni non-kopi untuk semua usia. Sangat kental, legit, dan nikmat disajikan dingin dengan es batu.",
    appPrice: 132000,
  },
  {
    id: "bot-caramel-machiato",
    name: "Caramel Machiato 1 Liter",
    pairedAnatomy: "Layered Coffee",
    flavorNote: "Espresso, Susu Vanila & Drizzle Karamel Legit",
    servingCount: "5 Gelas Siap Minum",
    price: 102000,
    cupEquivalentPrice: 130000,
    savings: 28000,
    image: "/images/caramel-machiato.jpg",
    description: "Kombinasi harum vanila segar, susu lembut, dan sirup karamel bakar berpadu dengan espresso bold.",
    appPrice: 122000,
  },
  {
    id: "bot-coffee-latte",
    name: "Coffee Latte 1 Liter",
    pairedAnatomy: "Classic Espresso & Milk",
    flavorNote: "Double Shot Espresso & Susu Segar Murni",
    servingCount: "5 Gelas Siap Minum",
    price: 96000,
    cupEquivalentPrice: 125000,
    savings: 29000,
    image: "/images/coffee-latte.jpg",
    description: "Coffee latte murni tanpa gula berlebih. Cocok untuk Anda yang suka rasa kopi bersih dan lembut.",
    appPrice: 115000,
  },
  {
    id: "bot-sternum",
    name: "Sternum 1 Liter",
    pairedAnatomy: "Signature Cold Brew Karamel",
    flavorNote: "Kopi Susu Caramel Creamy Dingin",
    servingCount: "5 Gelas Siap Minum",
    price: 83000,
    cupEquivalentPrice: 115000,
    savings: 32000,
    image: "/images/sternum.jpg",
    description: "Kopi susu dengan cita rasa karamel khas dipadu krim lembut. Harga paling hemat untuk stok keluarga.",
    appPrice: 100000,
    badge: "Super Hemat",
  },
  {
    id: "bot-kopi-susu-ori",
    name: "Kopi Susu Ori 1 Liter",
    pairedAnatomy: "Everyday Coffee",
    flavorNote: "Kopi Susu Tradisional Manis Pas",
    servingCount: "5 Gelas Siap Minum",
    price: 83000,
    cupEquivalentPrice: 110000,
    savings: 27000,
    image: "/images/kopi-susu-ori.jpg",
    description: "Resep kopi susu original Clavicula dengan harga ekonomis. Simpan di chiller untuk teman kerja seharian.",
    appPrice: 98000,
    badge: "Super Hemat",
  },
];

/* ─── TAB 2: SIGNATURE ANATOMY SERIES (12 VARIAN RESMI) ────────── */
export const ANATOMY_DRINKS: AnatomyDrink[] = [
  {
    id: "anat-manubrium",
    name: "Manubrium",
    price: 33000,
    image: "/images/manubrium.jpg",
    tag: "Best Seller • Kopi Susu Gula Aren & Krim",
    flavorNotes: "Karamel gula aren legit, layer krim lembut, double shot espresso bold",
    description: "Menu signature nomor satu di Clavicula. Mengambil nama hulu tulang dada, rasa kopi susu gula aren yang khas seimbang manis dan creamy.",
    isCoffee: true,
    badge: "Best Seller No. 1",
  },
  {
    id: "anat-acromion",
    name: "Acromion",
    price: 32000,
    image: "/images/acromion.jpg",
    tag: "Caramelized Milk & Gurih Biskuit Regal",
    flavorNotes: "Espresso mantap, caramelized milk, gurih remahan biskuit regal lembut",
    description: "Mengadopsi nama tonjolan tulang bahu tertinggi, menghadirkan paduan espresso dengan sensasi biskuit regal gurih renyah.",
    isCoffee: true,
    badge: "Signature",
  },
  {
    id: "anat-sternum",
    name: "Sternum",
    price: 32000,
    image: "/images/sternum.jpg",
    tag: "Caramel Cold Brew & Whip Cream",
    flavorNotes: "Cold brew arabika, saus karamel leleh, manis seimbang creamy",
    description: "Mengambil filosofi tulang dada tengah sebagai perisai, kopi susu dingin dengan cita rasa karamel khas dan lembutnya krim.",
    isCoffee: true,
    badge: "Caramel Brew",
  },
  {
    id: "anat-scapula",
    name: "Scapula",
    price: 32000,
    image: "/images/scapula.jpg",
    tag: "Nusantara Heritage • Pandan Klepon & Kelapa",
    flavorNotes: "Pandan klepon wangi, santan kelapa gurih, double espresso arabika",
    description: "Filosofi tulang belikat penopang tubuh. Kopi susu kekinian dengan cita rasa klepon pandan yang harum dan unik di lidah.",
    isCoffee: true,
    badge: "Heritage",
  },
  {
    id: "anat-costa",
    name: "Costa",
    price: 38000,
    price_val: 38000,
    image: "/images/costa.jpg",
    tag: "Nutella Hazelnut & Vanilla Ice Cream",
    flavorNotes: "Nutella legit berlimpah, espresso aromatik, scoop ice cream vanilla lembut",
    description: "Tulang rusuk pelindung rasa. Kombinasi manis gurih Nutella berpadu double espresso arabika dan es krim vanila dingin.",
    isCoffee: true,
    badge: "Specialty",
  },
  {
    id: "anat-trapezius",
    name: "Trapezius",
    price: 32000,
    image: "/images/trapezius.jpg",
    tag: "Fruit & Cream Fusion • Fresh Strawberry Swirl",
    flavorNotes: "Jus stroberi kental segar, krim lembut dingin, ekstrak kopi eksotis",
    description: "Otot trapezius leher dan punggung. Kesegaran unik stroberi berpadu krim lembut dan susu segar yang menenangkan.",
    isCoffee: true,
    badge: "Refreshing",
  },
  {
    id: "anat-vomer",
    name: "Vomer",
    price: 28000,
    image: "/images/vomer.jpg",
    tag: "Citrus Cooler • Cold Brew, Lemon & Mint",
    flavorNotes: "Cold brew aromatik, perasan lemon sitrun segar, daun mint sejuk",
    description: "Tulang rongga hidung. Mocktail kopi aromatik dengan aroma sitrus tajam yang seketika melegakan tenggorokan di siang hari terik.",
    isCoffee: true,
    badge: "Citrus Cooler",
  },
  {
    id: "anat-brachialis",
    name: "Brachialis",
    price: 28000,
    image: "/images/brachialis.jpg",
    tag: "Coffee Mocktail • Kiwi Segar & Banana",
    flavorNotes: "Ekstrak espresso dingin, potongan buah kiwi segar, sentuhan pisang lembut",
    description: "Otot lengan pembawa tenaga. Racikan mocktail eksotis menyegarkan dengan punch kopi dingin dan buah kiwi asli.",
    isCoffee: true,
    badge: "Botanical",
  },
  {
    id: "anat-ulnaris",
    name: "Ulnaris",
    price: 28000,
    image: "/images/ulnaris.jpg",
    tag: "Anatomy Mocktail • Floral Botanic & Citrus Sparkling",
    flavorNotes: "Cold brew aromatik, sentuhan floral botanic, soda effervescent segar",
    description: "Tulang hasta lengan bawah. Mocktail jernih berkarakter dengan sensasi soda dingin melegakan dahaga.",
    isCoffee: true,
  },
  {
    id: "anat-radius",
    name: "Radius",
    price: 28000,
    image: "/images/radius.jpg",
    tag: "Anatomy Mocktail • Tropical Fruit Twist",
    flavorNotes: "Ekstrak kopi dingin, sari buah tropis, soda dingin effervescent",
    description: "Tulang pengumpil lengan bawah. Sensasi minuman buah tropis berpadu aroma kopi dingin yang renyah dan segar.",
    isCoffee: true,
  },
  {
    id: "anat-humerus",
    name: "Original Tea Humerus",
    price: 16000,
    image: "/images/original-tea-humerus.jpg",
    tag: "Teh Melati Otentik Slawi",
    flavorNotes: "Daun teh melati pilihan, aroma wangi alami menenangkan, manis pas",
    description: "Tulang lengan atas yang kokoh. Seduhan teh melati tradisional khas Slawi yang harum semerbak, jernih, dan menyegarkan jiwa.",
    isCoffee: false,
    badge: "Authentic Tea",
  },
].map((item) => ({
  ...item,
  price: typeof item.price === "number" ? item.price : 38000,
}));

/* ─── TAB 3: PROMO JAM NGOPI SLAWI ─────────────────────────────── */
export const PROMO_HOURS_ITEMS: PromoItem[] = [
  {
    id: "promo-americano",
    name: "Americano Slawi",
    promoPrice: 12000,
    normalPrice: 22000,
    category: "Kopi Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "Espresso ganda seduh air murni dingin/panas, bodi bersih tanpa ampas.",
  },
  {
    id: "promo-longblack",
    name: "Long Black Slawi",
    promoPrice: 12000,
    normalPrice: 22000,
    category: "Kopi Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "Espresso dituangkan di atas air panas untuk crema tebal dan aroma maksimal.",
  },
  {
    id: "promo-latte",
    name: "Coffee Latte Slawi",
    promoPrice: 15000,
    normalPrice: 25000,
    category: "Kopi Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "Kopi susu lembut seimbang untuk temani meeting pagi atau rehat sore.",
  },
  {
    id: "promo-kentang",
    name: "Kentang Goreng Krispi",
    promoPrice: 15000,
    normalPrice: 22000,
    category: "Cemilan Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "French fries gurih renyah dengan bumbu tabur spesial dan saus cocol.",
  },
  {
    id: "promo-pisang",
    name: "Pisang Bakar Caramel",
    promoPrice: 15000,
    normalPrice: 20000,
    category: "Cemilan Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "Pisang kepok manis dibakar harum dengan taburan keju dan meses cokelat.",
  },
  {
    id: "promo-pancake",
    name: "Pancake One Slice",
    promoPrice: 15000,
    normalPrice: 20000,
    category: "Cemilan Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "Pancake lembut bertekstur fluffy dengan sirup maple dan butter gurih.",
  },
  {
    id: "promo-toast",
    name: "Savory Toast Chicken",
    promoPrice: 20000,
    normalPrice: 27000,
    category: "Cemilan Promo",
    timeWindow: "Pagi 08.00–10.00 & Sore 15.00–17.00",
    description: "Roti panggang isi ayam cincang berbumbu gurih, keju dan saus creamy.",
  },
];

/* ─── TAB 3: MAKANAN POPULER KEDAI ─────────────────────────────── */
export const POPULAR_FOODS: PopularFood[] = [
  {
    id: "food-mentai-rice",
    name: "Mentai Rice",
    price: 35000,
    image: "/images/mentai-rice.jpg",
    tag: "Nasi Pulen Jepang, Daging Gurih & Saus Mentai Bakar",
    description: "Nasi hangat ditutupi olahan daging gurih dan siraman saus mentai bakar beraroma smoky menggugah selera.",
    badge: "Best Seller Kitchen",
  },
  {
    id: "food-nasgor",
    name: "Javanese Fried Rice",
    price: 23000,
    image: "/images/javanese-fried-rice.jpg",
    tag: "Nasi Goreng Resep Spesial Rempah Jawa",
    description: "Nasi goreng bumbu rempah khas tradisional Jawa beraroma wajan panas smoky gurih manis pas.",
    badge: "Kenyang Mantap",
  },
  {
    id: "food-katsu",
    name: "Chicken Katsu With Sauce",
    price: 28000,
    image: "/images/chicken-katsu-with-sauce.jpg",
    tag: "Ayam Fillet Krispi Saus Katsu Gurih",
    description: "Ayam fillet katsu goreng renyah keemasan disiram saus gurih spesial di atas semangkuk nasi pulen.",
    badge: "Best Value",
  },
  {
    id: "food-mie-godog",
    name: "Javanese Fried Noodles",
    price: 23000,
    image: "/images/javanese-fried-noodles.jpg",
    tag: "Mie Telur Kenyal & Bumbu Kecap Rempah",
    description: "Mie goreng gurih nikmat dimasak dengan api besar bersama sayur segar, telur, dan bumbu rempah autentik.",
  },
  {
    id: "food-dimsum",
    name: "Dimsum Mentai",
    price: 28000,
    image: "/images/dimsum-mentai.jpg",
    tag: "Dimsum Kukus Lembut & Saus Mentai Torched",
    description: "Dimsum olahan ayam dan udang kenyal gurih dibalut lelehan saus mentai gurih beraroma bakar torched.",
    badge: "Favorit Snack",
  },
  {
    id: "food-yakitori",
    name: "Yakitori Clavicula",
    price: 28000,
    image: "/images/yakitori.jpg",
    tag: "Sate Ayam Fillet Empuk Saus Tare Panggang",
    description: "Sate ayam khas Jepang dengan potongan daging paha empuk berlumur saus tare gurih manis dipanggang merata.",
    badge: "Japanese Pick",
  },
];

/* ─── ESTIMASI WAKTU PICKUP AMBIL CEPAT ────────────────────────── */
export const PICKUP_TIME_OPTIONS = [
  { id: "15-min", label: "15 Menit Lagi", desc: "Langsung disiapkan barista fresh" },
  { id: "30-min", label: "30 Menit Lagi", desc: "Tiba saat perjalanan santai" },
  { id: "60-min", label: "1 Jam Lagi", desc: "Ambil pas jam istirahat / pulang" },
  { id: "custom", label: "Pilih Jam Hari Ini (08.00 - 22.30 WIB)", desc: "Tentukan jam kedatangan spesifik Anda" },
];
