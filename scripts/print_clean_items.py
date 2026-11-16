with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

menu_lines = lines[108:700]

current_block = []
blocks = []
for line in menu_lines:
    if line.strip().startswith('// ───') or line.strip().startswith('// '):
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

for b_type, b_lines in blocks:
    if b_type == 'item':
        text = "".join(b_lines)
        if 'menu_crops' not in text:
            # find name and category
            name = ""
            cat = ""
            for l in b_lines:
                if 'name:' in l:
                    name = l.strip()
                if 'category:' in l:
                    cat = l.strip()
            print(f"{name} | {cat}")
