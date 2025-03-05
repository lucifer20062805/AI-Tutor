"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    // Replace with API call
    setResponse(`AI Response for: "${query}"`);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">AI Tutor</h1>
      <Card className="w-full max-w-lg p-4 shadow-lg">
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
        <Card className="w-full max-w-lg p-4 shadow-lg">
          <CardContent>{response}</CardContent>
        </Card>
      )}
    </div>
  );
}
