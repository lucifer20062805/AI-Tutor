"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    setLoading(true);
    const setFolderRes = await fetch("http://127.0.0.1:5000/ollama_solve_any", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: query }),
    });

    if (!setFolderRes.ok) {
        throw new Error(`Error setting folder: ${setFolderRes.statusText}`);
    }

    setQuery(""); // Clear the input field

    const result = await setFolderRes.json();
    setResponse(result.result);
    setLoading(false);
  };

  const handleEdit = () => {
    setSubmitted(false);
    setQuery(""); // Clear the input field
    setResponse("");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 transition-all duration-300">
          <div className="w-full max-w-3xl min-h-[300px] p-12 flex flex-col text-white">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-6 text-white">
              Ask Anything
            </h2>

            {/* Input or Response Section */}
            <div className="flex flex-col gap-6 mt-auto">
              {!submitted ? (
                <textarea
                  placeholder="Ask me anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-[150px] text-xl p-4 border border-gray-600 rounded-lg bg-black text-white placeholder-white resize-none focus:ring-2 focus:ring-gray-500"
                />
              ) : (
                <div className="p-4 border border-gray-600 rounded-lg bg-gray-900 text-white text-lg">
                  {loading ? <span className="animate-pulse">Generating response...</span> : response}
                </div>
              )}

              {/* Buttons */}
              {!submitted ? (
                <Button 
                  onClick={handleSubmit} 
                  className="text-lg py-3 px-6 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  onClick={handleEdit} 
                  className="text-lg py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Ask Another
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
