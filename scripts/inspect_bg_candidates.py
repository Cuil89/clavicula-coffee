from PIL import Image
import numpy as np

candidates = [
    ('public/assets/ember-hero-table.jpg', 'Current (Overhead Cups)'),
    ('public/assets/clavicula/places/hero-slowbar-clavicula.jpg', 'Real Slow Bar Slawi'),
    ('public/assets/cafe-twilight-pavilion.jpeg', 'Twilight Architectural Pavilion'),
    ('public/assets/hero-sunlit-hearth.jpeg', 'Sunlit Hearth Artisanal Space'),
    ('public/assets/sanctuary-interior-arches.jpeg', 'Sanctuary Interior Arches'),
    ('public/assets/clavicula/places/suasana-tempat-clavicula-guci-hills.png', 'Guci Hills Mountain Pine'),
    ('public/assets/clavicula/places/clavicula-facade-warm-perfect.jpg', 'Warm Facade Night')
]

for path, label in candidates:
    im = Image.open(path)
    arr = np.array(im.convert('RGB'))
    mean_rgb = np.mean(arr, axis=(0, 1))
    print(f"[{label}] {path}: size={im.size}, aspect={im.size[0]/im.size[1]:.2f}, mean_color=({mean_rgb[0]:.0f},{mean_rgb[1]:.0f},{mean_rgb[2]:.0f})")
