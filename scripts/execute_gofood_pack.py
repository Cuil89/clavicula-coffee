#!/usr/bin/env python3
"""
Executor script for clavicula_gofood_menu_dan_img_clean_pack
- Downloads all brand assets and 36 pictured menus
- Cleans any GoFood fork-spoon circle watermark using Inverse Alpha-Unblending + Telea inpainting
- Saves clean images to both:
    1) d:/semester7/clavi/public/images/
    2) extracted_gofood_pack/clavicula_gofood_clean_pack/public/images/
- Summarizes the full 153 menu dataset from GoFood
"""

import os
import sys
import json
import shutil
import urllib.request
import urllib.parse
import cv2
import numpy as np

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PACK_DIR = os.path.join(WORKSPACE_ROOT, "extracted_gofood_pack", "clavicula_gofood_clean_pack")
DATA_FILE = os.path.join(PACK_DIR, "data", "clavicula_gofood_pictured_menus_only.json")
FULL_DATA_FILE = os.path.join(PACK_DIR, "data", "clavicula_gofood_full_153_menus.json")

TARGET_PUBLIC_DIRS = [
    os.path.join(WORKSPACE_ROOT, "public"),
    os.path.join(PACK_DIR, "public")
]

def build_gofood_watermark_alpha(h, w, cx=None, cy=None, R=None):
    if cx is None:
        cx = w / 2.0
    if cy is None:
        cy = h / 2.0
    if R is None:
        R = min(h, w) * 0.125

    scale = 8
    H, W = h * scale, w * scale
    scx, scy, sR = cx * scale, cy * scale, R * scale

    canvas = np.zeros((H, W), dtype=np.uint8)
    cv2.circle(canvas, (int(round(scx)), int(round(scy))), int(round(sR)), 255, -1, lineType=cv2.LINE_AA)

    # Fork (left side)
    fx = scx - 0.31 * sR
    head_top = int(round(scy - 0.52 * sR))
    head_mid = int(round(scy - 0.08 * sR))
    head_hw = int(round(0.24 * sR))
    cv2.rectangle(canvas, (int(round(fx)) - head_hw, head_top), (int(round(fx)) + head_hw, head_mid), 0, -1)
    cv2.circle(canvas, (int(round(fx)), head_mid), head_hw, 0, -1, lineType=cv2.LINE_AA)

    gap_hw = max(1, int(round(0.048 * sR)))
    gap_bot = int(round(scy - 0.14 * sR))
    for off in [-0.095 * sR, 0.095 * sR]:
        gx = int(round(fx + off))
        cv2.rectangle(canvas, (gx - gap_hw, head_top), (gx + gap_hw, gap_bot), 255, -1)

    stem_hw = max(1, int(round(0.08 * sR)))
    stem_bot = int(round(scy + 0.56 * sR))
    cv2.rectangle(canvas, (int(round(fx)) - stem_hw, head_mid), (int(round(fx)) + stem_hw, stem_bot), 0, -1)
    cv2.circle(canvas, (int(round(fx)), stem_bot), stem_hw, 0, -1, lineType=cv2.LINE_AA)

    # Spoon (right side)
    sx = scx + 0.32 * sR
    bowl_cy = int(round(scy - 0.20 * sR))
    bowl_rx = int(round(0.24 * sR))
    bowl_ry = int(round(0.32 * sR))
    cv2.ellipse(canvas, (int(round(sx)), bowl_cy), (bowl_rx, bowl_ry), 0, 0, 360, 0, -1, lineType=cv2.LINE_AA)
    cv2.rectangle(canvas, (int(round(sx)) - stem_hw, bowl_cy + int(round(0.15 * sR))), (int(round(sx)) + stem_hw, stem_bot), 0, -1)
    cv2.circle(canvas, (int(round(sx)), stem_bot), stem_hw, 0, -1, lineType=cv2.LINE_AA)

    return cv2.resize(canvas, (w, h), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0


def has_center_gofood_watermark(bgr_img):
    h, w = bgr_img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    gray = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    in_ring = gray[(dist >= R * 0.82) & (dist <= R * 0.96)]
    out_ring = gray[(dist >= R * 1.04) & (dist <= R * 1.18)]
    if len(in_ring) == 0 or len(out_ring) == 0:
        return False
    return float(np.median(in_ring) - np.median(out_ring)) > 6.5


def remove_gofood_watermark(bgr_img):
    h, w = bgr_img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125

    tmpl = build_gofood_watermark_alpha(h, w, cx, cy, R)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    disc_mask = (dist <= R * 1.12).astype(np.uint8) * 255
    bg_inpaint = cv2.inpaint(bgr_img, disc_mask, inpaintRadius=max(3, int(round(R * 0.35))), flags=cv2.INPAINT_TELEA)

    obs_f = bgr_img.astype(np.float32)
    bg_f = bg_inpaint.astype(np.float32)

    diff = np.mean(obs_f - bg_f, axis=2)
    denom = np.maximum(255.0 - np.mean(bg_f, axis=2), 30.0)
    emp_alpha = np.clip(diff / denom, 0.0, 0.35)

    top_arch = (dist <= R * 0.92) & (yy < cy - 0.1 * R) & (tmpl > 0.85)
    if np.any(top_arch):
        scalar_a = float(np.clip(np.median(emp_alpha[top_arch]), 0.15, 0.28))
    else:
        scalar_a = 0.21

    circle_window = np.clip((R * 1.12 - dist) / (R * 0.12), 0.0, 1.0)
    alpha_map = (circle_window * (0.55 * (tmpl * scalar_a) + 0.45 * emp_alpha)).astype(np.float32)

    unblended = obs_f.copy()
    for c in range(3):
        unblended[:, :, c] = np.clip(
            (obs_f[:, :, c] - alpha_map * 255.0) / np.maximum(1.0 - alpha_map, 0.65),
            0, 255
        )
    unblended_u8 = unblended.astype(np.uint8)

    gx = cv2.Sobel(tmpl, cv2.CV_32F, 1, 0, ksize=3)
    gy = cv2.Sobel(tmpl, cv2.CV_32F, 0, 1, ksize=3)
    edge_weight = np.clip(np.sqrt(gx**2 + gy**2) * 0.8, 0.0, 0.75)[:, :, None]

    w_inpaint = np.clip(0.30 + edge_weight, 0.0, 0.85) * circle_window[:, :, None]
    cleaned = (unblended_u8.astype(np.float32) * (1.0 - w_inpaint) + bg_f * w_inpaint).astype(np.uint8)
    return cleaned


def download_file(url, dest_path):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "Referer": "https://claviculacoffee.id/"
        }
    )
    with urllib.request.urlopen(req, timeout=25) as resp, open(dest_path, "wb") as out:
        out.write(resp.read())


def main():
    print(f"=== CLAVICULA GOFOOD PACK EXECUTOR ===")
    print(f"Data Source: {DATA_FILE}")

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    raw_dir = os.path.join(WORKSPACE_ROOT, "public", "images", "raw_with_watermark")
    os.makedirs(raw_dir, exist_ok=True)

    # 1. Download Brand Assets
    print("\n--- 1. DOWNLOADING BRAND ASSETS ---")
    for asset in data.get("brand_assets", []):
        rel_sub = asset["laravel_public_path"].replace("public/", "")
        url = asset["source_image_url"]
        print(f"Downloading Brand: {asset['name']} -> {rel_sub}")
        
        temp_dest = os.path.join(WORKSPACE_ROOT, "public", rel_sub)
        try:
            download_file(url, temp_dest)
            # Copy to other targets
            for root_pub in TARGET_PUBLIC_DIRS:
                target_dest = os.path.join(root_pub, rel_sub)
                os.makedirs(os.path.dirname(target_dest), exist_ok=True)
                if temp_dest != target_dest:
                    shutil.copy2(temp_dest, target_dest)
            print(f"  [OK] Saved to all public dirs: {rel_sub}")
        except Exception as e:
            print(f"  [!] Failed to download brand asset {url}: {e}")

    # 2. Download and Clean Pictured Menus
    print("\n--- 2. DOWNLOADING & CLEANING PICTURED MENUS (36 ITEMS) ---")
    results = []
    seen = set()

    for item in data.get("pictured_menus", []):
        rel_path = item["laravel_public_path"]
        rel_sub = rel_path.replace("public/", "")
        if rel_sub in seen:
            continue
        seen.add(rel_sub)

        url = item["source_image_url"]
        fallback_url = item.get("gofood_cdn_url")
        raw_path = os.path.join(raw_dir, item["clean_image_filename"])
        dest_main = os.path.join(WORKSPACE_ROOT, "public", rel_sub)

        downloaded = False
        for candidate in [url, fallback_url]:
            if not candidate:
                continue
            try:
                print(f"Downloading {item['name']} ({item['category']}) from {candidate[:55]}...")
                download_file(candidate, raw_path)
                downloaded = True
                break
            except Exception as e:
                print(f"  [!] Error from {candidate[:40]}: {e}")

        # Fallback check from preview_crops_clean if download failed
        if not downloaded:
            preview_file = os.path.join(PACK_DIR, "preview_crops_clean", item["clean_image_filename"].replace(".webp", "-clean.png"))
            if not os.path.exists(preview_file):
                preview_file = os.path.join(PACK_DIR, "preview_crops_clean", item["clean_image_filename"].replace(".webp", "-preview.png"))
            if os.path.exists(preview_file):
                print(f"  [FALLBACK] Using existing clean preview: {os.path.basename(preview_file)}")
                shutil.copy2(preview_file, raw_path)
                downloaded = True

        if not downloaded:
            print(f"  [FAILED] Could not acquire image for {item['name']}")
            continue

        img = cv2.imread(raw_path)
        if img is None:
            print(f"  [FAILED] Could not read raw image: {raw_path}")
            continue

        had_wm = item.get("had_gofood_fork_spoon_watermark") or has_center_gofood_watermark(img)
        if had_wm:
            print(f"  [CLEANING] Removing GoFood fork-spoon watermark for {item['clean_image_filename']}...")
            clean_img = remove_gofood_watermark(img)
        else:
            print(f"  [CLEAN] Already clean: {item['clean_image_filename']}")
            clean_img = img

        # Save to main workspace public
        os.makedirs(os.path.dirname(dest_main), exist_ok=True)
        cv2.imwrite(dest_main, clean_img)

        # Copy to pack public directory as well
        for root_pub in TARGET_PUBLIC_DIRS:
            target_dest = os.path.join(root_pub, rel_sub)
            os.makedirs(os.path.dirname(target_dest), exist_ok=True)
            if dest_main != target_dest:
                shutil.copy2(dest_main, target_dest)

        results.append({
            "name": item["name"],
            "category": item["category"],
            "price_gofood": item["price_gofood_idr"],
            "path": rel_sub,
            "cleaned": had_wm
        })

    print(f"\nSuccessfully processed {len(results)} menu images!")

    # 3. Analyze Full 153 Menu Database
    print("\n--- 3. FULL GOFOOD 153 MENUS ANALYSIS ---")
    with open(FULL_DATA_FILE, "r", encoding="utf-8") as f:
        full_data = json.load(f)

    menus = full_data.get("menus", []) if isinstance(full_data, dict) and "menus" in full_data else full_data
    categories = {}
    for m in menus:
        c = m.get("category", "Uncategorized")
        categories[c] = categories.get(c, 0) + 1

    print(f"Total Menus: {len(menus)}")
    print("Breakdown per Category:")
    for c, count in categories.items():
        print(f"  * {c}: {count} menu")

    # Also save a JSON summary into public/data
    os.makedirs(os.path.join(WORKSPACE_ROOT, "public", "data"), exist_ok=True)
    summary_path = os.path.join(WORKSPACE_ROOT, "public", "data", "clavicula_gofood_summary.json")
    with open(summary_path, "w", encoding="utf-8") as out_f:
        json.dump({
            "total_menus": len(menus),
            "categories": categories,
            "processed_images": results
        }, out_f, indent=2)
    print(f"\nSaved summary to: {summary_path}")

if __name__ == "__main__":
    main()
