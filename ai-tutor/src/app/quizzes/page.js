"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button.jsx";
import { Input } from "@/app/components/ui/input.jsx";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    setScore(null);
    setSelectedAnswers({});
    
    setTimeout(() => {
      const generatedQuiz = [
        {
          question: `What is a key fact about ${topic}?`,
          options: ["Fact 1", "Fact 2", "Fact 3", "Fact 4"],
          answer: "Fact 1",
        },
        {
          question: `Who is related to ${topic}?`,
          options: ["Person A", "Person B", "Person C", "Person D"],
          answer: "Person A",
        },
      ];
      setQuizData(generatedQuiz);
      setLoading(false);
    }, 1000);
  };

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
    <div className="min-h-screen h-20 flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-3xl pb-6 font-bold">🧠 AI Tutor - Quiz Generator</h1>

      {!quizData.length ? (
        <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-lg mb-6 text-center">Enter a topic to generate a quiz:</h2>

          <Input
            type="text"
            placeholder="E.g. Space, History, Science..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-6 p-4 rounded-lg w-full text-black text-lg "
          />

          <div className="flex justify-center mt-12"> {/* Increased margin-top */}
            <Button 
              onClick={generateQuiz} 
              className="bg-blue-600 px-6 py-3 text-lg w-full max-w-sm"
            >
              {loading ? "⏳ Generating..." : "Generate Quiz"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg min-h-fit">
          <h2 className="text-lg mb-4">Quiz on: <span className="font-bold">{topic}</span></h2>

          {quizData.map((q, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{`Q${index + 1}: ${q.question}`}</h3>
              {q.options.map((option, i) => (
                <label key={i} className="flex items-center bg-gray-800 rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-700">
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

          <div className="flex justify-between items-center mt-8">
            <Button onClick={() => setQuizData([])} className="bg-gray-600 px-6 py-2">Back</Button>
            <Button onClick={handleSubmit} className="bg-red-600 px-6 py-2">Submit</Button>
          </div>

          {score !== null && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">🎉 Your Score</h3>
              <p className="text-xl font-bold">{score}/{quizData.length} Correct</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
