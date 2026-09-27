import os
try:
    from PIL import Image
    files = ["Family Safe.jpeg", "technician.jpeg"]
    for f in files:
        if os.path.exists(f):
            img = Image.open(f)
            w, h = img.size
            # Crop 50 pixels from the bottom and 50 pixels from the right
            # The watermark is in the bottom right corner
            cropped = img.crop((0, 0, w, h - 45))
            cropped.save(f)
            print(f"Cropped {f}")
except Exception as e:
    print(f"Error: {e}")
