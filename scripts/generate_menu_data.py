import json
import os

with open('clavicula_web_assets/menu.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

# Fallback/enhancement dictionary for concise tasting notes and badges
enhancements = {
    "manubrium": {
        "notes": "Kopi susu gula aren · Layer krim lembut · Double espresso bold",
        "badge": "Signature No. 1",
        "isSignature": True,
        "isBestSeller": True,
    },
    "acromion": {
        "notes": "Caramelized milk · Espresso aromatik · Remahan biskuit regal gurih",
        "badge": "Must Try",
        "isSignature": True,
        "isBestSeller": True,
    },
    "sternum": {
        "notes": "Cold brew arabika · Saus karamel leleh · Manis seimbang creamy",
        "badge": "Caramel Cold Brew",
        "isSignature": True,
    },
    "scapula": {
        "notes": "Pandan klepon nusantara · Kelapa gurih · Double espresso arabika",
        "badge": "Nusantara Heritage",
        "isSignature": True,
        "isBestSeller": True,
    },
    "costa": {
        "notes": "Nutella hazelnut legit · Double espresso arabika · Vanilla ice cream scoop",
        "badge": "Nutella Specialty",
        "isSignature": True,
    },
    "trapezius": {
        "notes": "Fresh strawberry swirl · Susu lembut dingin · Kopi eksotis",
        "badge": "Fruit & Cream Fusion",
        "isSignature": True,
    },
    "vomer": {
        "notes": "Cold brew aromatik · Perasan lemon sitrun asam segar · Daun mint dingin",
        "badge": "Citrus Cooler",
        "isSignature": True,
    },
    "brachialis": {
        "notes": "Espresso aromatik · Buah kiwi segar · Pisang lembut shake over ice",
        "badge": "Fruit Botanical",
        "isSignature": True,
    },
    "ulnaris": {
        "notes": "Espresso dingin · Fresh floral botanic · Perasan citrus sparkling",
        "badge": "Anatomy Mocktail",
        "isSignature": True,
    },
    "radius": {
        "notes": "Espresso blend · Tropical fruit twist · Sensasi soda segar dingin",
        "badge": "Anatomy Mocktail",
        "isSignature": True,
    },
    "kopi-susu-ori": {
        "notes": "Espresso robusta-arabika · Susu kental manis · Fresh milk dingin",
        "badge": "All-Day Classic",
        "isBestSeller": True,
    },
    "flavour-latte": {
        "notes": "Sirup hazelnut/vanilla/caramel · Double ristretto · Steamed milk silky",
        "badge": "Barista Special",
    },
    "coffee-lemonade": {
        "notes": "Lemon segar · Soda dingin effervescent · Espresso float segar",
        "badge": "Summer Cooler",
    },
    "caramel-machiato": {
        "notes": "Vanilla syrup · Foamed milk · Espresso drizzle · Saus karamel legit",
        "badge": "Sweet Caramel",
    },
    "affogato": {
        "notes": "2 scoop vanilla gelato · Hot double ristretto pour aromatik",
        "badge": "Classic Italian",
    },
    "matcha-coffee-latte": {
        "notes": "Pure Uji Matcha · Fresh milk · Layer double shot espresso harum",
        "badge": "Artisan Layer",
    },
    "matcha-latte": {
        "notes": "Uji Matcha murni Jepang · Susu segar hangat/dingin · Creamy lembut",
        "badge": "Best Non-Coffee",
        "isBestSeller": True,
    },
    "carcoal-blend": {
        "notes": "Activated bamboo charcoal · Susu segar gurih · Manis menenangkan",
        "badge": "Detox Blend",
    },
    "mentai-rice": {
        "notes": "Nasi pulen Jepang · Topping daging gurih · Saus mentai torched smoky",
        "badge": "Torched Mentai",
        "isBestSeller": True,
        "desc": "Nasi hangat ditutupi daging olahan lezat dan siraman saus mentai bakar beraroma khas smoky menggugah selera."
    },
    "chicken-katsu-with-sauce": {
        "notes": "Fillet ayam krispi tebal · Nasi pulen hangat · Saus gurih pilihan",
        "badge": "Best Value",
        "desc": "Ayam fillet katsu goreng renyah keemasan disiram saus gurih spesial di atas semangkuk nasi pulen."
    },
    "chicken-katsu-spicy": {
        "notes": "Katsu dada ayam renyah · Bumbu cabai pedas meresap · Nasi hangat",
        "badge": "Spicy Lovers",
        "desc": "Ayam katsu gurih renyah berpadu baluran saus pedas nikmat untuk penikmat cita rasa pedas mantap."
    },
    "javanese-fried-rice": {
        "notes": "Nasi goreng bumbu rempah Jawa · Suwiran ayam · Kerupuk & acar",
        "badge": "Indonesian Classic",
        "desc": "Nasi goreng racikan bumbu khas tradisional Jawa beraroma wajan panas smoky gurih manis pas."
    },
    "javanese-fried-noodles": {
        "notes": "Mie telur kenyal · Bumbu kecap rempah wangi · Sayuran segar & telur",
        "badge": "Chef Choice",
        "desc": "Mie goreng gurih nikmat dimasak dengan api besar bersama sayur segar, telur, dan bumbu rempah autentik."
    },
    "special-beef-fried-with-sauce": {
        "notes": "Daging sapi pilihan renyah · Nasi hangat · Siraman saus gurih khas Clavicula",
        "badge": "Beef Bowl",
        "desc": "Olahan daging sapi goreng renyah bumbu meresap disiram saus spesial gurih manis di atas nasi pulen."
    },
    "special-beef-geprek-mozarella": {
        "notes": "Daging sapi geprek pedas · Lelehan keju mozarella tebal · Nasi pulen",
        "badge": "Mozarella Melt",
        "desc": "Daging sapi geprek bumbu pedas nendang diselimuti keju mozarella panggang meleleh gurih."
    },
    "fried-noodles-with-egg-salted": {
        "notes": "Mie goreng bumbu telur asin creamy · Topping telur & sayuran renyah",
        "badge": "Salted Egg",
        "desc": "Mie goreng gurih berlumur saus kuning telur asin nikmat dengan aroma gurih khas menggoda selera."
    },
    "tomyam": {
        "notes": "Kuah tomyam asam pedas segar khas Thailand · Seafood & jamur hangat",
        "badge": "Warm Seafood Sup",
        "desc": "Sup tomyam berkuah rempah hangat asam pedas kaya rasa dengan aneka isian seafood segar."
    },
    "dimsum-ori": {
        "notes": "Dimsum ayam kukus pulen · Chili oil pedas harum · Porsi hangat",
        "badge": "Dimsum Classic",
        "desc": "Dimsum kukus renyah gurih daging ayam segar disajikan hangat dengan dipping chili oil aromatik."
    },
    "dimsum-mentai": {
        "notes": "Dimsum kukus lembut · Saus mentai creamy bakar · Taburan nori gurih",
        "badge": "Best Seller Snack",
        "isBestSeller": True,
        "desc": "Dimsum olahan ayam dan udang kenyal gurih dibalut lelehan saus mentai gurih beraroma bakar torched."
    },
    "yakitori": {
        "notes": "Sate ayam fillet empuk · Saus tare manis gurih karamel · Panggang arang",
        "badge": "Japanese Pick",
        "isBestSeller": True,
        "desc": "Sate ayam khas Jepang dengan potongan daging paha empuk berlumur saus tare gurih manis dipanggang merata."
    },
    "gochucula-chicken-wings": {
        "notes": "Sayap ayam goreng garing · Glaze gochujang manis pedas Korea · Wijen",
        "badge": "Korean Glazed",
        "desc": "Sayap ayam renyah berbalut saus gochujang khas Korea dengan sensasi manis gurih pedas bikin nagih."
    },
    "sate-taichan": {
        "notes": "Sate dada ayam panggang gurih · Sambal taichan pedas asam segar · Jeruk nipis",
        "badge": "Taichan Gurih",
        "desc": "Sate ayam tanpa kecap dipanggang gurih empuk disajikan dengan sambal taichan pedas segar perasan jeruk."
    },
    "sate-taichan-mozarella": {
        "notes": "Daging dada ayam panggang · Sambal taichan pedas · Keju mozarella leleh",
        "badge": "Taichan Mozarella",
        "desc": "Sate taichan daging ayam lembut diselimuti lelehan keju mozarella molor dan sambal taichan pedas nendang."
    },
    "taiwanese-fried-chicken": {
        "notes": "Ayam goreng fillet krispi bumbu rempah Taiwan · Taburan lada garam",
        "badge": "Crispy Streetfood",
        "desc": "Potongan ayam goreng renyah ala street food Taiwan berbalut bumbu lada aromatik renyah gurih."
    },
    "chicken-pop": {
        "notes": "Bite-sized chicken popcorn renyah · Bumbu gurih savory · Camilan santai",
        "badge": "Crispy Bites",
        "desc": "Daging ayam goreng potongan sekali gigit bertekstur krispi di luar dan juicy di dalam."
    },
    "savory-toast": {
        "notes": "Roti panggang mentega gurih · Isian telur, daging & saus creamy lezat",
        "badge": "Warm Toast",
        "desc": "Roti tawar panggang renyah bermentega tebal dengan isian savory gurih mantap penambah energi."
    },
    "sweet-toast": {
        "notes": "Roti panggang empuk hangat · Olesan cokelat/keju/manis lumer pilihan",
        "badge": "Sweet Breakfast",
        "desc": "Roti panggang hangat lembut dengan taburan manis legit lumer di lidah teman ngopi ideal."
    },
    "potato-stick": {
        "notes": "Kentang goreng stik renyah keemasan · Taburan garam gurih · Saus cocol",
        "badge": "Classic Fries",
        "desc": "Kentang goreng renyah garing di luar lembut di dalam disajikan hangat dengan saus cocolan nikmat."
    },
    "rujak-cireng-ortega": {
        "notes": "Cireng kenyal renyah keemasan · Saus rujak gula aren pedas asam legit",
        "badge": "Nusantara Snack",
        "desc": "Cireng goreng renyah garing kenyal berpadu siraman sambal rujak manis asam pedas khas Jawa Barat."
    },
    "bakso-goreng-ortega": {
        "notes": "Bakso goreng mekar renyah · Bumbu gurih daging gurih · Saus pedas nikmat",
        "badge": "Crispy Meatball",
        "desc": "Bakso daging gurih digoreng mekar krispi bertekstur kenyal nikmat dicocol saus pedas."
    },
    "pancake": {
        "notes": "Pancake lembut fluffy · Sirup karamel/madu lezat · Butter harum",
        "badge": "Fluffy Pancake",
        "desc": "Pancake hangat bertekstur lembut empuk dengan lelehan mentega dan guyuran saus manis menggoda."
    },
    "spring-roll": {
        "notes": "Lumpia goreng kulit renyah · Isian sayur & daging gurih · Saus manis gurih",
        "badge": "Crispy Rolls",
        "desc": "Lumpia gulung renyah isi sayuran segar dan daging gurih disajikan hangat dengan saus cocolan."
    },
    "strawberry-chessecake": {
        "notes": "Cheesecake lembut creamy · Saus stroberi segar manis asam · Crumb gurih",
        "badge": "Artisan Cake",
        "desc": "Kue keju lembut premium dengan sentuhan selai stroberi segar asam manis seimbang."
    },
    "tiramisu-cake": {
        "notes": "Ladyfinger sponge renyah lembut · Kopi espresso soak · Krim mascarpone & cocoa",
        "badge": "Sweet Tooth",
        "desc": "Kue tiramisu klasik Italia dengan lapisan krim lembut berpadu aroma rendaman espresso otentik."
    },
    "tempe-goreng": {
        "notes": "Tempe kedelai gurih dibalut bumbu ketumbar renyah · Sambal kecap pedas",
        "badge": "Indonesian Snack",
        "desc": "Tempe kedelai segar digoreng gurih beraroma bumbu tradisional disajikan hangat dengan sambal kecap cabai rawit."
    },
    "pisang-bakar": {
        "notes": "Pisang kepok bakar manis karamel · Parutan keju, cokelat & susu kental",
        "badge": "Traditional Sweet",
        "desc": "Pisang bakar manis legit beraroma wangi arang dipadukan limpahan parutan keju gurih dan susu kental manis."
    },
    "onion-ring": {
        "notes": "Bawang bombay lapis tepung renyah keemasan · Gurih manis alami",
        "badge": "Crispy Rings",
        "desc": "Irisan bawang bombay manis renyah dibalut adonan tepung krispi keemasan."
    },
    "beef-burger": {
        "notes": "Patty daging sapi panggang juicy · Roti bun wijen empuk · Selada, tomat & saus",
        "badge": "Juicy Burger",
        "desc": "Burger daging sapi panggang empuk dengan lapisan selada segar, tomat, dan saus spesial di dalam roti lembut."
    },
    "beef-burger-mozarella": {
        "notes": "Patty daging sapi tebal juicy · Keju mozarella leleh molor · Saus gurih lezat",
        "badge": "Cheesy Burger",
        "desc": "Burger daging sapi pilihan diselimuti keju mozarella panggang meleleh gurih melimpah."
    },
    "croffle-clavicula": {
        "notes": "Croissant panggang renyah berkaramel waffle · Taburan gula halus & topping",
        "badge": "Trending Pastry",
        "isBestSeller": True,
        "desc": "Adonan croissant mentega dipanggang dalam cetakan waffle renyah di luar berlapis lembut di dalam."
    },
    "hotdog": {
        "notes": "Sosis panggang jumbo juicy · Roti bun empuk hangat · Saus mayo & mustard",
        "badge": "Classic Hotdog",
        "desc": "Roti hotdog panggang lembut dengan sosis jumbo berkualitas, saus gurih nikmat dan taburan mustard."
    },
    "churros": {
        "notes": "Churros goreng renyah taburan kayu manis & gula aren · Saus cokelat pekat",
        "badge": "Spanish Churros",
        "desc": "Kue goreng khas Spanyol bertekstur krispi bertabur bubuk kayu manis harum dengan dipping saus cokelat lezat."
    },
    "japanese-fruit-sandwich": {
        "notes": "Roti tawar lembut tanpa kulit · Krim vanila dingin segar · Buah stroberi/kiwi segar",
        "badge": "Japanese Sando",
        "desc": "Sandwich buah segar gaya Jepang dengan lapisan krim lembut segar dan potongan buah manis asam menyejukkan."
    },
    "lemon-tea": {
        "notes": "Teh hitam pilihan diseduh dingin · Perasan lemon segar asam menyejukkan",
        "badge": "Refreshing Tea",
        "desc": "Kesegaran seduhan daun teh aromatik dipadu perasan buah lemon sitrun asli penyejuk hari terik."
    },
    "original-tea-humerus": {
        "notes": "Seduhan teh wangi khas Clavicula · Harum melati alami segar · Manis pas",
        "badge": "Anatomy Tea",
        "desc": "Seduhan teh melati tradisional khas Slawi yang wangi, jernih, dan menenangkan jiwa."
    },
    "original-mojito": {
        "notes": "Perasan jeruk nipis segar · Daun mint dingin ditumbuk · Soda effervescent dingin",
        "badge": "Classic Mojito",
        "desc": "Minuman mocktail dingin menyegarkan memadukan aroma mint segar, soda sparkling, dan kesegaran perasan jeruk nipis."
    },
    "french-press": {
        "notes": "Seduhan presisi French Press · Ekstraksi full body tebal · Minyak kopi aromatik",
        "badge": "Manual Brew",
        "desc": "Metode seduh sedimen kopi dengan french press menghasilkan bodi kopi tebal mantap dan aroma pekat alami."
    },
    "kopi-tubruk": {
        "notes": "Kopi tubruk tradisional nusantara · Bubuk kopi sangrai segar · Manis sedap mantap",
        "badge": "Nusantara Brew",
        "desc": "Seduhan kopi tubruk klasik Indonesia menggunakan biji kopi sangrai segar pilihan beraroma pekat dan otentik."
    },
}

processed_items = []
for it in raw["items"]:
    slug = it["slug"]
    enh = enhancements.get(slug, {})
    
    # Clean description
    desc = it.get("description") or enh.get("desc") or f"{it['name']} sajian autentik pilihan Clavicula Coffee & Idea."
    desc = desc.strip()
    
    # Tasting notes
    notes = enh.get("notes") or desc
    if len(notes) > 120:
        notes = notes[:117] + "..."
    
    # Image path (serve directly from Next.js public directory)
    img_path = f"/images/{slug}.jpg"
    
    item_dict = {
        "id": f"menu-{slug}",
        "slug": slug,
        "name": it["name"],
        "price": it["price"],
        "category": it["category"],
        "notes": notes,
        "desc": desc,
        "image": img_path,
        "badge": enh.get("badge"),
        "isSignature": enh.get("isSignature", False),
        "isBestSeller": enh.get("isBestSeller", False),
    }
    processed_items.append(item_dict)

print(f"Processed {len(processed_items)} items successfully!")

items_json = json.dumps(processed_items, indent=2, ensure_ascii=False)

header = '''// AUTO-GENERATED FROM clavicula_web_assets/menu.json
// Official Clavicula Coffee & Idea Menu Data & Full HD Images (88 Items)

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  notes: string;
  desc: string;
  image: string;
  badge?: string | null;
  isSignature?: boolean;
  isBestSeller?: boolean;
  concept?: string;
}

export const CATEGORIES = [
  "Semua",
  "Signature Drink",
  "Espresso Based",
  "Blend Dan Non Coffee",
  "Desert dan Snack",
  "Special Bowl",
  "Tea Based",
  "Mocktail",
  "Manual Brew",
  "Sup",
] as const;

export type MenuCategory = typeof CATEGORIES[number];

// ─── THE 8 CURATED SIGNATURE HIGHLIGHTS (EMBER STYLE) ─────────────────────
export const SIGNATURE_LINEUP: Array<MenuItem & { index: string; concept: string }> = [
  {
    id: "menu-manubrium",
    index: "01",
    slug: "manubrium",
    name: "Manubrium",
    price: 33000,
    category: "Signature Drink",
    notes: "Kopi susu gula aren · Layer krim lembut · Double espresso bold",
    concept: "Anatomi: Tulang hulu dada — racikan signature legendaris fondasi awal Clavicula Coffee",
    desc: "Minuman Kopi Susu Kekinian Dengan Tambahan Cream Dan Gula Aren Yang Menciptakan Kopi Susu Dengan Rasa Aren Yang Khas",
    image: "/images/manubrium.jpg",
    badge: "Signature No. 1",
    isSignature: true,
    isBestSeller: true,
  },
  {
    id: "menu-acromion",
    index: "02",
    slug: "acromion",
    name: "Acromion",
    price: 32000,
    category: "Signature Drink",
    notes: "Caramelized milk · Espresso aromatik · Remahan biskuit regal gurih",
    concept: "Anatomi: Puncak tulang bahu — jembatan gerakan presisi tangan barista",
    desc: "Kopi Susu Kekinian Yang Dipadu Dengan Gurihnya Biskuit Regal Dan Cream",
    image: "/images/acromion.jpg",
    badge: "Must Try",
    isSignature: true,
    isBestSeller: true,
  },
  {
    id: "menu-sternum",
    index: "03",
    slug: "sternum",
    name: "Sternum",
    price: 32000,
    category: "Signature Drink",
    notes: "Cold brew arabika · Saus karamel leleh · Manis seimbang creamy",
    concept: "Anatomi: Tulang dada tengah — perisai penyeimbang rasa kopi dan manis karamel dingin",
    desc: "Kopi Susu Kekinian Dengan Cita Rasa Caramel Yang Khas Dipadu Dengan Lembutnya Whip Cream",
    image: "/images/sternum.jpg",
    badge: "Caramel Cold Brew",
    isSignature: true,
  },
  {
    id: "menu-scapula",
    index: "04",
    slug: "scapula",
    name: "Scapula",
    price: 32000,
    category: "Signature Drink",
    notes: "Pandan klepon nusantara · Kelapa gurih · Double espresso arabika",
    concept: "Anatomi: Tulang belikat — sayap rasa tradisional bernuansa modern",
    desc: "Kopi Susu Kekinian Dengan Cita Rasa Klepon Yang Khas Dan Unik",
    image: "/images/scapula.jpg",
    badge: "Nusantara Heritage",
    isSignature: true,
    isBestSeller: true,
  },
  {
    id: "menu-costa",
    index: "05",
    slug: "costa",
    name: "Costa",
    price: 38000,
    category: "Signature Drink",
    notes: "Nutella hazelnut legit · Double espresso arabika · Vanilla ice cream scoop",
    concept: "Anatomi: Tulang rusuk — melindungi kehangatan rasa terdalam",
    desc: "Kopi susu dengan tambahan manisnya nutella dengan scoop ice cream vanila",
    image: "/images/costa.jpg",
    badge: "Nutella Specialty",
    isSignature: true,
  },
  {
    id: "menu-trapezius",
    index: "06",
    slug: "trapezius",
    name: "Trapezius",
    price: 32000,
    category: "Signature Drink",
    notes: "Fresh strawberry swirl · Susu lembut dingin · Kopi eksotis",
    concept: "Anatomi: Otot trapezius — relaksasi rasa manis segar yang menenangkan",
    desc: "Unik Dan Segarnya Jus Strawberry Yang Kental Dipadu Dengan Creamy Dan Gurihnya Susu",
    image: "/images/trapezius.jpg",
    badge: "Fruit & Cream Fusion",
    isSignature: true,
  },
  {
    id: "menu-vomer",
    index: "07",
    slug: "vomer",
    name: "Vomer",
    price: 28000,
    category: "Mocktail",
    notes: "Cold brew aromatik · Perasan lemon sitrun asam segar · Daun mint dingin",
    concept: "Anatomi: Tulang rongga hidung — aroma citrus tajam melegakan pernapasan",
    desc: "Vomer sajian mocktail segar berbasis kopi dan sari buah sitrun dingin.",
    image: "/images/vomer.jpg",
    badge: "Citrus Cooler",
    isSignature: true,
  },
  {
    id: "menu-brachialis",
    index: "08",
    slug: "brachialis",
    name: "Brachialis",
    price: 28000,
    category: "Mocktail",
    notes: "Espresso aromatik · Buah kiwi segar · Pisang lembut shake over ice",
    concept: "Anatomi: Otot lengan atas — tenaga segar paduan buah dan ekstrak kopi berkarakter",
    desc: "Brachialis kombinasi eksotis buah kiwi segar, sentuhan pisang lembut, dan espresso punch dingin.",
    image: "/images/brachialis.jpg",
    badge: "Fruit Botanical",
    isSignature: true,
  },
];

// ─── COMPLETE 88 AUTHENTIC MENU ITEMS FROM CLAVICULA WEB ASSETS ───────────
export const ALL_MENU_ITEMS: MenuItem[] = '''

with open("src/data/menuData.ts", "w", encoding="utf-8") as f:
    f.write(header)
    f.write(items_json)
    f.write(";\n")

print("Wrote src/data/menuData.ts successfully!")
