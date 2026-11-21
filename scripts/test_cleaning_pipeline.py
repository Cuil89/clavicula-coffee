import cv2
import numpy as np
import os

def clean_gofood_watermark(img_path, output_path):
    img = cv2.imread(img_path)
    if img is None:
        print(f"Cannot read {img_path}")
        return False
        
    h, w = img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125
    
    # Generate watermark template / disc mask
    # Radius of circle is R
    # Create mask covering R * 1.08
    mask = np.zeros((h, w), dtype=np.uint8)
    cv2.circle(mask, (int(round(cx)), int(round(cy))), int(round(R * 1.08)), 255, -1)
    
    # First: rough inpainting to get background estimate
    bg_est = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
    
    # Compute brightness increase caused by the white watermark
    # The watermark is an additive white semi-transparent layer
    img_f = img.astype(np.float32)
    bg_f = bg_est.astype(np.float32)
    
    diff = np.mean(img_f - bg_f, axis=2)
    
    # Mask of pixels that are part of the watermark
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    in_circle = dist <= R * 1.10
    
    # Where image is noticeably brighter than surrounding background inside the circle
    # Watermark alpha is typically ~0.20-0.30 of 255 (i.e. +20 to +60 in RGB)
    # The circle outline and the fork/spoon silhouettes are prominent
    # Also the circle edge ring itself
    ring_mask = (dist >= R * 0.88) & (dist <= R * 1.06)
    core_mask = (diff > 6.0) & in_circle
    
    combined_mask = (ring_mask | core_mask).astype(np.uint8) * 255
    
    # Dilate by 3 pixels to ensure edges of the fork/spoon and ring are fully covered
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    dilated_mask = cv2.dilate(combined_mask, kernel)
    
    # Now inpaint the dilated mask using Telea + Navier-Stokes hybrid or Telea
    cleaned = cv2.inpaint(img, dilated_mask, inpaintRadius=4, flags=cv2.INPAINT_TELEA)
    
    # Smooth the boundary slightly
    circle_border = (dist >= R * 0.85) & (dist <= R * 1.12)
    cleaned_smooth = cv2.inpaint(cleaned, (circle_border & (cv2.absdiff(cleaned, img).mean(axis=2) > 3)).astype(np.uint8) * 255, inpaintRadius=3, flags=cv2.INPAINT_TELEA)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, cleaned_smooth)
    print(f"Cleaned {os.path.basename(img_path)} -> {output_path}")
    return True

# Test on scapula and trapezius
clean_gofood_watermark('public/images/raw_with_watermark/scapula.webp', 'scripts/clean_scapula.webp')
clean_gofood_watermark('public/images/raw_with_watermark/trapezius.webp', 'scripts/clean_trapezius.webp')
