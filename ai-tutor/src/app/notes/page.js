"use client";

import React, { useState } from "react";

const subjects = ["Math", "Physics", "Chemistry", "Biology", "History"];

const SubjectSelection = ({ onSelect }) => (
  <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white p-4">
    <h1 className="text-3xl font-bold mb-4">Select a Subject</h1>
    <select
      className="p-3 bg-gray-800 text-white rounded"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">-- Choose Subject --</option>
      {subjects.map((subject, index) => (
        <option key={index} value={subject}>{subject}</option>
      ))}
    </select>
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
  <div className="bg-gray-900 min-h-screen text-white p-4">
    <button onClick={onBack} className="bg-blue-500 px-4 py-2 rounded mb-4">Back</button>
    <h1 className="text-3xl font-bold mb-4">{subject}</h1>
    <div className="grid grid-cols-3 gap-4">
      {chapters[subject]?.map((chapter, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-xl">
          <h3 className="font-bold">{chapter.title}</h3>
          <p className="text-sm">{chapter.description}</p>
          <button className="mt-2 bg-blue-500 px-4 py-2 rounded">{chapter.action}</button>
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