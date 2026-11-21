from PIL import Image
import numpy as np

def check_img(path):
    im = Image.open(path)
    print(f"File: {path}, Size: {im.size}, Mode: {im.mode}")

check_img('public/assets/clavicula/drinks/scapula.webp')
check_img('public/images/menu/drinks/scapula.webp')
check_img('public/images/raw_with_watermark/scapula.webp')
check_img('extracted_gofood_pack/clavicula_gofood_clean_pack/preview_crops_clean/scapula-watermark-removed-preview.png')
