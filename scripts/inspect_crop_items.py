import re

text = open('src/app/menu/page.tsx', encoding='utf-8').read()
items = re.findall(r'{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*price:\s*(\d+),\s*category:\s*"([^"]+)",[^}]+image:\s*"([^"]+)"', text)

print(f"Total parsed items: {len(items)}")
crop_items = [it for it in items if "menu_crops" in it[4]]
clean_items = [it for it in items if "menu_crops" not in it[4]]

print(f"\n--- Clean / Authentic Images ({len(clean_items)}) ---")
for it in clean_items:
    print(f"  [{it[3]}] {it[1]} -> {it[4]}")

print(f"\n--- Ugly Paper Menu Crops ({len(crop_items)}) ---")
for it in crop_items:
    print(f"  [{it[3]}] {it[1]} -> {it[4]}")
