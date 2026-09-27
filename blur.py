import os
from PIL import Image, ImageFilter

files = ["Family Safe.jpeg", "technician.jpeg", "home2_hero.jpeg", "home2_cta.jpeg"]

for f in files:
    if os.path.exists(f):
        try:
            img = Image.open(f)
            w, h = img.size
            
            # Define the box to blur: bottom right corner, e.g., 120x120 pixels
            # Since the watermark is small, 120x120 is usually enough to cover it
            box = (w - 120, h - 120, w, h)
            
            # Crop the corner, blur it, and paste it back
            corner = img.crop(box)
            blurred_corner = corner.filter(ImageFilter.GaussianBlur(radius=15))
            img.paste(blurred_corner, box)
            
            img.save(f)
            print(f"Blurred watermark on {f}")
        except Exception as e:
            print(f"Error processing {f}: {e}")
