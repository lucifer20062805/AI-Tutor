"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import Dashboard from "@/components/Dashboard";
import SearchResults from "@/components/SearchResults";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    setResponse(`AI Response for: "${query}"`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex bg-black flex-1 justify-center items-center">
        <Card className="w-full max-w-3xl min-h-[450px] p-12 shadow-xl flex flex-col bg-black text-black">
          <CardContent className="flex flex-col justify-between h-full">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-30 text-black">
              {/* AI Tutor - Ask Anything */}
              Ask Anything
            </h2>

            {/* Input & Button Section */}
            <div className="flex flex-col mt-auto">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="!h-[200px] text-xl p-4 border border-gray-500 rounded-lg text-black placeholder-black bg-white"
              />
              <Button 
                onClick={handleSubmit} 
                className="text-lg py-3 px-6 mt-6 bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
