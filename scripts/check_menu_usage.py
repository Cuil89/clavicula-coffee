with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

import re
uses = [m.start() for m in re.finditer(r'ALL_MENU_ITEMS', c)]
print(f"ALL_MENU_ITEMS is referenced at {len(uses)} places:")
for pos in uses:
    line_no = c.count('\n', 0, pos) + 1
    print(f" - Line {line_no}: {c[pos-20:pos+50].strip()}")
