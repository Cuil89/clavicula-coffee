with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

import re
pattern = re.compile(r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*price:\s*(\d+),\s*category:\s*"([^"]+)"')
items = pattern.findall(code)
print(f"Total items found: {len(items)}")
for cat in ["Signature Drink (Anatomi)", "Espresso Based", "Special Clavicula (Steak & Kitchen)", "Special Bowl & Noodle", "Dessert & Snack", "Non-Coffee & Blend"]:
    cat_items = [it for it in items if it[3] == cat]
    print(f"\n--- {cat} ({len(cat_items)} items) ---")
    for it in cat_items:
        print(f"  {it[0]}: {it[1]} (Rp {int(it[2]):,})")
