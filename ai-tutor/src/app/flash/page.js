"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";
import { Menu } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const flashcards = [
    { question: `What is ${topic}?`, answer: `${topic} is a something we do.` },
    { question: `Why is ${topic} important?`, answer: `Understanding ${topic} helps in acheiving and learning more about it.` },
    { question: `How can you use ${topic}?`, answer: `${topic} can be applied in various real-world scenarios.` },
  ];

  const handleSubmit = () => {
    if (topic.trim()) {
      setSubmitted(true);
    }
  };

  const handleNewTopic = () => {
    setTopic("");
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
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
          {!submitted ? (
            <div className="flex flex-col items-center bg-gray-900 w-130 h-80 content-center justify-center rounded-lg">
              <h1 className="text-3xl font-bold mb-6">Enter a Flashcard Topic</h1>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="p-2 rounded text-white bg-gradient-to-br from-gray-800 to-gray-900 mb-4 w-100"
                placeholder="Enter topic..."
              />
              <button onClick={handleSubmit} className="bg-gray-800 px-4 py-2 rounded">Submit</button>
            </div>
          ) : (
            <>
              {/* <h1 className="text-3xl font-bold mb-6">Flash Card Generator - {topic}</h1> */}
              <h1 className="text-3xl font-bold mb-6">Flash Card Generator</h1>
              <FlashCard data={flashcards[currentIndex]} flipped={flipped} setFlipped={setFlipped} />
              <div className="mt-4 flex gap-4">
                <button onClick={prevCard} className="bg-blue-500 px-4 py-2 rounded">Prev</button>
                <button onClick={nextCard} className="bg-green-500 px-4 py-2 rounded">Next</button>
              </div>
              <button onClick={handleNewTopic} className="bg-red-500 px-4 py-2 rounded mt-4">New Topic</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
