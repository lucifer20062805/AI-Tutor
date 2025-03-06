"use client";
import { Button } from "@/app/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold">Welcome to AI Tutor!</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 text-white rounded-lg">
          <h2 className="text-xl font-semibold">Enhance your skills</h2>
          <Button className="mt-2">Begin Quiz</Button>
        </div>
        {/* <div className="p-4 bg-gray-800 text-white rounded-lg">
          <h2 className="text-xl font-semibold">Daily Challenge</h2>
          <Button className="mt-2">Start Now</Button>
        </div> */}
      </div>
    </div>
  );
}
