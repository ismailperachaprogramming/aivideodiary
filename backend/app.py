from flask import Flask, request, jsonify
import os
import whisper

app = Flask(__name__)

@app.route('/api/keywords', methods=['POST'])
def extract_keywords():
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    video = request.files['video']

    # Save the video file temporarily
    video_path = os.path.join('/tmp', video.filename)
    video.save(video_path)

    # Convert the video to audio if necessary and pass it to Whisper
    # Assuming you have the video to audio conversion set up.
    audio_path = convert_video_to_audio(video_path)

    # Run Whisper transcription on the audio file
    transcribed_text = run_whisper_on_audio(audio_path)

    # Extract keywords from transcribed text using YAKE
    keywords = extract_keywords_from_text(transcribed_text)

    return jsonify({'keywords': keywords})

def convert_video_to_audio(video_path):
    # Add logic to convert video to audio (using ffmpeg)
    audio_path = video_path.replace('.mp4', '.wav')
    os.system(f"ffmpeg -i {video_path} -q:a 0 -map a {audio_path}")
    return audio_path

def run_whisper_on_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result['text']

def extract_keywords_from_text(transcribed_text):
    import yake
    yake_extractor = yake.KeywordExtractor(lan="en", n=1, dedupLim=0.9, top=10)
    keywords = yake_extractor.extract_keywords(transcribed_text)
    return keywords

if __name__ == "__main__":
    app.run(debug=True)
