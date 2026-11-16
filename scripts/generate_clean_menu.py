import re

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Let's find each item block in ALL_MENU_ITEMS
start_pos = c.find('const ALL_MENU_ITEMS: MenuItem[] = [')
end_pos = c.find('];\n\n// ─── UTILITY HELPERS', start_pos)

menu_text = c[start_pos:end_pos + 2]

# Split by items: each item starts with "  {"
# Let's parse with regex
pattern = r'(\s*\{\s*id:\s*"[^"]+".*?\n\s*\},\n?)'
matches = re.findall(r'(  \{\s*\n\s*id:\s*"[^"]+".*?\n  \},)', menu_text, re.DOTALL)
print(f"Total item blocks found: {len(matches)}")

clean_blocks = []
crop_blocks = []

for block in matches:
    if 'menu_crops' in block:
        crop_blocks.append(block)
    else:
        clean_blocks.append(block)

print(f"Clean blocks: {len(clean_blocks)}")
print(f"Crop blocks: {len(crop_blocks)}")
