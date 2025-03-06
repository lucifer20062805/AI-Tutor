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
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    // Replace with actual API call
    const aiResponse = `AI Response for: "${query}"`;
    const searchResults = [
      { title: "Result 1", description: "This is the first search result." },
      { title: "Result 2", description: "This is the second search result." },
    ];

    setResponse(aiResponse);
    setResults(searchResults);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-8 bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">AI Tutor</h1>
        <Dashboard />
        <Card className="w-full max-w-lg">
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </CardContent>
        </Card>

        {response && (
          <Card className="w-full max-w-lg mt-4">
            <CardContent>{response}</CardContent>
          </Card>
        )}

        <SearchResults results={results} />
      </div>
    </div>
  );
}
