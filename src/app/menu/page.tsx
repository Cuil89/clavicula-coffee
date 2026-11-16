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
  image?: string;
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
  "Promo Ngopi Pagi/Sore",
];

const menuItems: MenuItem[] = [
  // SIGNATURE DRINK (ANATOMI)
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

  // ESPRESSO BASED
    {
    name: "Single Espresso",
    price: 14000,
    category: "Espresso Based",
    desc: "Single shot konsentrat espresso murni ekstraksi 9 bar.",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
  },
    {
    name: "Americano",
    price: 19000,
    category: "Espresso Based",
    desc: "Espresso klasik dipadukan air panas/dingin murni, jernih dan segar.",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
  },
    {
    name: "Long Black",
    price: 20000,
    category: "Espresso Based",
    desc: "Espresso poured over water mempertahankan crema tebal aromatik.",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
  },
  { name: "Es Kopi Susu Clavicula", price: 20000, category: "Espresso Based", desc: "Espresso khas Clavicula dipadukan susu creamy dan gula aren autentik.", image: "/assets/clavicula/drinks/kopi-susu-ori.webp", badge: "Favorit Harian" },
  { name: "Flavour Americano", price: 22000, category: "Espresso Based", desc: "Americano dingin dengan pilihan rasa hazelnut, vanila, atau karamel.", image: "/assets/clavicula/drinks/flavour-americano.webp" },
    {
    name: "Coffee Late",
    price: 23000,
    category: "Espresso Based",
    desc: "Espresso lembut dengan perbandingan steamed milk yang harmonis.",
    image: "/assets/clavicula/drinks/flavour-latte.webp",
  },
    {
    name: "Cappuccino",
    price: 23000,
    category: "Espresso Based",
    desc: "Komposisi seimbang espresso, steamed milk, dan busa susu tebal.",
    image: "/assets/clavicula/drinks/flavour-latte.webp",
  },
  { name: "Affogato", price: 23000, category: "Espresso Based", desc: "Satu scoop es krim vanila disiram single shot espresso panas.", image: "/assets/clavicula/drinks/affogato.webp" },
  { name: "Caramel Machiato", price: 28000, category: "Espresso Based", desc: "Espresso berpadu vanila dan saus karamel panggang gurih.", image: "/assets/clavicula/drinks/caramel-macchiato.webp" },
    {
    name: "Mocccacino",
    price: 28000,
    category: "Espresso Based",
    desc: "Kombinasi cokelat hitam pekat dengan espresso dan susu segar.",
    image: "/assets/clavicula/drinks/flavour-latte.webp",
  },
    {
    name: "Strawberry Coffee",
    price: 30000,
    category: "Espresso Based",
    desc: "Espresso dingin menyegarkan dengan puree stroberi asli.",
    image: "/assets/clavicula/drinks/costa.webp",
  },
  { name: "Lemonade Coffee", price: 28000, category: "Espresso Based", desc: "Sensasi sitrus lemon segar berpadu karakter buah kopi arabika.", image: "/assets/clavicula/drinks/coffee-lemonade.webp" },
  { name: "Flavour Latte", price: 30000, category: "Espresso Based", desc: "Latte manis pilihan sirup premium (Vanilla / Hazelnut / Caramel).", image: "/assets/clavicula/drinks/flavour-latte.webp" },
  { name: "Cookies Coffee", price: 32000, category: "Espresso Based", desc: "Latte dingin berpadu remah biskuit cookies crunchy.", image: "/assets/clavicula/drinks/cookies-coffee.webp" },
  { name: "Matcha Coffee", price: 32000, category: "Espresso Based", desc: "Perpaduan rasa earthy matcha Kyoto dan espresso arabika.", image: "/assets/clavicula/drinks/matcha-coffee-latte.webp" },
    {
    name: "Caramel Butterscotch",
    price: 32000,
    category: "Espresso Based",
    desc: "Rasa buttery karamel lembut yang memanjakan lidah.",
    image: "/assets/clavicula/drinks/caramel-macchiato.webp",
  },
    {
    name: "Lotus Biskof Ice Latte",
    price: 25454,
    category: "Espresso Based",
    desc: "Kopi susu creamy dengan pasta dan remahan Lotus Biscoff speculoos.",
    image: "/assets/clavicula/drinks/cookies-coffee.webp",
    badge: "New",
  },

  // MANUAL BREW
    {
    name: "V60 Lokal (Gayo / Sindoro / Ijen / Flores)",
    price: 26000,
    category: "Manual Brew",
    desc: "Seduhan pour-over kertas mikro dengan biji kopi single origin nusantara.",
    image: "/assets/clavicula/roastery/rb-02-arabica-lokal-v60.jpg",
  },
    {
    name: "V60 Luar (Ethiopia / Colombia)",
    price: 32000,
    category: "Manual Brew",
    desc: "Biji kopi impor pilihan dengan keasaman floral buah yang kompleks.",
    image: "/assets/clavicula/roastery/rb-03-arabica-impor-v60-luar.jpg",
  },
    {
    name: "Aeropress",
    price: 28000,
    category: "Manual Brew",
    desc: "Ekstraksi tekanan udara menghasilkan cangkir bersih dengan bodi padat.",
    image: "/assets/clavicula/places/slow-bar-v60-clavicula.jpg",
  },
    {
    name: "Vietnam Drip",
    price: 24000,
    category: "Manual Brew",
    desc: "Seduhan tetes lambat tradisional dengan susu kental manis legit.",
    image: "/assets/clavicula/places/hero-slowbar-clavicula.jpg",
  },
    {
    name: "French Press",
    price: 20000,
    category: "Manual Brew",
    desc: "Immersion brew penuh bodi dan minyak alami kopi yang utuh.",
    image: "/assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg",
  },
    {
    name: "Kopi Tubruk",
    price: 18000,
    category: "Manual Brew",
    desc: "Seduhan klasik khas Nusantara dengan biji sangrai segar.",
    image: "/assets/clavicula/roastery/rb-04-fine-robusta-selection.jpg",
  },

  // MOCKTAIL COFFEE & BLEND
  {
    name: "Brachialis",
    price: 29000,
    category: "Mocktail & Blend",
    desc: "Kiwi segar + Banana lembut + Espresso arabika, rasa tropis eksotis.",
    image: "/assets/extracted/mocktail_brachialis.jpg",
    badge: "Anatomi Mocktail",
  },
  {
    name: "Ulnaris",
    price: 28000,
    category: "Mocktail & Blend",
    desc: "Banana puree dipadukan double espresso segar dan sentuhan rempah.",
    image: "/assets/extracted/mocktail_ulnaris.jpg",
  },
  {
    name: "Radius",
    price: 28000,
    category: "Mocktail & Blend",
    desc: "Strawberry + Sakura matcha + Lemon sitrus segar menyala.",
    image: "/assets/extracted/mocktail_radius.jpg",
  },
  {
    name: "Vomer",
    price: 26000,
    category: "Mocktail & Blend",
    desc: "Kiwi asam manis berpadu espresso dingin dan gelembung soda.",
    image: "/assets/extracted/mocktail_vomer.jpg",
  },
    {
    name: "Chocobanana",
    price: 28000,
    category: "Mocktail & Blend",
    desc: "Blend cokelat creamy dan pisang matang lembut.",
    image: "/assets/menu_crops/mocktail_chocobanana.jpg",
  },
    {
    name: "Costa",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Racikan spesial kopi blend dengan lapisan rasa rempah hangat.",
    image: "/assets/menu_crops/mocktail_costa_blend.jpg",
  },
    {
    name: "Nutela Blend",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Ice blend selai hazelnut Nutella melimpah dan susu.",
    image: "/assets/menu_crops/mocktail_chocobanana.jpg",
  },
    {
    name: "Baileys Coffee",
    price: 30000,
    category: "Mocktail & Blend",
    desc: "Sensasi aroma baileys (non-alkohol) dengan creamy coffee.",
    image: "/assets/clavicula/drinks/cookies-coffee.webp",
  },
    {
    name: "Pink Candy",
    price: 27272,
    category: "Mocktail & Blend",
    desc: "Minuman blend manis lembut beraroma permen berry segar.",
    image: "/assets/menu_crops/mocktail_pink_candy.jpg",
  },
    {
    name: "Fabaceae",
    price: 27272,
    category: "Mocktail & Blend",
    desc: "Mocktail artistik berlapis warna biru telang dan leci manis.",
    image: "/assets/menu_crops/mocktail_ulnaris.jpg",
  },

  // SPECIAL BOWL & NOODLE
  {
    name: "Rice/Noodle Chicken Chashu with Sauce",
    price: 31000,
    category: "Special Bowl & Noodle",
    desc: "Pilihan Nasi/Mie dengan ayam chashu empuk berlumur saus (BBQ, Teriyaki, Salted Egg, Blackpepper).",
    image: "/assets/extracted/bowl_chashu.jpg",
    badge: "Chef Choice",
  },
    {
    name: "Rice/Noodle Chicken Chashu Spicy",
    price: 30000,
    category: "Special Bowl & Noodle",
    desc: "Ayam chashu gurih dengan sambal matah wangi atau sambal geprek pedas nendang.",
    image: "/assets/menu_crops/bowl_chashu.jpg",
  },
  {
    name: "Mentai Rice (Beef / Chicken)",
    price: 36000,
    category: "Special Bowl & Noodle",
    desc: "Nasi gurih bertabur nori dengan irisan daging berbalut saus mentai bakar lumer.",
    image: "/assets/clavicula/foods/mentai-rice.webp",
  },
  {
    name: "Rice Smoke Beef with Sauce/Spicy",
    price: 39000,
    category: "Special Bowl & Noodle",
    desc: "Daging brisket shortplate asap premium dengan saus pilihan gurih meresap.",
    image: "/assets/extracted/bowl_smoke_beef.jpg",
  },
    {
    name: "Special Beef Fried with Sauce",
    price: 33000,
    category: "Special Bowl & Noodle",
    desc: "Daging sapi tumis gurih saus BBQ / Teriyaki / Salted Egg / Blackpepper.",
    image: "/assets/menu_crops/bowl_smoke_beef.jpg",
  },
    {
    name: "Fried Noodles with Egg Salted",
    price: 30000,
    category: "Special Bowl & Noodle",
    desc: "Mie goreng gurih berlumur saus telur asin autentik dan potongan topping.",
    image: "/assets/menu_crops/bowl_javanese_fried_noodles.jpg",
  },
  { name: "Chicken Katsu Spicy", price: 26000, category: "Special Bowl & Noodle", desc: "Chicken katsu krispi disajikan dengan sambal matah / sambal geprek segar.", image: "/assets/clavicula/foods/chicken-katsu-spicy.webp" },
  { name: "Chicken Katsu with Sauce", price: 28000, category: "Special Bowl & Noodle", desc: "Katsu renyah dengan siraman saus BBQ / Teriyaki / Blackpepper.", image: "/assets/clavicula/foods/chicken-katsu-with-sauce.webp" },
  {
    name: "Javanese Fried Rice",
    price: 21000,
    category: "Special Bowl & Noodle",
    desc: "Nasi goreng tradisional Jawa bumbu rempah harum, disajikan dengan telur & acar.",
    image: "/assets/clavicula/foods/javanese-fried-rice.webp",
  },
  { name: "Javanese Fried Noodles", price: 21000, category: "Special Bowl & Noodle", desc: "Mie goreng Jawa gurih manis dengan sayuran segar dan telur.", image: "/assets/clavicula/foods/javanese-fried-noodles.webp" },
    {
    name: "Ayam Goreng Madu",
    price: 25454,
    category: "Special Bowl & Noodle",
    desc: "Potongan ayam renyah berbalut glasir madu manis gurih bertabur wijen.",
    image: "/assets/menu_crops/bowl_katsu_spicy.jpg",
  },
    {
    name: "Chicken Salted Egg Bowl",
    price: 25454,
    category: "Special Bowl & Noodle",
    desc: "Ayam krispi dibalut krim salted egg daun kari gurih.",
    image: "/assets/menu_crops/bowl_katsu_spicy.jpg",
  },
    {
    name: "Nasi Kulit Cabe Garam",
    price: 25454,
    category: "Special Bowl & Noodle",
    desc: "Kulit ayam super renyah ditumis bumbu cabe garam bawang pedas nikmat.",
    image: "/assets/menu_crops/snack_taiwanese_chicken.jpg",
  },
    {
    name: "Nasi Chicken Cabe Garam",
    price: 25454,
    category: "Special Bowl & Noodle",
    desc: "Ayam fillet krispi bertabur irisan cabai, bawang putih, dan daun bawang.",
    image: "/assets/menu_crops/snack_taiwanese_chicken.jpg",
  },
    {
    name: "Clavicula Noodle (Kuah Miso / Kuah Tomyum)",
    price: 25454,
    category: "Special Bowl & Noodle",
    desc: "Mie kuah hangat dengan pilihan kuah kaldu miso Jepang atau kuah tomyam asam segar.",
    image: "/assets/menu_crops/special_tomyam.jpg",
    badge: "Menu Baru",
  },
    {
    name: "Clavicula Noodle (Spicy Chili Oil / Savory Sweet)",
    price: 25454,
    category: "Special Bowl & Noodle",
    desc: "Mie kering bumbu chili oil pedas harum atau bumbu manis gurih bertelur mata sapi.",
    image: "/assets/menu_crops/bowl_javanese_fried_noodles.jpg",
  },

  // SPECIAL CLAVICULA (STEAK, CRAB, TOMYAM)
    {
    name: "Clavicula Tenderloin Steak",
    price: 72727,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Steak daging sapi tenderloin pilihan disajikan dengan mashed potato lembut dan brown sauce.",
    image: "/assets/menu_crops/steak_tenderloin.jpg",
    badge: "Chef Special",
  },
  {
    name: "Special Crab (100% Fresh Crab) - Isi 2",
    price: 100000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Kepiting segar laut asli isi 2 ekor dimasak bumbu rempah istimewa.",
    image: "/assets/extracted/special_crab.jpg",
  },
  {
    name: "Special Crab (100% Fresh Crab) - Isi 4",
    price: 180000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Porsi jumbo kepiting segar isi 4 ekor, pas untuk santap bersama keluarga.",
    image: "/assets/extracted/special_crab.jpg",
  },
  {
    name: "Tomyam Seporsi Berdua",
    price: 50000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Hot pot kuah tomyam autentik Thailand porsi berdua dengan aneka udang, cumi & jamur.",
    image: "/assets/extracted/special_tomyam.jpg",
    badge: "Porsi Berdua",
  },
  {
    name: "Chicken Steak with Sauce & Mashed Potato",
    price: 40000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Steak paha ayam panggang empuk dengan mashed potato dan sayuran tumis.",
    image: "/assets/extracted/special_chicken_steak.jpg",
  },
  {
    name: "Strawberry Cheesecake",
    price: 35000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Cheesecake lembut New York style dengan glaze selai stroberi segar asam manis.",
    image: "/assets/clavicula/foods/strawberry-cheesecake.webp",
  },
  {
    name: "Millescrepes (Cookies / Matcha / Redvelvet)",
    price: 37000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Kue lapis krep tipis dengan krim lembut lumer di setiap gigitan.",
    image: "/assets/clavicula/foods/mille-crepes.webp",
  },
  {
    name: "Tiramisu Cake",
    price: 48000,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Classic Italian tiramisu dengan sentuhan espresso Clavicula dan taburan cocoa powder halus.",
    image: "/assets/clavicula/foods/tiramisu-cake.webp",
    badge: "Chef Special",
  },
    {
    name: "Caramel Soft Cheesecake",
    price: 15454,
    category: "Special Clavicula (Steak & Crab)",
    desc: "Kue keju panggang mini lembut dengan lapisan karamel tipis.",
    image: "/assets/clavicula/foods/strawberry-cheesecake.webp",
  },

  // DESSERT & SNACK
  { name: "Croffle (Caramel/Strawberry/Coklat Crunch/Nutella)", price: 30000, category: "Dessert & Snack", desc: "Croissant waffle hangat renyah di luar, lembut di dalam.", image: "/assets/extracted/snack_croffle.jpg" },
  { name: "Beef Burger", price: 32000, category: "Dessert & Snack", desc: "Roti burger empuk dengan patty daging sapi panggang dan sayuran segar.", image: "/assets/clavicula/foods/beef-burger.webp" },
  { name: "Hotdog", price: 36000, category: "Dessert & Snack", desc: "Roti sosis panggang bertabur mustard, saus tomat, dan acar segar.", image: "/assets/clavicula/foods/hotdog.webp" },
    {
    name: "Savory Toast",
    price: 28000,
    category: "Dessert & Snack",
    desc: "Roti panggang gurih isi daging ayam telur dengan keju leleh.",
    image: "/assets/menu_crops/snack_burger.jpg",
  },
  { name: "Taiwanese Fried Chicken", price: 28000, category: "Dessert & Snack", desc: "Ayam krispi bumbu oriental gurih asin pedas khas pasar malam Taiwan.", image: "/assets/extracted/snack_taiwanese_chicken.jpg" },
    {
    name: "Chicken Pop",
    price: 28000,
    category: "Dessert & Snack",
    desc: "Bite-sized popcorn chicken renyah dengan cocolan saus pedas.",
    image: "/assets/menu_crops/snack_taiwanese_chicken.jpg",
  },
  { name: "Japanese Fruit Sandwich", price: 25000, category: "Dessert & Snack", desc: "Sandwich roti tawar susu isi whipped cream lembut dan potongan buah segar.", image: "/assets/extracted/snack_fruit_sandwich.jpg" },
    {
    name: "Churros",
    price: 25000,
    category: "Dessert & Snack",
    desc: "Pastri goreng spanyol bertabur gula kayu manis dengan saus cokelat cocol.",
    image: "/assets/menu_crops/snack_churros.jpg",
  },
    {
    name: "Pancake",
    price: 26000,
    category: "Dessert & Snack",
    desc: "Pancake empuk lembut disajikan dengan sirup maple dan mentega harum.",
    image: "/assets/menu_crops/snack_croffle.jpg",
  },
    {
    name: "Sate Smoke Beef",
    price: 34000,
    category: "Dessert & Snack",
    desc: "Tusukan daging sapi asap empuk dipanggang bumbu gurih.",
    image: "/assets/menu_crops/snack_sate_taichan.jpg",
  },
  { name: "Sate Taichan Mozarella", price: 31000, category: "Dessert & Snack", desc: "Sate ayam taichan pedas diselimuti keju mozarella leleh mulur.", image: "/assets/clavicula/foods/sate-taichan-mozarella.webp" },
    {
    name: "Sate Taichan Daging/Kulit",
    price: 24000,
    category: "Dessert & Snack",
    desc: "Sate taichan bakar gurih pedas jeruk nipis.",
    image: "/assets/menu_crops/snack_sate_taichan.jpg",
  },
  { name: "Yakitori", price: 28000, category: "Dessert & Snack", desc: "Sate ayam khas Jepang bumbu tare manis gurih meresap.", image: "/assets/clavicula/foods/yakitori.webp" },
  { name: "Dimsum Mentai", price: 28000, category: "Dessert & Snack", desc: "Dimsum kukus lembut disiram saus mentai bakar gurih.", image: "/assets/clavicula/foods/dimsum-mentai.webp" },
  { name: "Dimsum Original", price: 24000, category: "Dessert & Snack", desc: "Siomay ayam udang kukus gurih lembut dengan chili oil.", image: "/assets/clavicula/foods/dimsum-ori.webp" },
    {
    name: "Gohyong",
    price: 23636,
    category: "Dessert & Snack",
    desc: "Kulit tahu isi daging cincang gurih digoreng renyah dengan kuah asam manis.",
    image: "/assets/menu_crops/snack_dimsum.jpg",
  },
  { name: "Gochucula Chicken Wings", price: 29000, category: "Dessert & Snack", desc: "Sayap ayam goreng bersaus gochujang pedas manis Korea.", image: "/assets/clavicula/foods/gochucula-chicken-wings.webp" },
    {
    name: "Springroll",
    price: 31000,
    category: "Dessert & Snack",
    desc: "Lumpia gulung isi sayuran segar renyah dengan saus celup.",
    image: "/assets/menu_crops/snack_dimsum.jpg",
  },
    {
    name: "Sweet Toast",
    price: 20000,
    category: "Dessert & Snack",
    desc: "Roti bakar manis hangat dengan topping mentega dan gula manis.",
    image: "/assets/menu_crops/snack_burger.jpg",
  },
    {
    name: "Pisang Bakar",
    price: 19000,
    category: "Dessert & Snack",
    desc: "Pisang kepok bakar manis bertabur keju parut dan cokelat meses.",
    image: "/assets/menu_crops/snack_cireng_pisang.jpg",
  },
    {
    name: "Rujak Cireng Ortega",
    price: 20000,
    category: "Dessert & Snack",
    desc: "Cireng kenyal gurih renyah dengan cocolan bumbu rujak pedas manis.",
    image: "/assets/menu_crops/snack_cireng_pisang.jpg",
  },
    {
    name: "Bakso Goreng Ortega",
    price: 22000,
    category: "Dessert & Snack",
    desc: "Bakso goreng mekar renyah di luar, empuk di dalam.",
    image: "/assets/menu_crops/snack_dimsum.jpg",
  },
    {
    name: "Tempe Goreng",
    price: 18000,
    category: "Dessert & Snack",
    desc: "Tempe mendoan gurih khas daerah dengan sambal kecap cabai rawit.",
    image: "/assets/menu_crops/snack_cireng_pisang.jpg",
  },
    {
    name: "Potato Stick / Kentang Goreng",
    price: 18000,
    category: "Dessert & Snack",
    desc: "Kentang goreng renyah bertabur garam laut.",
    image: "/assets/menu_crops/snack_burger.jpg",
  },

  // NON COFFEE
    {
    name: "Taro Latte",
    price: 32000,
    category: "Non Coffee",
    desc: "Minuman taro ungu manis gurih dengan steamed milk lembut.",
    image: "/assets/menu_crops/non_coffee_taro.jpg",
  },
    {
    name: "Sakura Matcha",
    price: 31000,
    category: "Non Coffee",
    desc: "Matcha harum berpadu aroma bunga sakura manis lembut.",
    image: "/assets/clavicula/drinks/matcha-coffee-latte.webp",
  },
    {
    name: "Red Velvet Latte",
    price: 31000,
    category: "Non Coffee",
    desc: "Rasa kue red velvet cokelat manis dengan sentuhan keju lembut.",
    image: "/assets/menu_crops/non_coffee_matcha_redvelvet.jpg",
  },
    {
    name: "Unicorn",
    price: 31000,
    category: "Non Coffee",
    desc: "Minuman fantasi berlapis warna manis segar yang cantik difoto.",
    image: "/assets/menu_crops/non_coffee_matcha_redvelvet.jpg",
  },
    {
    name: "Chocolatte",
    price: 28000,
    category: "Non Coffee",
    desc: "Cokelat pekat pilihan dipadukan susu murni hangat atau dingin.",
    image: "/assets/menu_crops/non_coffee_chocolate.jpg",
  },
    {
    name: "Bubble Gum",
    price: 30000,
    category: "Non Coffee",
    desc: "Minuman rasa permen karet nostalgia yang manis menyegarkan.",
    image: "/assets/menu_crops/non_coffee_matcha_redvelvet.jpg",
  },
    {
    name: "Cookies Non-Coffee",
    price: 30000,
    category: "Non Coffee",
    desc: "Susu creamy berpadu remahan biskuit cookies oreo.",
    image: "/assets/clavicula/drinks/cookies-coffee.webp",
  },
  { name: "Carcoal (Charcoal Latte)", price: 30000, category: "Non Coffee", desc: "Arang bambu aktif bernuansa hitam elegan dengan rasa vanilla milk.", image: "/assets/clavicula/drinks/charcoal-blend.webp" },
    {
    name: "Matcha Latte",
    price: 29000,
    category: "Non Coffee",
    desc: "Pure Japanese matcha dipadukan susu segar lembut.",
    image: "/assets/clavicula/drinks/matcha-coffee-latte.webp",
  },
    {
    name: "Chocolate Classic",
    price: 27000,
    category: "Non Coffee",
    desc: "Cokelat nikmat khas yang disukai semua kalangan.",
    image: "/assets/menu_crops/non_coffee_chocolate.jpg",
  },

  // TEA BASED & MOCKTAILS
    {
    name: "Strawcha",
    price: 31000,
    category: "Tea Based",
    desc: "Stroberi manis berpadu teh hijau segar dan es batu jernih.",
    image: "/assets/menu_crops/tea_strawcha_greenmonkey.jpg",
  },
    {
    name: "Green Monkey",
    price: 31000,
    category: "Tea Based",
    desc: "Mocktail mint apel hijau asam manis menyegarkan dahaga.",
    image: "/assets/menu_crops/tea_strawcha_greenmonkey.jpg",
  },
    {
    name: "Strawberry Mojito",
    price: 29000,
    category: "Tea Based",
    desc: "Soda berkarbonasi dengan daun mint segar dan stroberi hancur.",
    image: "/assets/menu_crops/tea_mojito_strawberry.jpg",
  },
    {
    name: "Cute Monkey",
    price: 30000,
    category: "Tea Based",
    desc: "Minuman buah pisang stroberi creamy yang lembut dan segar.",
    image: "/assets/menu_crops/tea_manis_manja.jpg",
  },
    {
    name: "Original Mojito",
    price: 26000,
    category: "Tea Based",
    desc: "Perasan jeruk nipis, mint segar, gula tebu, dan soda dingin.",
    image: "/assets/menu_crops/tea_mojito_original.jpg",
  },
    {
    name: "Flavour Mojito",
    price: 30000,
    category: "Tea Based",
    desc: "Mojito dengan pilihan sirup buah leci, kiwi, atau stroberi.",
    image: "/assets/menu_crops/tea_mojito_strawberry.jpg",
  },
    {
    name: "Manis Manja",
    price: 26000,
    category: "Tea Based",
    desc: "Racikan mocktail manis segar dengan aftertaste semilir buah.",
    image: "/assets/menu_crops/tea_manis_manja.jpg",
  },
    {
    name: "Baby Green",
    price: 29000,
    category: "Tea Based",
    desc: "Mocktail dingin melon dan jeruk nipis yang super segar.",
    image: "/assets/menu_crops/tea_manis_manja.jpg",
  },
    {
    name: "Regal Milktea",
    price: 27000,
    category: "Tea Based",
    desc: "Teh susu khas dipadukan remahan biskuit Marie Regal.",
    image: "/assets/menu_crops/tea_milktea_series.jpg",
  },
    {
    name: "Banaki Milktea",
    price: 25000,
    category: "Tea Based",
    desc: "Teh susu beraroma pisang manis lembut.",
    image: "/assets/menu_crops/tea_milktea_series.jpg",
  },
    {
    name: "Brownsugar Milktea",
    price: 25000,
    category: "Tea Based",
    desc: "Milk tea klasik dengan lelehan gula aren legit.",
    image: "/assets/menu_crops/tea_milktea_series.jpg",
  },
    {
    name: "Strawberry Tea",
    price: 21000,
    category: "Tea Based",
    desc: "Teh seduh wangi dengan rasa buah stroberi asam manis.",
    image: "/assets/menu_crops/tea_fresh_flavored.jpg",
  },
    {
    name: "Kiwi Tea",
    price: 21000,
    category: "Tea Based",
    desc: "Teh dingin dengan bulir buah kiwi hijau segar.",
    image: "/assets/menu_crops/tea_fresh_flavored.jpg",
  },
    {
    name: "Lemon Tea",
    price: 18000,
    category: "Tea Based",
    desc: "Teh hitam klasik berpadu perasan lemon murni segar.",
    image: "/assets/menu_crops/tea_fresh_flavored.jpg",
  },
    {
    name: "Original Tea (Ice / Hot)",
    price: 14000,
    category: "Tea Based",
    desc: "Teh melati wangi khas Tegal yang otentik menyejukkan.",
    image: "/assets/menu_crops/tea_fresh_flavored.jpg",
  },

  // MOZARELLA & MENU PAKET
    {
    name: "Hotdog Mozarella",
    price: 38000,
    category: "Mozarella & Paket",
    desc: "Hotdog lezat dengan lelehan keju mozarella panggang berlimpah.",
    image: "/assets/menu_crops/mozarella_hotdog.jpg",
  },
    {
    name: "Chashu Geprek Mozarella",
    price: 36000,
    category: "Mozarella & Paket",
    desc: "Ayam chashu pedas geprek diselimuti keju mozarella mulur.",
    image: "/assets/menu_crops/mozarella_chashu.jpg",
  },
    {
    name: "Special Beef Geprek Mozarella",
    price: 36000,
    category: "Mozarella & Paket",
    desc: "Daging sapi empuk bumbu geprek berpadu lumeran mozarella.",
    image: "/assets/menu_crops/mozarella_chashu.jpg",
  },
    {
    name: "Beef Burger Mozarella",
    price: 38000,
    category: "Mozarella & Paket",
    desc: "Burger daging sapi dengan lapisan keju mozarella leleh tebal.",
    image: "/assets/menu_crops/mozarella_burger.jpg",
  },
    {
    name: "Chicken Katsu Geprek Mozarella",
    price: 33000,
    category: "Mozarella & Paket",
    desc: "Katsu renyah sambal geprek dengan keju mozarella bakar.",
    image: "/assets/menu_crops/mozarella_katsu.jpg",
  },
    {
    name: "Sosis Bakar Mozarella",
    price: 33000,
    category: "Mozarella & Paket",
    desc: "Sosis panggang jumbo dibalut lelehan keju mozarella gurih.",
    image: "/assets/menu_crops/mozarella_hotdog.jpg",
  },
    {
    name: "Paket 1: Chicken Chashu + Original Tea Ice",
    price: 44000,
    category: "Mozarella & Paket",
    desc: "Paket hemat nasi Chicken Chashu + Es Teh Asli + Free Naynay Puding (Mangga/Oreo).",
    image: "/assets/menu_crops/mozarella_chashu.jpg",
    badge: "Free Puding",
  },
    {
    name: "Paket 2: Chicken Katsu + Original Tea Ice",
    price: 39000,
    category: "Mozarella & Paket",
    desc: "Paket hemat nasi Chicken Katsu + Es Teh Asli + Free Naynay Puding.",
    image: "/assets/menu_crops/mozarella_katsu.jpg",
    badge: "Free Puding",
  },
    {
    name: "Paket 3: Special Beef + Lemon Tea Ice",
    price: 49000,
    category: "Mozarella & Paket",
    desc: "Paket lengkap nasi Daging Sapi Spesial + Es Lemon Tea Segar + Free Naynay Puding.",
    image: "/assets/menu_crops/mozarella_chashu.jpg",
    badge: "Free Puding",
  },

  // ICE CREAM CLAVICULA
    {
    name: "Special Clavi Ice Cream (Straw Cheese Cake)",
    price: 20000,
    category: "Ice Cream",
    desc: "Es krim spesial dengan rasa cheesecake stroberi dan remahan biskuit.",
    image: "/assets/menu_crops/ice_cream_straw_cheesecake.jpg",
  },
    {
    name: "Special Clavi Ice Cream (Taro Cookies)",
    price: 20000,
    category: "Ice Cream",
    desc: "Es krim taro creamy bertabur cookies renyah.",
    image: "/assets/menu_crops/ice_cream_taro_cookies.jpg",
  },
    {
    name: "Special Clavi Ice Cream (Oreo Cookies)",
    price: 20000,
    category: "Ice Cream",
    desc: "Es krim vanila bertabur remah biskuit Oreo gurih.",
    image: "/assets/menu_crops/ice_cream_straw_cheesecake.jpg",
  },
    {
    name: "Ice Cream with Topping (Red Velvet / Matcha)",
    price: 15000,
    category: "Ice Cream",
    desc: "Es krim lembut dengan pilihan saus dan topping bubuk red velvet / matcha.",
    image: "/assets/menu_crops/ice_cream_topping.jpg",
  },
    {
    name: "Ice Cream with Topping (Chocochip / Marshmellow / Regal)",
    price: 15000,
    category: "Ice Cream",
    desc: "Es krim manis dengan taburan chocochip, marshmallow empuk, atau biskuit regal.",
    image: "/assets/menu_crops/ice_cream_topping.jpg",
  },

  // PROMO NGOPI PAGI & NGOPI SORE
    {
    name: "[Promo] Americano (08-10 / 15-17)",
    price: 12000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Harga spesial jam ngopi pagi & sore Clavicula.",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
    badge: "12K Special",
  },
    {
    name: "[Promo] Long Black (08-10 / 15-17)",
    price: 12000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Harga spesial jam ngopi pagi & sore Clavicula.",
    image: "/assets/clavicula/drinks/flavour-americano.webp",
    badge: "12K Special",
  },
    {
    name: "[Promo] Coffeelate (08-10 / 15-17)",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Harga spesial latte lembut di waktu ngopi santai.",
    image: "/assets/clavicula/drinks/flavour-latte.webp",
    badge: "15K Special",
  },
    {
    name: "[Promo] Kentang Goreng (08-10 / 15-17)",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Camilan kentang renyah harga promo.",
    image: "/assets/menu_crops/snack_burger.jpg",
    badge: "15K Snack",
  },
    {
    name: "[Promo] Pisang Bakar (08-10 / 15-17)",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Pisang bakar hangat manis legit bertabur topping.",
    image: "/assets/menu_crops/snack_cireng_pisang.jpg",
    badge: "15K Snack",
  },
    {
    name: "[Promo] Pancake Oneslice (08-10 / 15-17)",
    price: 15000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Satu lembar pancake empuk dengan sirup manis hangat.",
    image: "/assets/menu_crops/snack_croffle.jpg",
    badge: "15K Snack",
  },
    {
    name: "[Promo] Savory Toast Chicken (08-10 / 15-17)",
    price: 20000,
    category: "Promo Ngopi Pagi/Sore",
    desc: "Roti bakar lapis daging ayam gurih kenyang.",
    image: "/assets/menu_crops/snack_burger.jpg",
    badge: "20K Snack",
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
    { title: "Cover Clavicula Coffee & Idea", src: "/assets/extracted/clavi_img_0.jpg" },
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
