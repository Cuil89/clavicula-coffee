import re

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Item 08 in SIGNATURE_LINEUP
old_item_08 = '''  {
    index: "08",
    name: "Tomyam Seporsi Berdua",
    price: 50000,
    category: "Sharing Hot Pot",
    notes: "Udang segar & cumi · Kuah tomyam asam pedas segar · Porsi komplit sharing 2 pax",
    concept: "Sajian hangat pas untuk menghalau hawa dingin pegunungan Slawi & Guci",
    image: "/assets/menu_crops/special_tomyam.jpg",
    badge: "Sharing 2 Pax",
  },'''

new_item_08 = '''  {
    index: "08",
    name: "Dimsum Mentai",
    price: 24000,
    category: "Favorite Snack",
    notes: "Dimsum kukus lembut · Saus mentai creamy torched · Taburan nori & tobiko gurih",
    concept: "Snack favorit Clavicula — perpaduan dimsum daging kenyal dengan lelehan saus mentai bakar",
    image: "/images/menu/foods/dimsum-mentai.webp",
    badge: "Best Seller Snack",
  },'''

assert old_item_08 in content, "old_item_08 not found in content"

# The 29 clean items formatted cleanly
CLEAN_MENU_TS = '''// ─── COMPLETE CAFE MENU (ONLY AUTHENTIC FOOD & BEVERAGE PHOTOGRAPHY) ───
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
    image: "/assets/clavicula/drinks/caramel-macchiato.webp",
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
    image: "/assets/clavicula/drinks/charcoal-blend.webp",
    badge: "Detox Blend",
  },
];'''

# Replace CATEGORIES
old_categories = '''const CATEGORIES = [
  "Semua",
  "Signature Drink (Anatomi)",
  "Espresso Based",
  "Special Clavicula (Steak & Hot Kitchen)",
  "Special Bowl & Noodle",
  "Dessert & Snack",
  "Mocktail Artisan",
  "Non-Coffee & Blend",
  "Tea Based",
  "Ice Cream Clavicula",
];'''

new_categories = '''const CATEGORIES = [
  "Semua",
  "Signature Drink (Anatomi)",
  "Espresso Based",
  "Special Clavicula (Steak & Kitchen)",
  "Special Bowl & Noodle",
  "Dessert & Snack",
  "Non-Coffee & Blend",
];'''

assert old_categories in content, "old_categories not found in content"

# Now let's find the entire ALL_MENU_ITEMS section in content and replace it
start_all_menu = content.find('// ─── COMPLETE CAFE MENU (ALL PICTURED ITEMS WITH VERIFIED HIGH-RES ASSETS) ───')
end_all_menu = content.find('const CATEGORIES = [', start_all_menu)

assert start_all_menu != -1, "start_all_menu not found"
assert end_all_menu != -1, "end_all_menu not found"

print(f"Replacing from {start_all_menu} to {end_all_menu}")

content_new = (
    content[:start_all_menu]
    + CLEAN_MENU_TS
    + "\n\n"
    + content[end_all_menu:]
)

# replace Item 08 in SIGNATURE_LINEUP
content_new = content_new.replace(old_item_08, new_item_08)

# replace CATEGORIES
content_new = content_new.replace(old_categories, new_categories)

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content_new)

print("Successfully written updated src/app/menu/page.tsx!")
