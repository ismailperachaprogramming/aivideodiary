import spacy
import yake

# Load the spaCy English model
nlp = spacy.load("en_core_web_sm")

# Transcription from Whisper
transcribed_text = """
This is a test recording.
"""

# Initialize YAKE for keyword extraction
yake_extractor = yake.KeywordExtractor(lan="en", n=1, dedupLim=0.9, top=10)
keywords = yake_extractor.extract_keywords(transcribed_text)

# Display extracted keywords
print("Extracted Keywords:")
for keyword, score in keywords:
    print(f"Keyword: {keyword}, Score: {score}")
