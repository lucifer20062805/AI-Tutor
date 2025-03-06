"use client";

import React, { useState } from "react";

function FlashCard({ data, flipped, setFlipped }) {
  return (
    <div
      className="w-96 h-56 flex items-center justify-center bg-gray-800 rounded-lg p-6 text-center text-xl cursor-pointer transition-transform transform hover:scale-105"
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

  const flashcards = [
    { question: `What is ${topic}?`, answer: `${topic} is a topic you chose.` },
    { question: `Why is ${topic} important?`, answer: `Understanding ${topic} helps in learning more about it.` },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {!submitted ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Enter a Topic</h1>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="p-2 rounded text-black bg-white mb-4"
            placeholder="Enter topic..."
          />
          <button onClick={handleSubmit} className="bg-blue-500 px-4 py-2 rounded">Submit</button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Flash Card App - {topic}</h1>
          <FlashCard data={flashcards[currentIndex]} flipped={flipped} setFlipped={setFlipped} />
          <div className="mt-4 flex gap-4">
            <button onClick={prevCard} className="bg-blue-500 px-4 py-2 rounded">Prev</button>
            <button onClick={nextCard} className="bg-green-500 px-4 py-2 rounded">Next</button>
          </div>
          <button onClick={handleNewTopic} className="bg-red-500 px-4 py-2 rounded mt-4">New Topic</button>
        </>
      )}
    </div>
  );
}

export default App;
