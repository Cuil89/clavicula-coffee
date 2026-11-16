"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Eye } from "lucide-react";
import { useUI } from "@/components/UIProvider";

type MenuItem = {
  name: string;
  price: number;
  category: string;
  desc: string;
  image: string;
  badge?: string;
};

const categories = [
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
];

const menuItems: MenuItem[] = [
  // ─── 1. SIGNATURE DRINK (ANATOMI) ───────────────────────────
  {
    name: "Manubrium",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    desc: "Layer krim vanila lembut berpadu double espresso bold, sensasi rasa manis creamy yang seimbang.",
    image: "/assets/clavicula/drinks/manubrium.webp",
    badge: "Best Seller",
  },
  {
    name: "Acromion",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    desc: "Kombinasi espresso aromatik dengan susu terkaramelisasi dan sentuhan biskuit regal lembut.",
    image: "/assets/clavicula/drinks/acromion.webp",
    badge: "Must Try",
  },
  {
    name: "Costa",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    desc: "Perpaduan legit nutella, double espresso arabika, dan scoop es krim vanila lembut.",
    image: "/assets/clavicula/drinks/costa.webp",
    badge: "Specialty",
  },
  {
    name: "Trapezius",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    desc: "Perpaduan swirl buah stroberi segar dengan krim lembut dan sentuhan kopi eksotis.",
    image: "/assets/clavicula/drinks/trapezius.webp",
  },
  {
    name: "Sternum",
    price: 30000,
    category: "Signature Drink (Anatomi)",
    desc: "Kopi dingin dengan saus karamel leleh berlapis es, manis pas tanpa menenggelamkan rasa kopi.",
    image: "/assets/clavicula/drinks/sternum.webp",
  },
  {
    name: "Scapula",
    price: 29000,
    category: "Signature Drink (Anatomi)",
    desc: "Kopi susu klepon pandan kelapa harum khas Nusantara, gurih legit dan berkarakter.",
    image: "/assets/clavicula/drinks/scapula.webp",
  },
  {
    name: "Subclavius",
    price: 31000,
    category: "Signature Drink (Anatomi)",
    desc: "Mahkota foam lembut berpadu espresso kaya rasa dengan sensasi rasa roasted yang memikat.",
    image: "/assets/extracted/signature_subclavius.jpg",
    badge: "Signature",
  },

  // ─── 2. ESPRESSO BASED ──────────────────────────────────────
  {
    name: "Es Kopi Susu Clavicula",
    price: 21000,
    category: "Espresso Based",
    desc: "Espresso arabika blend dipadu susu creamy dan gula aren organik khas racikan Clavicula.",
    image: "/assets/clavicula/drinks/kopi-susu-ori.webp",
    badge: "Favorite",
  },
  {
    name: "Flavour Americano",
    price: 20000,
    category: "Espresso Based",
    desc: "Americano dingin segar dengan sentuhan sirup buah pilihan (Berry / Peach / Lemon).",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
  },
  {
    name: "Affogato",
    price: 21000,
    category: "Espresso Based",
    desc: "Satu scoop es krim vanila lembut disiram single shot double espresso panas yang pekat.",
    image: "/assets/clavicula/drinks/affogato.webp",
  },
  {
    name: "Caramel Machiato",
    price: 26000,
    category: "Espresso Based",
    desc: "Lapisan susu vanila lembut, espresso bold, dan drizzle karamel leleh di atasnya.",
    image: "/assets/clavicula/drinks/caramel-macchiato.webp",
  },
  {
    name: "Lemonade Coffee",
    price: 26000,
    category: "Espresso Based",
    desc: "Double espresso segar berpadu sari lemon asli dan soda dingin, super refreshing.",
    image: "/assets/clavicula/drinks/coffee-lemonade.webp",
  },
  {
    name: "Flavour Latte",
    price: 28000,
    category: "Espresso Based",
    desc: "Caffe latte lembut dengan pilihan sirup artisan (Hazelnut, Vanilla, Caramel, atau Pandan).",
    image: "/assets/clavicula/drinks/flavour-latte.webp",
  },
  {
    name: "Cookies Coffee",
    price: 30000,
    category: "Espresso Based",
    desc: "Espresso susu creamy dengan taburan remahan cookies renyah dan saus cokelat manis.",
    image: "/assets/clavicula/drinks/cookies-coffee.webp",
  },
  {
    name: "Matcha Coffee",
    price: 32000,
    category: "Espresso Based",
    desc: "Gradasi matcha murni berkualitas dipadu susu segar dan double espresso arabika.",
    image: "/assets/clavicula/drinks/matcha-coffee-latte.webp",
    badge: "Popular",
  },

  // ─── 3. MANUAL BREW SELECTION ──────────────────────────────
  {
    name: "V60 Single Origin Nusantara",
    price: 26000,
    category: "Manual Brew",
    desc: "Seduhan presisi V60 dengan beans lokal pilihan: Aceh Gayo, Sindoro Honey, Ijen Anaerob, atau Flores Bajawa.",
    image: "/assets/clavicula/places/slow-bar-v60-clavicula.jpg",
    badge: "Slow Bar",
  },
  {
    name: "V60 International Selection",
    price: 36000,
    category: "Manual Brew",
    desc: "Biji kopi impor pilihan asal Ethiopia Yirgacheffe, Colombia Supremo, atau Kenya Nyeri diseduh pour-over.",
    image: "/assets/clavicula/roastery/rb-03-arabica-impor-v60-luar.jpg",
    badge: "Curated Beans",
  },
  {
    name: "Clavicula House Blend Brew",
    price: 24000,
    category: "Manual Brew",
    desc: "Signature house blend sangrai sendiri di Roastery Lab Slawi dengan profil manis karamel & kacang.",
    image: "/assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg",
  },
  {
    name: "Fine Robusta Selection Brew",
    price: 18000,
    category: "Manual Brew",
    desc: "Biji robusta petik merah berkualitas diseduh tradisional mantap dengan aroma tebal dan body kuat.",
    image: "/assets/clavicula/roastery/rb-04-fine-robusta-selection.jpg",
  },

  // ─── 4. MOCKTAIL & BLEND ───────────────────────────────────
  {
    name: "Brachialis",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Cold brew aromatik dipadukan ekstrak jeruk sunkist, sirup botanikal, dan soda dingin berbuih.",
    image: "/assets/menu_crops/mocktail_brachialis.jpg",
    badge: "Signature Mocktail",
  },
  {
    name: "Ulnaris",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Mocktail eksotis ungu-kebiruan dari bunga telang murni berpadu sari lemon dan rempah segar.",
    image: "/assets/menu_crops/mocktail_ulnaris.jpg",
  },
  {
    name: "Radius",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Sensasi buah tropis nanas dan markisa segar berpadu cold brew dan foam aromatik lembut.",
    image: "/assets/menu_crops/mocktail_radius.jpg",
  },
  {
    name: "Chocobanana Blend",
    price: 31000,
    category: "Mocktail & Blend",
    desc: "Blend cokelat premium dan pisang segar matang dengan es batu halus dan drizzle saus karamel.",
    image: "/assets/menu_crops/mocktail_chocobanana.jpg",
  },
  {
    name: "Costa Blend",
    price: 33000,
    category: "Mocktail & Blend",
    desc: "Frappe creamy nutella dan kopi susu dengan whipped cream lembut serta topping saus cokelat.",
    image: "/assets/menu_crops/mocktail_costa_blend.jpg",
  },
  {
    name: "Pink Candy",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Mocktail ceria bercita rasa stroberi manis segar dengan hint bubblegum dan garnish lemon.",
    image: "/assets/menu_crops/mocktail_pink_candy.jpg",
  },

  // ─── 5. SPECIAL BOWL & NOODLE ──────────────────────────────
  {
    name: "Rice/Noodle Chicken Chashu with Sauce",
    price: 34000,
    category: "Special Bowl & Noodle",
    desc: "Pilihan nasi atau mie kenyal dengan potongan ayam chashu panggang gurih dan siraman saus BBQ / Teriyaki.",
    image: "/assets/menu_crops/bowl_chashu.jpg",
    badge: "Best Seller",
  },
  {
    name: "Rice/Noodle Chicken Chashu Spicy",
    price: 35000,
    category: "Special Bowl & Noodle",
    desc: "Ayam chashu panggang empuk dengan saus sambal geprek matah pedas nampol di atas nasi pulen.",
    image: "/assets/menu_crops/bowl_chashu.jpg",
  },
  {
    name: "Mentai Rice (Beef / Chicken)",
    price: 33000,
    category: "Special Bowl & Noodle",
    desc: "Nasi pulen Jepang diselimuti daging sapi/ayam gurih, saus mentai bakar lumer berlimpah tobiko.",
    image: "/assets/clavicula/foods/mentai-rice.webp",
    badge: "Favorite",
  },
  {
    name: "Rice Smoke Beef with Sauce",
    price: 37000,
    category: "Special Bowl & Noodle",
    desc: "Daging sapi asap harum gurih berpadu telur mata sapi dan siraman saus lada hitam / BBQ spesial.",
    image: "/assets/menu_crops/bowl_smoke_beef.jpg",
  },
  {
    name: "Special Beef Fried with Sauce",
    price: 36000,
    category: "Special Bowl & Noodle",
    desc: "Potongan daging sapi empuk tumis saus gurih dengan bawang bombay dan wijen sangrai wangi.",
    image: "/assets/menu_crops/bowl_smoke_beef.jpg",
  },
  {
    name: "Fried Noodles with Egg Salted",
    price: 31000,
    category: "Special Bowl & Noodle",
    desc: "Mie goreng gurih berlumur saus kuning telur asin (salted egg) creamy yang melimpah.",
    image: "/assets/menu_crops/bowl_javanese_fried_noodles.jpg",
  },
  {
    name: "Chicken Katsu Spicy",
    price: 31000,
    category: "Special Bowl & Noodle",
    desc: "Fillet ayam goreng krispi golden brown dengan taburan bumbu cabai pedas dan telur ceplok.",
    image: "/assets/clavicula/foods/chicken-katsu-spicy.webp",
  },
  {
    name: "Chicken Katsu with Sauce",
    price: 30000,
    category: "Special Bowl & Noodle",
    desc: "Dada ayam berbalur tepung panko renyah disajikan dengan saus katsu gurih Jepang.",
    image: "/assets/clavicula/foods/chicken-katsu-with-sauce.webp",
  },
  {
    name: "Javanese Fried Rice",
    price: 23000,
    category: "Special Bowl & Noodle",
    desc: "Nasi goreng tradisional bumbu rempah Jawa wangi asap wajan, telur, kerupuk, dan acar segar.",
    image: "/assets/clavicula/foods/javanese-fried-rice.webp",
  },
  {
    name: "Javanese Fried Noodles",
    price: 23000,
    category: "Special Bowl & Noodle",
    desc: "Bakmi goreng Jawa gurih manis dengan sayuran segar, suwiran ayam, dan taburan bawang goreng.",
    image: "/assets/clavicula/foods/javanese-fried-noodles.webp",
  },

  // ─── 6. SPECIAL CLAVICULA (STEAK & SEAFOOD) ─────────────────
  {
    name: "Clavicula Tenderloin Steak",
    price: 73000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Daging sapi tenderloin empuk panggang disajikan dengan mashed potato gurih, saus spesial, dan sayur saute.",
    image: "/assets/menu_crops/steak_tenderloin.jpg",
    badge: "Chef Choice",
  },
  {
    name: "Tomyam Seporsi Berdua",
    price: 50000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Sop tomyam asam pedas khas Thailand dengan udang segar, cumi, jamur, dan sayuran komplit porsi sharing berdua.",
    image: "/assets/menu_crops/special_tomyam.jpg",
    badge: "Sharing 2 Pax",
  },
  {
    name: "Chicken Steak with Sauce",
    price: 36000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Fillet ayam panggang krispi juicy disiram saus gurih pilihan dengan mashed potato & salad segar.",
    image: "/assets/menu_crops/special_chicken_steak.jpg",
  },
  {
    name: "Fish and Chip",
    price: 32000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Fillet ikan dory krispi golden brown disajikan dengan kentang goreng renyah dan saus tartar segar.",
    image: "/assets/menu_crops/fish_and_chip.jpg",
  },
  {
    name: "Modern Fried Rice",
    price: 27000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Nasi goreng modern bumbu spesial pilihan: Tomyum asam pedas, BBQ smokey, Black Pepper gurih, atau Rendang khas.",
    image: "/assets/menu_crops/modern_fried_rice.jpg",
  },
  {
    name: "Special Crab (100% Fresh Crab)",
    price: 100000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Kepiting segar bumbu rempah khas Clavicula yang gurih meresap (Porsi isi 2 kepiting utuh).",
    image: "/assets/clavicula/foods/tomyam-seafood.webp",
    badge: "Seafood Spesial",
  },
  {
    name: "Strawberry Cheesecake",
    price: 28000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Kue keju lembut premium dengan selai buah stroberi segar dan remahan biskuit gurih.",
    image: "/assets/clavicula/foods/strawberry-cheesecake.webp",
  },
  {
    name: "Millescrepes (Cookies / Matcha)",
    price: 28000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Ratusan lapisan crepe tipis lembut berseling krim manis vanila cookies atau matcha Jepang.",
    image: "/assets/clavicula/foods/mille-crepes.webp",
  },
  {
    name: "Tiramisu Cake",
    price: 28000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Kue tiramisu klasik beraroma espresso arabika dengan lapisan keju mascarpone lembut.",
    image: "/assets/clavicula/foods/tiramisu-cake.webp",
  },

  // ─── 7. DESSERT & SNACK ────────────────────────────────────
  {
    name: "Mix Platter Clavicula",
    price: 36000,
    category: "Dessert & Snack",
    desc: "Piring camilan komplit porsi sharing: kentang goreng, sosis bakar, nugget, dan saus cocolan gurih.",
    image: "/assets/menu_crops/mix_platter.jpg",
    badge: "Sharing Platter",
  },
  {
    name: "Springroll",
    price: 28000,
    category: "Dessert & Snack",
    desc: "Roll pembungkus renyah dengan isian sayuran segar gurih dan ayam cincang disajikan dengan saus celup.",
    image: "/assets/menu_crops/springroll.jpg",
  },
  {
    name: "Beef Burger",
    price: 27000,
    category: "Dessert & Snack",
    desc: "Roti bun empuk dengan patty daging sapi panggang juicy, keju cheddar, selada, dan saus burger spesial.",
    image: "/assets/clavicula/foods/beef-burger.webp",
  },
  {
    name: "Croffle (Caramel/Straw/Choco/Nutella)",
    price: 27000,
    category: "Dessert & Snack",
    desc: "Perpaduan croissant waffle renyah berlapis mentega hangat dengan pilihan topping glaze manis melimpah.",
    image: "/assets/menu_crops/croffle.jpg",
    badge: "Popular Snack",
  },
  {
    name: "Savory Toast",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Roti panggang mentega gurih berisi keju leleh, smoked meat, dan sayuran segar.",
    image: "/assets/menu_crops/savory_toast.jpg",
  },
  {
    name: "Chicken Pop",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Bite-sized daging ayam krispi tepung bumbu gurih yang renyah di luar dan juicy di dalam.",
    image: "/assets/menu_crops/chicken_pop.jpg",
  },
  {
    name: "Taiwanese Fried Chicken",
    price: 25000,
    category: "Dessert & Snack",
    desc: "Ayam goreng ala Taiwan dengan taburan bumbu rempah wangi dan bubuk cabai pedas gurih.",
    image: "/assets/menu_crops/taiwanese_chicken.jpg",
  },
  {
    name: "Yakitori",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Sate ayam ala Jepang dipanggang arang dengan olesan saus tare manis gurih yang meresap.",
    image: "/assets/clavicula/foods/yakitori.webp",
  },
  {
    name: "Dimsum Mentai",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Dimsum siomay ayam udang lembut kukus diselimuti saus mentai bakar gurih creamy.",
    image: "/assets/clavicula/foods/dimsum-mentai.webp",
    badge: "Best Seller",
  },
  {
    name: "Dimsum Original",
    price: 20000,
    category: "Dessert & Snack",
    desc: "Dimsum kukus lembut isi daging ayam dan udang murni disajikan dengan chili oil wangi.",
    image: "/assets/clavicula/foods/dimsum-ori.webp",
  },
  {
    name: "Gochucula Chicken Wings",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Sayap ayam goreng renyah dibalut saus gochujang pedas manis khas Korea bertabur wijen.",
    image: "/assets/clavicula/foods/gochucula-chicken-wings.webp",
  },
  {
    name: "Churros",
    price: 23000,
    category: "Dessert & Snack",
    desc: "Stik churros goreng renyah bertabur gula kayu manis (cinnamon sugar) dengan dipping saus cokelat leleh.",
    image: "/assets/menu_crops/churros.jpg",
  },
  {
    name: "Pancake",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Tumpukan pancake hangat yang lembut dan fluffy dengan siraman madu/sirup maple dan butter.",
    image: "/assets/menu_crops/pancake.jpg",
  },
  {
    name: "Sate Taichan Mozarella",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Sate ayam taichan bakar gurih tanpa kecap diselimuti keju mozarella leleh dan sambal pedas asin.",
    image: "/assets/clavicula/foods/sate-taichan-mozarella.webp",
  },
  {
    name: "Hotdog Classic",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Roti hotdog empuk dengan sosis sapi jumbo bakar, saus mustard, saus tomat, dan mayones.",
    image: "/assets/clavicula/foods/hotdog.webp",
  },

  // ─── 8. NON COFFEE ─────────────────────────────────────────
  {
    name: "Carcoal (Charcoal Latte)",
    price: 31000,
    category: "Non Coffee",
    desc: "Minuman arang aktif organik dengan susu segar manis gurih yang menenangkan dan detoks.",
    image: "/assets/clavicula/drinks/charcoal-blend.webp",
    badge: "Unique",
  },
  {
    name: "Matcha Latte",
    price: 30000,
    category: "Non Coffee",
    desc: "Matcha murni kualitas tinggi dipadu susu segar hangat/dingin dengan rasa earthy manis lembut.",
    image: "/assets/clavicula/drinks/matcha-coffee-latte.webp",
    badge: "Favorite",
  },
  {
    name: "Taro Latte",
    price: 32000,
    category: "Non Coffee",
    desc: "Krim taro ungu lembut bercita rasa ubi manis yang legit berpadu susu segar dingin.",
    image: "/assets/menu_crops/non_coffee_taro.jpg",
  },
  {
    name: "Red Velvet Latte",
    price: 31000,
    category: "Non Coffee",
    desc: "Susu creamy berpadu kue red velvet lembut dengan sensasi cokelat manis dan wangi khas.",
    image: "/assets/menu_crops/non_coffee_matcha_redvelvet.jpg",
  },
  {
    name: "Chocolate Classic",
    price: 27000,
    category: "Non Coffee",
    desc: "Cokelat pekat pilihan diseduh dengan susu hangat atau dingin, manis pas dan kaya rasa cocoa.",
    image: "/assets/menu_crops/non_coffee_chocolate.jpg",
  },

  // ─── 9. TEA BASED & MOJITO ─────────────────────────────────
  {
    name: "Strawcha & Green Monkey",
    price: 31000,
    category: "Tea Based",
    desc: "Teh hijau segar berpadu sari buah stroberi dan sirup apel dingin menyegarkan tenggorokan.",
    image: "/assets/menu_crops/tea_strawcha_greenmonkey.jpg",
    badge: "Signature Tea",
  },
  {
    name: "Strawberry Mojito",
    price: 29000,
    category: "Tea Based",
    desc: "Potongan buah stroberi segar, daun mint remuk, sari jeruk nipis, dan soda dingin menyegarkan.",
    image: "/assets/menu_crops/tea_mojito_strawberry.jpg",
  },
  {
    name: "Original Mojito",
    price: 26000,
    category: "Tea Based",
    desc: "Perasan jeruk nipis asli, daun mint segar, dan soda dingin berbuih pelepas dahaga sempurna.",
    image: "/assets/menu_crops/tea_mojito_original.jpg",
  },
  {
    name: "Manis Manja",
    price: 26000,
    category: "Tea Based",
    desc: "Racikan teh wangi manis buah-buahan tropis dengan es batu melimpah.",
    image: "/assets/menu_crops/tea_manis_manja.jpg",
  },
  {
    name: "Regal Milktea",
    price: 27000,
    category: "Tea Based",
    desc: "Milk tea seduh autentik dengan brown sugar dan taburan remahan biskuit regal melimpah.",
    image: "/assets/menu_crops/tea_milktea_series.jpg",
  },
  {
    name: "Strawberry Fresh Fruit Tea",
    price: 21000,
    category: "Tea Based",
    desc: "Seduhan teh hitam wangi dengan ekstrak sari stroberi dingin manis menyegarkan.",
    image: "/assets/menu_crops/tea_fresh_flavored.jpg",
  },

  // ─── 10. MOZARELLA SERIES & PAKET ──────────────────────────
  {
    name: "Hotdog Mozarella",
    price: 38000,
    category: "Mozarella & Paket",
    desc: "Sosis sapi premium bakar dibalut keju mozarella leleh tebal molor gurih di atas roti hangat.",
    image: "/assets/menu_crops/mozarella_hotdog.jpg",
    badge: "Melted Cheese",
  },
  {
    name: "Beef Burger Mozarella",
    price: 38000,
    category: "Mozarella & Paket",
    desc: "Burger daging sapi panggang juicy dengan lelehan keju mozarella bakar melimpah.",
    image: "/assets/menu_crops/mozarella_burger.jpg",
  },
  {
    name: "Chashu Geprek Mozarella",
    price: 36000,
    category: "Mozarella & Paket",
    desc: "Nasi ayam chashu geprek sambal bawang pedas ditutup selimut keju mozarella bakar.",
    image: "/assets/menu_crops/mozarella_chashu.jpg",
  },
  {
    name: "Chicken Katsu Geprek Mozarella",
    price: 33000,
    category: "Mozarella & Paket",
    desc: "Chicken katsu krispi geprek dengan lelehan keju mozarella gurih kenyang.",
    image: "/assets/menu_crops/mozarella_katsu.jpg",
  },
  {
    name: "Paket Hemat Clavicula (1, 2, 3)",
    price: 44000,
    category: "Mozarella & Paket",
    desc: "Paket lengkap kenyang: Nasi Chicken Chashu/Katsu + Es Teh Asli Segar + Free Naynay Puding.",
    image: "/assets/menu_crops/menu_paket_hemat.jpg",
    badge: "Paket Komplit",
  },

  // ─── 11. ICE CREAM DESSERT ─────────────────────────────────
  {
    name: "Special Clavi Ice Cream (Straw Cheese Cake)",
    price: 20000,
    category: "Ice Cream",
    desc: "Es krim spesial dessert dengan cita rasa cheesecake stroberi dan remahan biskuit renyah.",
    image: "/assets/menu_crops/ice_cream_straw_cheesecake.jpg",
    badge: "Specialty Dessert",
  },
  {
    name: "Special Clavi Ice Cream (Taro Cookies)",
    price: 20000,
    category: "Ice Cream",
    desc: "Es krim taro ungu creamy bertabur biskuit cookies gurih manis dingin.",
    image: "/assets/menu_crops/ice_cream_taro_cookies.jpg",
  },
  {
    name: "Special Clavi Ice Cream (Oreo Cookies)",
    price: 20000,
    category: "Ice Cream",
    desc: "Es krim vanila premium bertabur remah biskuit Oreo gurih renyah.",
    image: "/assets/menu_crops/ice_cream_straw_cheesecake.jpg",
  },
  {
    name: "Ice Cream with Topping (Red Velvet / Matcha)",
    price: 15000,
    category: "Ice Cream",
    desc: "Scoop es krim lembut dengan taburan bubuk red velvet, matcha, marshmallow, atau biskuit regal.",
    image: "/assets/menu_crops/ice_cream_topping.jpg",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPosterGallery, setShowPosterGallery] = useState(false);
  const { addToCart } = useUI();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" ? true : item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const posterImages = [
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

  return (
    <main className="min-h-screen pt-28 pb-24 bg-linen">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/20 bg-vanilla px-4 py-1.5 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-chestnut"></span>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold">
              DAFTAR MENU RESMI // CLAVICULA COFFEE &amp; IDEA
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-espresso mb-4">
            The Complete Menu
          </h1>
          <p className="text-lg md:text-xl font-serif italic text-espresso/70 max-w-2xl mx-auto leading-relaxed">
            Dari racikan kopi anatomi tubuh, manual brew nusantara, santapan steak &amp; kepiting segar, hingga camilan manis. Semua harga sudah termasuk PPN.
          </p>

          {/* Toggle Visual Posters Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowPosterGallery(!showPosterGallery)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-chestnut/30 bg-white hover:bg-vanilla text-espresso text-xs font-semibold shadow-sm transition-all"
            >
              <Eye size={15} className="text-chestnut" />
              {showPosterGallery ? "Sembunyikan Lembar PDF Menu" : "Lihat Lembar Poster Asli PDF (11 Halaman)"}
            </button>
          </div>
        </div>

        {/* Visual Poster Gallery (Expandable) */}
        {showPosterGallery && (
          <div className="mb-16 p-6 rounded-3xl bg-vanilla/60 border border-chestnut/20 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-espresso">Lembar Dokumen Menu Resmi Clavicula</h3>
                <p className="text-xs text-espresso/60">Arsip visual langsung dari buku menu kafe Slawi &amp; Guci</p>
              </div>
              <button
                onClick={() => setShowPosterGallery(false)}
                className="text-xs font-mono text-chestnut hover:underline font-bold"
              >
                Tutup Galeri
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {posterImages.map((poster, pIdx) => (
                <div
                  key={pIdx}
                  className="group bg-white rounded-2xl overflow-hidden border border-chestnut/15 shadow-sm hover:shadow-warm-card transition-all"
                >
                  <div className="relative aspect-[3/4] w-full bg-espresso">
                    <Image
                      src={poster.src}
                      alt={poster.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[11px] font-bold text-espresso line-clamp-1">
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

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/40"
            />
            <input
              type="text"
              placeholder="Cari menu, kopi, steak, mie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-full pl-10 pr-4 py-2.5 text-xs md:text-sm border border-chestnut/20 text-espresso placeholder-espresso/40 focus:outline-none focus:border-chestnut transition-colors shadow-sm"
            />
          </div>

          <div className="text-xs font-mono text-espresso/60 self-center">
            Menampilkan <span className="font-bold text-chestnut">{filteredItems.length}</span> menu
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-chestnut text-white shadow-md scale-105"
                  : "bg-white text-espresso/70 hover:bg-vanilla border border-chestnut/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center text-espresso/50">
            <p className="font-serif italic text-xl text-espresso mb-1">Menu tidak ditemukan</p>
            <p className="text-xs">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-5 border border-chestnut/15 shadow-sm hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {item.image && (
                    <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden bg-vanilla/60 border border-chestnut/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className={`group-hover:scale-105 transition-transform duration-500 ${
                          item.image.endsWith(".webp")
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex-1">
                      {item.badge && (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-vanilla text-chestnut text-[10px] font-mono font-bold uppercase mb-1">
                          {item.badge}
                        </span>
                      )}
                      <h4 className="text-base font-bold text-espresso group-hover:text-chestnut transition-colors leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    <span className="text-base font-serif italic text-chestnut font-bold whitespace-nowrap">
                      Rp {(item.price / 1000).toLocaleString("id-ID")}.000
                    </span>
                  </div>

                  <p className="text-xs text-espresso/60 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-chestnut/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-espresso/40 uppercase">
                    {item.category}
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        name: item.name,
                        price: item.price,
                        category: item.category,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-vanilla text-chestnut text-xs font-semibold hover:bg-chestnut hover:text-white transition-colors"
                  >
                    <Plus size={13} /> Tambah
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
