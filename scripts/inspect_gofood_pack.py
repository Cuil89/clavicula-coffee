import zipfile
import os

zip_path = 'clavicula_gofood_menu_dan_img_clean_pack.zip'
extract_dir = 'extracted_gofood_pack'

with zipfile.ZipFile(zip_path, 'r') as z:
    names = z.namelist()
    print(f"Total files in zip: {len(names)}")
    for n in names:
        info = z.getinfo(n)
        print(f"  {n} ({info.file_size} bytes)")
    
    os.makedirs(extract_dir, exist_ok=True)
    z.extractall(extract_dir)
    print(f"\nExtracted successfully to {extract_dir}")
