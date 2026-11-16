import re
text = open('src/app/menu/page.tsx', encoding='utf-8').read()
ids = re.findall(r'id:\s*"([^"]+)"', text)
print('Total IDs:', len(ids))

# Check that every single item has an image:
images = re.findall(r'image:\s*"([^"]+)"', text)
print('Total Images:', len(images))
if len(ids) == len(images):
    print('SUCCESS: Every single menu item has an image!')
else:
    print('MISMATCH:', len(ids), 'items vs', len(images), 'images')
