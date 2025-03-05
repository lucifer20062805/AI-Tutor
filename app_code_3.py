from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyCKeI0ntu6btu3Wybvpsjk3lvnInso5LG0")  # Replace with your API key

app = Flask(__name__)
CORS(app)

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text()
    return text

def generate_content(prompt):
    """Generates content using Gemini AI."""
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        return response.text if response.text else "Error: No response from AI."
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save PDF temporarily
    pdf_path = "uploaded.pdf"
    file.save(pdf_path)

    # Extract text
    text = extract_text_from_pdf(pdf_path)

    # Generate quiz
    quiz_prompt = f"Generate a quiz based on the following content:\n{text}"
    quiz = generate_content(quiz_prompt)

    # Generate summary
    summary_prompt = f"Summarize the following content:\n{text}"
    summary = generate_content(summary_prompt)

    return jsonify({"quiz": quiz, "summary": summary})

if __name__ == "__main__":
    app.run(debug=True)
