from transformers import pipeline
import fitz
import json
import os
from datetime import datetime, timedelta

# Load a more powerful model (GPT-Neo 2.7B or Llama 2)
model_name = "EleutherAI/gpt-neo-2.7B"  # You can also use "meta-llama/Llama-2-7b-chat-hf"
text_generator = pipeline("text-generation", model=model_name, device=0)  # Use GPU if available

# Function to generate content using Transformer
def generate_content(prompt_text, max_length=150):
    response = text_generator(prompt_text, max_length=max_length, num_return_sequences=1)
    return response[0]["generated_text"]

# Extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

# Search YouTube (mock function, replace with real YouTube API integration if needed)
def search_youtube(query, max_results=5):
    return [f"Mock video result for {query} - {i+1}" for i in range(max_results)]

# JSON file storage paths
REVISION_FILE = "revision_data.json"
QUIZ_FILE = "quiz_performance.json"

# Load data from JSON file
def load_json(file_path):
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

# Save data to JSON file
def save_json(data, file_path):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

# Determine next revision date based on performance (Spaced Repetition)
def get_next_revision_date(last_review_date, correct_answers):
    if correct_answers >= 4:
        return last_review_date + timedelta(days=30)
    elif correct_answers == 3:
        return last_review_date + timedelta(days=14)
    elif correct_answers == 2:
        return last_review_date + timedelta(days=7)
    elif correct_answers == 1:
        return last_review_date + timedelta(days=3)
    else:
        return last_review_date + timedelta(days=1)

# Update revision schedule for a user
def update_revision_schedule(user_id, topic, correct_answers):
    data = load_json(REVISION_FILE)
    
    if user_id not in data:
        data[user_id] = {}

    last_review = datetime.strptime(data[user_id].get(topic, datetime.now().strftime("%Y-%m-%d")), "%Y-%m-%d")
    next_review = get_next_revision_date(last_review, correct_answers)

    data[user_id][topic] = next_review.strftime("%Y-%m-%d")
    save_json(data, REVISION_FILE)

    return {"next_review_date": next_review.strftime("%Y-%m-%d")}

# Update quiz performance
def update_quiz_performance(user_id, topic, score):
    data = load_json(QUIZ_FILE)

    if user_id not in data:
        data[user_id] = {}

    if topic not in data[user_id]:
        data[user_id][topic] = []

    data[user_id][topic].append({"date": datetime.now().strftime("%Y-%m-%d"), "score": score})
    save_json(data, QUIZ_FILE)

    return {"message": "Quiz performance updated!"}

# Analyze quiz performance and find weak topics
def analyze_quiz_performance(user_id):
    data = load_json(QUIZ_FILE)
    weak_topics = []
    
    if user_id not in data:
        return {"message": "No quiz data found for user."}
    
    for topic, scores in data[user_id].items():
        recent_scores = [entry["score"] for entry in scores[-5:]]  # Last 5 attempts
        avg_score = sum(recent_scores) / len(recent_scores) if recent_scores else 0
        
        if avg_score < 50:  # Weak topic threshold
            weak_topics.append((topic, avg_score))
    
    weak_topics.sort(key=lambda x: x[1])  # Sort by lowest score first
    
    recommendations = {topic: search_youtube(f"{topic} tutorial", 3) for topic, _ in weak_topics}
    return {"weak_topics": weak_topics, "recommendations": recommendations}

# Example Usage:
if __name__ == "__main__":
    # Example usage of PDF text extraction
    pdf_text = extract_text_from_pdf("sample.pdf")
    print("Extracted Text:", pdf_text[:500])  # Print first 500 chars

    # Example AI-generated content
    summary = generate_content("Summarize the concept of machine learning.")
    print("Summary:", summary)

    # Example YouTube search
    videos = search_youtube("Python programming tutorial", 3)
    print("Recommended Videos:", videos)

    # Example revision schedule update
    print(update_revision_schedule("user123", "Physics", 2))

    # Example quiz performance update
    print(update_quiz_performance("user123", "Math", 40))

    # Analyze weak points
    print(analyze_quiz_performance("user123"))
