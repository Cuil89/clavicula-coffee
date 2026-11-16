with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    home_text = f.read()

import re
matches = re.findall(r'name:\s*"([^"]+)",\s*price:\s*(\d+)', home_text)
print("--- HOME PAGE ITEMS & PRICES ---")
for m in matches:
    print(f"{m[0]}: Rp {int(m[1]):,}")

with open("src/app/menu/page.tsx", "r", encoding="utf-8") as f:
    menu_text = f.read()

menu_matches = re.findall(r'name:\s*"([^"]+)",\s*price:\s*(\d+)', menu_text)
print("\n--- MENU PAGE FIRST 25 ITEMS & PRICES ---")
for m in menu_matches[:25]:
    print(f"{m[0]}: Rp {int(m[1]):,}")
