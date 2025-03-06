"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import Sidebar from "@/app/components/Sidebar";
import Dashboard from "@/app/components/Dashboard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    setResponse(`AI Response for: "${query}"`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <Dashboard />
        <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center gap-8 mt-8">
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
      </div>
    </div>
  );
}
