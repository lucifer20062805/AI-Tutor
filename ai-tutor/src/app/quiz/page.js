"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter",
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
      <h1 className="text-lg font-bold mb-4">Quiz Screen</h1>
      <Card className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🧠 AI Tutor</h2>
            <span className="text-sm text-gray-300">Quiz</span>
          </div>

          {quizData.map((q, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-md font-semibold mb-2">{`Question ${index + 1}: ${q.question}`}</h3>
              {q.options.map((option, i) => (
                <label key={i} className="flex items-center bg-gray-800 rounded-lg p-2 mb-2 cursor-pointer">
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

          <div className="flex justify-between items-center mt-4">
            <div className="bg-gray-800 px-4 py-2 rounded-md">
              Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <Button onClick={handleSubmit} className="bg-red-600">Submit</Button>
          </div>

          {score !== null && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Your Score</h3>
              <p>{score}/{quizData.length} Correct</p>

              <div className="mt-3 bg-gray-800 p-3 rounded-lg">
                <h4 className="text-md font-semibold mb-2">Correct Answers:</h4>
                {quizData.map((q, i) => (
                  <p key={i}>{i + 1}. {q.answer}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
