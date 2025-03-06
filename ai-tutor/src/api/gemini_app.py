from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import fitz
import yt_dlp
import threading
import os

genai.configure(api_key="AIzaSyCKeI0ntu6btu3Wybvpsjk3lvnInso5LG0")

def generate_content(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        return response.text if response.text else "Error: No response from AI."
    except Exception as e:
        return f"Error: {str(e)}"

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

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        return f"Error extracting text: {str(e)}"
