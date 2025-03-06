"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";

function FlashCard({ data, flipped, setFlipped }) {
  return (
    <div
      className="w-96 h-56 flex items-center justify-center bg-black rounded-lg p-6 text-center text-xl cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => setFlipped(!flipped)}
    >
      {flipped ? data.answer : data.question}
    </div>
  );
}

function App() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSubmit = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSubmitted(true);
    setFlashcards([]);
    setCurrentIndex(0);
    setFlipped(false);

    try {
      const response = await fetch("http://127.0.0.1:5000/ollama_solve_flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate flashcards");

      // Extracting Q&A pairs using regex
      const flashcardList = [];
      const flashcardRegex = /\d+\.\s*(.*?)\s*Answer:\s*(.*)/g;
      let match;
      while ((match = flashcardRegex.exec(data)) !== null) {
        flashcardList.push({
          question: match[1].trim(),
          answer: match[2].trim(),
        });
      }
      console.log(flashcardList);
      if (flashcardList.length === 0) throw new Error("Invalid response format");
      setFlashcards(flashcardList);
    } catch (error) {
      alert(error.message);
      setSubmitted(false);
    }
    setLoading(false);
  };

  const handleNewTopic = () => {
    setTopic("");
    setFlashcards([]);
    setSubmitted(false);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }, 300);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen  bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
          {!submitted ? (
            <div className="flex flex-col items-center bg-gray-900 w-100 h-60 content-center justify-center rounded-lg">
              <h1 className="text-3xl font-bold mb-4">Enter a Topic</h1>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-100 p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter topic..."
              />
              <button onClick={handleSubmit} className="bg-gray-800 px-4 py-2 rounded">
                {loading ? "⏳ Generating..." : "Submit"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;