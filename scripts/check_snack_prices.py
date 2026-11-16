with open("src/app/menu/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

import re

# Find Dessert & Snack section
m = re.search(r'// 7\. DESSERT & SNACK.*?(?=// 8\. NON COFFEE)', text, re.DOTALL)
if m:
    items = re.findall(r'name:\s*"([^"]+)",\s*price:\s*(\d+)', m.group(0))
    for name, p in items:
        print(f"{name}: {p}")
