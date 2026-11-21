with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l for k in ['<section', 'bg-linen', 'bg-white', 'bg-[#', 'from-[#']):
        print(f"Line {i+1}: {l.strip()[:110]}")
