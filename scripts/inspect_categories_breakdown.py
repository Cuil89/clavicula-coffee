import re

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# find CATEGORIES array
cat_match = re.search(r'const CATEGORIES\s*=\s*\[(.*?)\];', c, re.DOTALL)
if cat_match:
    print("Current CATEGORIES:")
    print(cat_match.group(1))

# find all items
items = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"].*?name:\s*[\'"]([^\'"]+)[\'"].*?category:\s*[\'"]([^\'"]+)[\'"].*?image:\s*[\'"]([^\'"]+)[\'"]', c, re.DOTALL)

by_cat = {}
for i_id, name, cat, img in items:
    if cat not in by_cat:
        by_cat[cat] = []
    by_cat[cat].append((name, img, 'menu_crops' in img))

print("\n--- Breakdown by category in ALL_MENU_ITEMS ---")
for cat, it_list in by_cat.items():
    clean_count = sum(1 for _, _, is_crop in it_list if not is_crop)
    crop_count = sum(1 for _, _, is_crop in it_list if is_crop)
    print(f"\n{cat} (Total {len(it_list)}: {clean_count} clean, {crop_count} crops):")
    for name, img, is_crop in it_list:
        status = "[CROP - REMOVE]" if is_crop else "[CLEAN - KEEP]"
        print(f"  {status} {name} -> {img}")
