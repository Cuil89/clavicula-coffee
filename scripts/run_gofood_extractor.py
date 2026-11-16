import json
import os
import sys

# Path to the extracted pack
pack_dir = os.path.join(os.getcwd(), "extracted_gofood_pack", "clavicula_gofood_clean_pack")
pictured_json = os.path.join(pack_dir, "data", "clavicula_gofood_pictured_menus_only.json")
full_json = os.path.join(pack_dir, "data", "clavicula_gofood_full_153_menus.json")

print("Checking JSON data...")
with open(pictured_json, "r", encoding="utf-8") as f:
    pic_data = json.load(f)

with open(full_json, "r", encoding="utf-8") as f:
    all_data = json.load(f)

print(f"Total Brand Assets: {len(pic_data.get('brand_assets', []))}")
print(f"Total Pictured Menus: {len(pic_data.get('pictured_menus', []))}")
print(f"Total Menus in Full 153 DB: {len(all_data.get('menus', [])) if isinstance(all_data, dict) and 'menus' in all_data else len(all_data)}")

print("\n--- BRAND ASSETS ---")
for b in pic_data.get("brand_assets", []):
    print(f"  * {b['name']}: {b['source_image_url']} -> {b['laravel_public_path']}")

print("\n--- PICTURED MENUS (36 ITEMS) ---")
for i, m in enumerate(pic_data.get("pictured_menus", []), 1):
    print(f"  {i:02d}. [{m['category']}] {m['name']} (Rp {m['price_gofood_idr']:,}) -> {m['clean_image_filename']}")
    print(f"      URL: {m['source_image_url']}")
    if m.get('gofood_cdn_url'):
        print(f"      CDN: {m['gofood_cdn_url']}")
