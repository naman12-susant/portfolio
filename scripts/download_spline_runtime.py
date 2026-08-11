import os
import urllib.request

url = 'https://prod.spline.design/ccHEuzFlflK3qsEH/scene.splinecode'
out_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'spline')
out_path = os.path.join(out_dir, 'scene.splinecode')

os.makedirs(out_dir, exist_ok=True)
print('Downloading', url)
with urllib.request.urlopen(url) as response:
    data = response.read()
with open(out_path, 'wb') as f:
    f.write(data)
print('Saved', out_path)
print('Size:', len(data))
