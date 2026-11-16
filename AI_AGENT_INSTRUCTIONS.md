# AI Agent Integration Guide — Clavicula Coffee & Idea Asset Pack

Paket ini dirancang khusus agar **AI Coding Agent** (seperti **Cline**, **Antigravity IDE**, **Cursor**, atau **Claude Code**) dapat langsung memasang seluruh aset gambar, logo, foto depan tempat (Cabang Slawi & Guci), serta katalog 43 SKU ke dalam proyek web **Clavicula Coffee & Idea** tanpa kebingungan mencocokkan nama file.

## 1. Langkah Pertama yang Harus Dijalankan AI Agent

1. Salin folder `public/assets/clavicula/` dan `data/clavicula_master_manifest.json` ke dalam root proyek web/Laravel.
2. Jalankan perintah berikut di terminal lokal untuk mengunduh seluruh file `.webp` dan `.jpg` asli dari server `claviculacoffee.id`, `tribunnews.com` (Foto Depan Tempat Slawi), `radartegal.disway.id` (Foto Tempat Guci), dan `GoFood`:
   ```bash
   python3 scripts/fetch_all_remote_assets.py
   ```
   *(Catatan: Di dalam folder `public/assets/clavicula/` juga sudah disertakan gambar lokal beresolusi tinggi untuk Roastery Lab, Slow Bar V60, Kemasan Biji Kopi, Ruang WFC, dan Logo SVG sehingga tampilan web langsung berjalan rapi meskipun sedang offline).*

## 2. Pemetaan Nama File untuk Elemen Non-Menu (Logo, Hero, & Foto Depan Tempat)

Gunakan tabel pemetaan di bawah ini saat memasang gambar ke komponen Blade / HTML:

| Elemen Website | Path Lokal Standar (`public/...`) | Keterangan Visual |
| :--- | :--- | :--- |
| **Logo Navbar & Footer** | `assets/clavicula/logo/logo-clavicula.webp` | Logo resmi Clavicula Coffee & Idea (Fallback SVG: `assets/clavicula/logo/logo-clavicula-vector.svg`) |
| **Avatar Profil Instagram** | `assets/clavicula/logo/avatar-instagram-clavicula.jpg` | Foto profil resmi `@clavicula_coffee` |
| **Foto Depan Tempat (Cabang 1 Slawi)** | `assets/clavicula/places/depan-tempat-clavicula-slawi.webp` | Foto asli bangunan depan bergaya industrial Clavicula Coffee & Idea di Jl. Dr. Soetomo No. 3 Kalisapu, Slawi dengan tulisan besar `CLAVICULA` dan tangga menuju *rooftop* |
| **Foto Tempat & View (Cabang 2 Guci)** | `assets/clavicula/places/suasana-tempat-clavicula-guci-hills.png` | Foto asli balkon outdoor Clavicula Coffee & Hills di kawasan wisata Guci Tegal menghadap pegunungan hijau |
| **Banner Outlet GoFood** | `assets/clavicula/places/banner-outlet-clavicula-gofood.jpg` | Banner gerai resmi dari GoFood Clavicula Coffee & Idea |
| **Hero / Kemasan Roastery** | `assets/clavicula/places/hero-slowbar-clavicula.jpg` | Foto kemasan pouch biji kopi hitam/kraft dan secangkir espresso di atas meja batu |
| **Seksi Cerita 01: Roastery Lab** | `assets/clavicula/places/roastery-lab-clavicula-slawi.jpg` | Foto mesin sangrai kopi *small-batch roastery* |
| **Seksi Cerita 02: Slow Bar V60** | `assets/clavicula/places/slow-bar-v60-clavicula.jpg` | Foto penyeduhan manual brew V60 dengan teko leher angsa |
| **Seksi Cerita 03: Ruang WFC** | `assets/clavicula/places/ruang-wfc-slawi-dan-view-guci.jpg` | Foto suasana kerja *Work From Cafe* (WFC) meja kayu & pemandangan hijau |

## 3. Pemetaan Nama File Produk Roastery Beans (4 Basis Biji Kopi)

| Kode SKU | Nama Produk Roastery | Path Gambar Lokal (`public/...`) | Harga (200g / 500g / 1kg) |
| :--- | :--- | :--- | :--- |
| `RB-01` | Clavicula House Blend (80% Arabica : 20% Robusta) | `assets/clavicula/roastery/rb-01-clavicula-house-blend.jpg` | Rp65.000 / Rp145.000 / Rp270.000 |
| `RB-02` | Single Origin Arabica Lokal V60 | `assets/clavicula/roastery/rb-02-arabica-lokal-v60.jpg` | Rp85.000 / Rp195.000 / Rp370.000 |
| `RB-03` | Single Origin Arabica Impor V60 Luar | `assets/clavicula/roastery/rb-03-arabica-impor-v60-luar.jpg` | Rp120.000 / Rp280.000 / Rp520.000 |
| `RB-04` | Fine Robusta Selection | `assets/clavicula/roastery/rb-04-fine-robusta-selection.jpg` | Rp55.000 / Rp125.000 / Rp230.000 |

## 4. Pemetaan Nama File 15 Menu Minuman Asli (`public/assets/clavicula/drinks/`)

Seluruh file berikut diunduh otomatis oleh `scripts/fetch_all_remote_assets.py` dari `claviculacoffee.id`:
- `assets/clavicula/drinks/manubrium.webp` (`SG-01` Manubrium — Kopi Susu Gula Aren)
- `assets/clavicula/drinks/acromion.webp` (`SG-02` Acromion — Kopi Susu Biskuit Regal)
- `assets/clavicula/drinks/sternum.webp` (`SG-03` Sternum — Kopi Susu Karamel & Whip Cream)
- `assets/clavicula/drinks/scapula.webp` (`SG-04` Scapula — Kopi Susu Klepon Pandan Kelapa)
- `assets/clavicula/drinks/costa.webp` (`SG-06` Costa — Kopi Susu Nutella & Ice Cream)
- `assets/clavicula/drinks/trapezius.webp` (`SG-10` Trapezius — Strawberry Milk Cream)
- `assets/clavicula/drinks/kopi-susu-ori.webp` (`EB-04` Kopi Susu Ori)
- `assets/clavicula/drinks/flavour-americano.webp` (`EB-05` Flavour Americano)
- `assets/clavicula/drinks/affogato.webp` (`EB-08` Affogato)
- `assets/clavicula/drinks/caramel-macchiato.webp` (`EB-09` Caramel Macchiato)
- `assets/clavicula/drinks/coffee-lemonade.webp` (`EB-11` Coffee Lemonade)
- `assets/clavicula/drinks/flavour-latte.webp` (`EB-12` Flavour Latte)
- `assets/clavicula/drinks/cookies-coffee.webp` (`EB-14` Cookies Coffee)
- `assets/clavicula/drinks/matcha-coffee-latte.webp` (`EB-15` Matcha Coffee Latte)
- `assets/clavicula/drinks/charcoal-blend.webp` (`NC-01` Charcoal Blend)

## 5. Pemetaan Nama File 15 Menu Makanan Pendamping (`public/assets/clavicula/foods/`)

- `assets/clavicula/foods/beef-burger.webp` (Beef Burger — Rp32.000)
- `assets/clavicula/foods/chicken-katsu-spicy.webp` (Chicken Katsu Spicy — Rp28.000)
- `assets/clavicula/foods/chicken-katsu-with-sauce.webp` (Chicken Katsu With Sauce — Rp28.000)
- `assets/clavicula/foods/dimsum-mentai.webp` (Dimsum Mentai — Rp28.000)
- `assets/clavicula/foods/dimsum-ori.webp` (Dimsum Ori — Rp24.000)
- `assets/clavicula/foods/gochucula-chicken-wings.webp` (Gochucula Chicken Wings — Rp29.000)
- `assets/clavicula/foods/hotdog.webp` (Hotdog — Rp36.000)
- `assets/clavicula/foods/javanese-fried-noodles.webp` (Javanese Fried Noodles — Rp23.000)
- `assets/clavicula/foods/javanese-fried-rice.webp` (Javanese Fried Rice — Rp23.000)
- `assets/clavicula/foods/mentai-rice.webp` (Mentai Rice — Rp35.000)
- `assets/clavicula/foods/mille-crepes.webp` (Mille Crepes — Rp37.000)
- `assets/clavicula/foods/sate-taichan-mozarella.webp` (Sate Taichan Mozarella — Rp31.000)
- `assets/clavicula/foods/strawberry-cheesecake.webp` (Strawberry Cheesecake — Rp35.000)
- `assets/clavicula/foods/tiramisu-cake.webp` (Tiramisu Cake — Rp48.000)
- `assets/clavicula/foods/yakitori.webp` (Yakitori — Rp28.000)
