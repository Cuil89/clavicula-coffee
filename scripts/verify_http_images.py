import urllib.request

test_images = [
    "/images/manubrium.jpg",
    "/images/acromion.jpg",
    "/images/banner-clavicula.jpg",
    "/images/mentai-rice.jpg",
    "/images/chicken-katsu-with-sauce.jpg",
    "/images/tiramisu-cake.jpg",
    "/images/vomer.jpg",
    "/images/yakitori.jpg"
]

print("Verifying HTTP delivery of new assets:")
for img in test_images:
    url = f"http://localhost:3000{img}"
    try:
        r = urllib.request.urlopen(url)
        content = r.read()
        print(f"✓ {img} -> HTTP {r.getcode()} | Type: {r.headers.get('Content-Type')} | Size: {len(content):,} bytes")
    except Exception as e:
        print(f"✗ {img} -> FAILED: {e}")
