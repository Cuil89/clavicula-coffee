with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

import re
lineup_match = re.search(r'const SIGNATURE_LINEUP = \[(.*?)\];', c, re.DOTALL)
if lineup_match:
    items = re.findall(r'index:\s*"([^"]+)".*?name:\s*"([^"]+)".*?price:\s*([0-9]+).*?category:\s*"([^"]+)".*?image:\s*"([^"]+)"', lineup_match.group(1), re.DOTALL)
    print("SIGNATURE_LINEUP:")
    for idx, name, price, cat, img in items:
        print(f"Card {idx}: {name} (Rp {int(price):,}) [{cat}] -> {img}")
