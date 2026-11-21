import json

with open('extracted_gofood_pack/clavicula_gofood_clean_pack/data/clavicula_gofood_pictured_menus_only.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for m in d['pictured_menus']:
    print(f"{m['name']}:")
    print(f"  source: {m.get('source_image_url')}")
    print(f"  gofood_cdn: {m.get('gofood_cdn_url')}")
    print(f"  wm_status: {m.get('watermark_status')}")
