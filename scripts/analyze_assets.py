import json
import os

with open('clavicula_web_assets/menu.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Merchant: {data.get('merchant')}")
print(f"Banner: {data.get('banner')}")
print(f"Total items: {len(data['items'])}")

cats = {}
for it in data['items']:
    cats.setdefault(it['category'], []).append(it)

for c, items in cats.items():
    print(f"\n=== Category: {c} ({len(items)} items) ===")
    for it in items:
        img_exists = os.path.exists(os.path.join('clavicula_web_assets', it['image']))
        print(f"  - [{it['slug']}] {it['name']} (Rp {it['price']:,}) -> {it['image']} (exists: {img_exists})")
