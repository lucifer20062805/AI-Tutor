"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button.jsx";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mercury", "Earth", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Tesla"],
    answer: "Einstein",
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "8", "10", "12"],
    answer: "8",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
];

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSelect = (index, option) => {
    setSelectedAnswers({ ...selectedAnswers, [index]: option });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizData.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correctCount++;
    });
    setScore(correctCount);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-2xl pb-6 font-bold">🧠 AI Tutor - Quiz</h1>

      <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg min-h-fit">
        {quizData.map((q, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{`Q${index + 1}: ${q.question}`}</h3>
            {q.options.map((option, i) => (
              <label
                key={i}
                className="flex items-center bg-gray-800 rounded-lg p-2 mb-2 cursor-pointer hover:bg-gray-700"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleSelect(index, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <div className="bg-gray-800 px-4 py-2 rounded-md">
            ⏳ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700">Submit</Button>
        </div>

        {score !== null && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">🎉 Your Score</h3>
            <p className="text-xl font-bold">{score}/{quizData.length} Correct</p>

            <div className="mt-3">
              <h4 className="text-md font-semibold mb-2">✅ Correct Answers:</h4>
              {quizData.map((q, i) => (
                <p key={i} className="text-sm">{i + 1}. {q.answer}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
