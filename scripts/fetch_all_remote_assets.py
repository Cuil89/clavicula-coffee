#!/usr/bin/env python3
"""
Skrip Otomatis Pengunduh Seluruh Aset Gambar Asli Clavicula Coffee & Idea
Membaca data/clavicula_master_manifest.json lalu mengunduh:
- Logo Resmi (.webp) & Avatar Instagram
- Foto Depan Tempat (Eksterior Bangunan Industrial Cabang Slawi) & Suasana Teras Cabang Guci
- Banner Gerai GoFood & Foto Kopi Klepon Scapula GoFood
- 15 Foto Menu Minuman Asli (.webp) dari claviculacoffee.id
- 15 Foto Menu Makanan Asli (.webp) dari claviculacoffee.id
"""
import json
import os
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST_PATH = os.path.join(BASE_DIR, "data", "clavicula_master_manifest.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

def download_file(url, dest_rel):
    if not url:
        return
    dest_path = os.path.join(BASE_DIR, "public", dest_rel)
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp, open(dest_path, "wb") as out:
            out.write(resp.read())
        print(f"[OK] Berhasil mengunduh: public/{dest_rel}")
    except Exception as e:
        print(f"[SKIP/FALLBACK] Gagal mengunduh {url} -> {e}")

def main():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("=== 1. Mengunduh Logo, Foto Depan Tempat (Slawi & Guci), & Banner Gerai ===")
    for asset in data.get("non_menu_site_assets", []):
        download_file(asset.get("remote_url"), asset.get("local_path"))

    print("\n=== 2. Mengunduh 15 Foto Menu Minuman Asli (claviculacoffee.id) ===")
    for drink in data.get("scraped_drink_images_15", []):
        download_file(drink.get("remote_url"), drink.get("local_path"))

    print("\n=== 3. Mengunduh 15 Foto Menu Makanan Asli (claviculacoffee.id) ===")
    for food in data.get("scraped_food_images_15", []):
        download_file(food.get("remote_url"), food.get("local_path"))

    print("\nSelesai! Semua gambar telah tersimpan sesuai penamaan di data/clavicula_master_manifest.json.")

if __name__ == "__main__":
    main()
