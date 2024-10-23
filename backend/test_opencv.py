import cv2

video_path = "./recording.webm"  # Adjust if needed
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error: Cannot open video file {video_path}.")
else:
    print("Video opened successfully!")

cap.release()
