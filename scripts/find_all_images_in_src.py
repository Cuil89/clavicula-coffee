import os
import re

img_regex = re.compile(r'["\'](/[^"\']+\.(?:webp|jpg|jpeg|png|svg))["\']')
matches = set()

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
                found = img_regex.findall(content)
                for item in found:
                    matches.add((path, item))

for path, item in sorted(matches):
    print(f"{path}: {item}")
