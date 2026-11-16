import re
import os

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# find all item blocks in ALL_MENU_ITEMS
# item blocks are separated by { ... }
start_pos = c.find('const ALL_MENU_ITEMS')
end_pos = c.find('// ─── UTILITY HELPERS', start_pos)
all_menu_text = c[start_pos:end_pos]

# match each item
items_raw = re.findall(r'\{\s*id:\s*"([^"]+)".*?name:\s*"([^"]+)".*?price:\s*([0-9]+).*?category:\s*"([^"]+)".*?notes:\s*"([^"]+)".*?desc:\s*"([^"]+)".*?image:\s*"([^"]+)".*?\}', all_menu_text, re.DOTALL)

print(f"Total parsed raw items in ALL_MENU_ITEMS: {len(items_raw)}")

clean_items = []
for it in items_raw:
    i_id, name, price, cat, notes, desc, img = it
    if 'menu_crops' not in img:
        # verify image path on disk
        disk_path = 'public' + img if img.startswith('/') else os.path.join('public', img)
        exists = os.path.exists(disk_path)
        clean_items.append((i_id, name, price, cat, notes, desc, img, exists))

print(f"\nTotal clean items to keep: {len(clean_items)}")
for it in clean_items:
    i_id, name, price, cat, notes, desc, img, exists = it
    print(f"[{cat}] {name} (Rp {int(price):,}) -> {img} (exists: {exists})")
