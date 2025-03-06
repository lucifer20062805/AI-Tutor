from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import fitz  # PyMuPDF
import yt_dlp
import threading  # For parallel execution
import os

# Configure Gemini AI
genai.configure(api_key="AIzaSyCKeI0ntu6btu3Wybvpsjk3lvnInso5LG0")  # Replace with your API key

app = Flask(__name__)
CORS(app)

# Function to generate content using Gemini AI
def generate_content(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        return response.text if response.text else "Error: No response from AI."
    except Exception as e:
        return f"Error: {str(e)}"

# Function to search YouTube for related videos
def search_youtube(query, max_results=5):
    ydl_opts = {
        "quiet": True,
        "default_search": f"ytsearch{max_results}",
        "skip_download": True,
        "force_generic_extractor": True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            search_results = ydl.extract_info(query, download=False)
            if "entries" in search_results:
                return [
                    {"title": entry["title"], "url": entry["webpage_url"]}
                    for entry in search_results["entries"]
                ]
    except Exception as e:
        return [{"error": f"Failed to fetch YouTube videos: {str(e)}"}]

    return [{"error": "No videos found."}]

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        return f"Error extracting text: {str(e)}"

# 📌 Route: Upload PDF → Extract Text → Summarize & Generate Quiz
@app.route("/upload_pdf", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded PDF temporarily
    pdf_path = "uploaded.pdf"
    file.save(pdf_path)

    # Extract text
    extracted_text = extract_text_from_pdf(pdf_path)
    if not extracted_text:
        return jsonify({"error": "Failed to extract text from PDF"}), 500

    # Remove the temporary file after processing
    os.remove(pdf_path)

    summary_result = {}
    quiz_result = {}

    def fetch_summary():
        prompt = f"Summarize the following content:\n{extracted_text}"
        summary_result["summary"] = generate_content(prompt)

    def fetch_quiz():
        prompt = f"Generate a quiz based on the following content:\n{extracted_text}"
        quiz_result["quiz"] = generate_content(prompt)

    # Run tasks concurrently
    thread1 = threading.Thread(target=fetch_summary)
    thread2 = threading.Thread(target=fetch_quiz)
    thread1.start()
    thread2.start()
    thread1.join()
    thread2.join()

    return jsonify({
        "summary": summary_result.get("summary", ""),
        "quiz": quiz_result.get("quiz", "")
    })

# 📌 Route: AI-Generated Study Plan + YouTube Recommendations
@app.route("/study_plan", methods=["POST"])
def generate_study_plan():
    data = request.get_json()
    topic = data.get("topic", "")
    weaknesses = data.get("weak_areas", [])

    if not topic:
        return jsonify({"error": "Please provide a topic."}), 400

    study_plan_result = {}
    youtube_result = []

    def fetch_study_plan():
        prompt = f"Create a personalized study plan for {topic}. Focus on improving these weak areas: {', '.join(weaknesses)}."
        study_plan_result["study_plan"] = generate_content(prompt)

    def fetch_youtube():
        nonlocal youtube_result
        youtube_result = search_youtube(f"{topic} study guide", max_results=5)

    # Run tasks concurrently
    thread1 = threading.Thread(target=fetch_study_plan)
    thread2 = threading.Thread(target=fetch_youtube)
    thread1.start()
    thread2.start()
    thread1.join()
    thread2.join()

    return jsonify({
        "study_plan": study_plan_result.get("study_plan", ""),
        "videos": youtube_result
    })

# 📌 Route: AI-Powered Doubt Solving + YouTube Suggestions
@app.route("/solve_doubt", methods=["POST"])
def solve_doubt():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "Please provide a question."}), 400

    answer_result = {}
    youtube_result = []

    def fetch_answer():
        prompt = f"Explain this question in a simple and detailed way: {question}"
        answer_result["answer"] = generate_content(prompt)

    def fetch_youtube():
        nonlocal youtube_result
        youtube_result = search_youtube(f"Explanation of {question}", max_results=5)

    # Run tasks concurrently
    thread1 = threading.Thread(target=fetch_answer)
    thread2 = threading.Thread(target=fetch_youtube)
    thread1.start()
    thread2.start()
    thread1.join()
    thread2.join()

    return jsonify({
        "answer": answer_result.get("answer", ""),
        "videos": youtube_result
    })

if __name__ == "__main__":
    app.run(debug=True)
