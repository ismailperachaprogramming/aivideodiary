import cv2
from deepface import DeepFace

# Set video path
video_path = "/Users/ismailperacha/aivideodiary/backend/recording.webm"  # Adjust path as needed

# Open the video file
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error: Unable to open video file {video_path}. Please check the path.")
    exit()

frame_count = 0  # Track number of frames processed

# Process each frame of the video
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("End of video reached or failed to read the frame.")
        break

    frame_count += 1
    print(f"Processing frame {frame_count}...")

    try:
        # Analyze the emotion in the current frame
        analysis = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
        print(f"Detected Emotion: {analysis[0]['dominant_emotion']}")
    except Exception as e:
        print(f"Error detecting emotion in frame {frame_count}: {e}")

cap.release()
print("Video processing completed.")