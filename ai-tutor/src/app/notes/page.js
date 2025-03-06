"use client";

import React, { useState } from "react";
import FlashCard from "./Flash";

const flashcards = [
  { question: "What is React?", answer: "A JavaScript library for building user interfaces." },
  { question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML." },
  { question: "What is state in React?", answer: "State is a built-in object that stores data and controls component behavior." },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
      <h1 className="text-3xl font-bold mb-6">Flash Card App</h1>
      <div className="relative w-96 h-56 perspective-1000">
        <FlashCard data={flashcards[currentIndex]} flipped={flipped} setFlipped={setFlipped} />
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={prevCard} className="bg-blue-500 px-4 py-2 rounded">Prev</button>
        <button onClick={nextCard} className="bg-green-500 px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}

export default App;
