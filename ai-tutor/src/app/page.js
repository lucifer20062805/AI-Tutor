"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const setFolderRes = await fetch("http://127.0.0.1:5000/ollama_solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
    });

    if (!setFolderRes.ok) {
        throw new Error(`Error setting folder: ${setFolderRes.statusText}`);
    }

    const result = await setFolderRes.json();
    setResponse(result.result);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 justify-center items-center bg-black">
        <div className="w-full max-w-3xl min-h-[300px] p-12 flex flex-col text-white">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">
            Ask Anything
          </h2>

          {/* Input & Button Section */}
          <div className="flex flex-col gap-6 mt-auto">
            <textarea
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[180px] text-xl p-4 border border-gray-600 rounded-lg bg-black text-white placeholder-white resize-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={handleSubmit} 
              className="text-lg py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Submit
            </Button>
          </div>
          <div>
            <p>{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
