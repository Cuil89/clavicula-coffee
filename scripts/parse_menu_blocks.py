with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

menu_lines = lines[108:700]

current_block = []
blocks = []
for line in menu_lines:
    if line.strip().startswith('// ───') or line.strip().startswith('// '):
        # Comment line
        if current_block:
            blocks.append(('item', current_block))
            current_block = []
        blocks.append(('comment', [line]))
    elif line.strip() == '{':
        if current_block:
            blocks.append(('item', current_block))
            current_block = []
        current_block.append(line)
    elif line.strip() == '},':
        current_block.append(line)
        blocks.append(('item', current_block))
        current_block = []
    elif current_block:
        current_block.append(line)

print(f"Total blocks parsed: {len(blocks)}")
item_count = sum(1 for b_type, _ in blocks if b_type == 'item')
print(f"Total items: {item_count}")

# Check which items are crops vs clean
crops = 0
cleans = 0
for b_type, b_lines in blocks:
    if b_type == 'item':
        text = "".join(b_lines)
        if 'menu_crops' in text:
            crops += 1
        else:
            cleans += 1

print(f"Clean items: {cleans}, Crop items: {crops}")
