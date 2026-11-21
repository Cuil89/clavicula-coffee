with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
all_menu = text[text.find('const ALL_MENU_ITEMS'):text.find('const CATEGORIES')]
items = re.findall(r'name:\s*"([^"]+)".*?image:\s*"([^"]+)"', all_menu, re.DOTALL)

for name, img in items:
    print(f"{name:30} -> {img}")
