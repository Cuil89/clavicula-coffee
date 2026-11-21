import os
import shutil

src_img_dir = os.path.join("clavicula_web_assets", "images")
dest_img_dir = os.path.join("public", "images")
dest_asset_dir = os.path.join("public", "clavicula_web_assets", "images")

os.makedirs(dest_img_dir, exist_ok=True)
os.makedirs(dest_asset_dir, exist_ok=True)

files = os.listdir(src_img_dir)
copied_root = 0
copied_asset = 0

for f in files:
    src_file = os.path.join(src_img_dir, f)
    if os.path.isfile(src_file):
        shutil.copy2(src_file, os.path.join(dest_img_dir, f))
        copied_root += 1
        shutil.copy2(src_file, os.path.join(dest_asset_dir, f))
        copied_asset += 1

# Copy menu.json, menu.csv, README.txt to public/clavicula_web_assets and public/data
for meta in ["menu.json", "menu.csv", "README.txt"]:
    meta_src = os.path.join("clavicula_web_assets", meta)
    if os.path.exists(meta_src):
        shutil.copy2(meta_src, os.path.join("public", "clavicula_web_assets", meta))
        if meta == "menu.json":
            os.makedirs(os.path.join("public", "data"), exist_ok=True)
            shutil.copy2(meta_src, os.path.join("public", "data", "menu.json"))

print(f"Successfully copied {copied_root} images to public/images/")
print(f"Successfully copied {copied_asset} images to public/clavicula_web_assets/images/")
print("Copied metadata files to public/clavicula_web_assets/ and public/data/menu.json")
