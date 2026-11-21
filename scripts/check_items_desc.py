import json

with open("clavicula_web_assets/menu.json", "r", encoding="utf-8") as f:
    data = json.load(f)

items = data["items"]
empty_desc = [it for it in items if not it.get("description")]
print(f"Total items: {len(items)}")
print(f"Items without description: {len(empty_desc)}")

for it in empty_desc:
    print(f"- [{it['category']}] {it['name']} ({it['slug']}) - Rp {it['price']:,}")
