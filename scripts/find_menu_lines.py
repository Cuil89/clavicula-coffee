with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'const ALL_MENU_ITEMS' in line:
        print(f"Start: line {i+1}")
    if '// ─── UTILITY HELPERS' in line:
        print(f"End: line {i+1}")
