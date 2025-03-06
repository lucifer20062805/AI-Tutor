import fitz  # PyMuPDF for PDF text extraction
import torch
from transformers import BartForConditionalGeneration, BartTokenizer

# Load BART model and tokenizer
model_name = "facebook/bart-large-cnn"
tokenizer = BartTokenizer.from_pretrained(model_name)
model = BartForConditionalGeneration.from_pretrained(model_name)

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"
    return text.strip()

def summarize_text(text, max_length=200, min_length=50):
    """Summarizes text using a BART-based Transformer model."""
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
    
    summary_ids = model.generate(inputs, max_length=max_length, min_length=min_length, length_penalty=2.0, num_beams=4, early_stopping=True)
    
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def summarize_pdf(pdf_path):
    """Extracts text from PDF and summarizes it using BART."""
    text = extract_text_from_pdf(pdf_path)
    if not text:
        return "No text found in the PDF."
    return summarize_text(text)

if __name__ == "__main__":
    pdf_path = "example.pdf"  # Change this to your PDF file path
    summary = summarize_pdf(pdf_path)
    print("\nSummary:\n", summary)
