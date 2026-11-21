with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in src/app/menu/page.tsx: {len(lines)}")
for i in range(745, len(lines)):
    line = lines[i]
    if '<section' in line:
        print(f"Line {i+1}: {line.strip()[:100]}")
