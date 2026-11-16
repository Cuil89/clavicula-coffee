with open("src/app/menu/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

import re
sigs = re.findall(r'name:\s*"([^"]+)",\s*price:\s*(\d+)', text)
for name, p in sigs[:30]:
    print(f"{name}: Rp {int(p):,}")
