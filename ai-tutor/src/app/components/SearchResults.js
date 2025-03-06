"use client";
import { useState } from "react";

export default function SearchResults() {
  const [selectedCategory, setSelectedCategory] = useState("Algebra");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <div className="flex gap-4 mt-4">
        <select
          className="p-2 bg-gray-800 text-white rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>Algebra</option>
          <option>Geometry</option>
          <option>Computer Science</option>
        </select>
      </div>
      <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
        <h3 className="text-lg font-semibold">{selectedCategory} Solutions</h3>
        <p>Here are some related learning materials...</p>
      </div>
    </div>
  );
}
