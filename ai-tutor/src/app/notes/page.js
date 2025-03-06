"use client";

import React, { useState } from "react";

const subjects = ["Math", "Physics", "Chemistry", "Biology", "History"];

const SubjectSelection = ({ onSelect }) => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
    <h1 className="text-4xl font-bold mb-6 tracking-wide">Choose a Subject</h1>
    <div className="relative w-72">
      <select
        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Select --</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        ⏬
      </div>
    </div>
  </div>
);

const chapters = {
  Math: [
    { title: "Algebra", description: "Equations and expressions", action: "View" },
    { title: "Geometry", description: "Shapes and angles", action: "Explore" }
  ],
  Physics: [
    { title: "Newton's Laws", description: "Motion and forces", action: "Discover" }
  ],
  Chemistry: [
    { title: "Chemical Reactions", description: "Balancing equations", action: "Study" }
  ]
};

const ChapterPage = ({ subject, onBack }) => (
  <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
    {/* Back Button at Top-Right */}
    <button
      onClick={onBack}
      className="absolute top-4 right-6 bg-red-500 px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:bg-red-600 transition-all"
    >
      ⬅ Back
    </button>

    {/* Page Title */}
    <h1 className="text-5xl font-bold mt-6 mb-6 text-center">{subject} Chapters</h1>

    {/* Chapter Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {chapters[subject]?.map((chapter, index) => (
        <div
          key={index}
          className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
        >
          <h3 className="text-xl font-bold">{chapter.title}</h3>
          <p className="text-gray-300 mt-2">{chapter.description}</p>
          <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-blue-600 transition-all">
            {chapter.action}
          </button>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div>
      {selectedSubject ? (
        <ChapterPage subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
      ) : (
        <SubjectSelection onSelect={setSelectedSubject} />
      )}
    </div>
  );
};

export default App;
