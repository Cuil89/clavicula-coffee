with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

import re
cat_match = re.search(r'const CATEGORIES = \[(.*?)\];', c, re.DOTALL)
categories = [x.strip().strip('"') for x in cat_match.group(1).split(',') if x.strip()]

items = re.findall(r'name:\s*"([^"]+)".*?category:\s*"([^"]+)"', c[c.find('const ALL_MENU_ITEMS'):c.find('const CATEGORIES')], re.DOTALL)

print("Categories in array:", categories)
print(f"Total items: {len(items)}")

mismatches = []
for name, cat in items:
    if cat not in categories:
        mismatches.append((name, cat))

if mismatches:
    print("Mismatches found:", mismatches)
else:
    print("All items correctly match an active category!")
