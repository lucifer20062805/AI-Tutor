"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button.jsx";
import { Input } from "@/app/components/ui/input.jsx";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && quizData.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, quizData]);

  const generateQuiz = async () => {
    setLoading(true);
    setScore(null);
    setSelectedAnswers({});
    setTimeLeft(600);
    setQuizCompleted(false);

    try {
      const setFolderRes = await fetch("http://127.0.0.1:5000/ollama_solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic }),
      });

      if (!setFolderRes.ok) {
        throw new Error(`Error setting folder: ${setFolderRes.statusText}`);
      }

      const result = await setFolderRes.json();
      const generatedQuiz = result.result.map((item) => {
        const [questionPart, answerPart] = item.split("Answer: ");
        const [question, ...options] = questionPart.split("\n").filter(Boolean);
        const formattedOptions = options.map((opt) => opt);
        const correctAnswer = answerPart.trim();

        return {
          question: question.trim(),
          options: formattedOptions,
          answer: formattedOptions[["A", "B", "C", "D"].indexOf(correctAnswer)],
        };
      });

      setQuizData(generatedQuiz);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
    } finally {
      setLoading(false);
    }
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
    setQuizCompleted(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8">
          <h1 className="text-3xl pb-6 font-bold">🧠 AI Tutor - Quiz Generator</h1>

          {!quizData.length && !quizCompleted ? (
            <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-lg mb-6 text-center">Enter a topic to generate a quiz:</h2>

              <Input
                type="text"
                placeholder="E.g. Space, History, Science..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mb-6 p-4 rounded-lg w-full text-black text-lg"
              />

              <div className="flex justify-center mt-12">
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
              {!quizCompleted ? (
                <>
                  <h2 className="text-lg mb-4">Quiz on: <span className="font-bold">{topic}</span></h2>
                  <div className="text-red-500 text-center text-lg mb-4">⏳ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>

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
                </>
              ) : (
                <div className="mt-6 bg-gray-800 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-semibold">🎉 Your Score</h3>
                  <p className="text-xl font-bold">{score}/{quizData.length} Correct</p>
                  <Button onClick={() => setQuizCompleted(false)} className="bg-blue-600 px-6 py-2 mt-4">Try Again</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
