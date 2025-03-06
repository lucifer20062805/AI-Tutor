"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button.jsx";
import { Input } from "@/app/components/ui/input.jsx";

export default function FlashcardGenerator() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateFlashcards = async () => {
    setLoading(true);
    setFlashcards([]);
    setCurrentCard(0);
    setShowAnswer(false);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/generate-flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (response.ok) {
        setFlashcards(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-3xl pb-6 font-bold">📚 AI Tutor - Flashcards</h1>

      {!flashcards.length ? (
        <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-lg mb-6 text-center">Enter a topic to generate flashcards:</h2>

          <Input
            type="text"
            placeholder="E.g. AI, Physics, Math..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-6 p-4 rounded-lg w-full text-black text-lg"
          />

          <div className="flex justify-center mt-4">
            <Button onClick={generateFlashcards} className="bg-blue-600 px-6 py-3 text-lg w-full max-w-sm">
              {loading ? "⏳ Generating..." : "Generate Flashcards"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-lg mb-4 text-center">Flashcards on: <span className="font-bold">{topic}</span></h2>

          {flashcards.length > 0 && (
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full text-center text-lg">
                <p>{flashcards[currentCard].question}</p>
                {showAnswer && <p className="mt-4 text-green-400">{flashcards[currentCard].answer}</p>}
              </div>

              <div className="flex justify-between mt-6 w-full">
                <Button onClick={() => setShowAnswer(!showAnswer)} className="bg-yellow-500 px-6 py-2">
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </Button>
                <Button
                  onClick={() => setCurrentCard((prev) => (prev + 1) % flashcards.length)}
                  className="bg-blue-600 px-6 py-2"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
