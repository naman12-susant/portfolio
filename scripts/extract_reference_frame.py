import cv2
import os
path = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'Screen Recording 2026-08-11 201743.mp4')
output = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'reference_frame1.png')
cap = cv2.VideoCapture(path)
if not cap.isOpened():
    raise SystemExit(f'Cannot open video: {path}')
ret, frame = cap.read()
if not ret:
    raise SystemExit('Cannot read frame from video')
cv2.imwrite(output, frame)
print('saved', output)
cap.release()
