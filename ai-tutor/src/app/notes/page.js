"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button.jsx";
import { Input } from "@/app/components/ui/input.jsx";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";

const subjects = {
  Math: [
    { title: "Algebra", description: "Equations and expressions" },
    { title: "Geometry", description: "Shapes and angles" },
    { title: "Trigonometry", description: "Sine, cosine, and tangent" },
    { title: "Calculus", description: "Limits and derivatives" },
    { title: "Probability", description: "Chance and outcomes" },
    { title: "Statistics", description: "Data and analysis" },
    { title: "Linear Algebra", description: "Matrices and vectors" },
    { title: "Number Theory", description: "Prime numbers and divisibility" },
    { title: "Differential Equations", description: "Solving equations with derivatives" }
  ],
  Physics: [
    { title: "Newton's Laws", description: "Motion and forces" },
    { title: "Optics", description: "Light and reflection" },
    { title: "Thermodynamics", description: "Heat and energy transfer" },
    { title: "Electromagnetism", description: "Electricity and magnetism" },
    { title: "Quantum Mechanics", description: "Particles and waves" },
    { title: "Relativity", description: "Time and space" },
    { title: "Astrophysics", description: "Stars and galaxies" },
    { title: "Nuclear Physics", description: "Atoms and radiation" },
    { title: "Fluid Mechanics", description: "Behavior of liquids and gases" }
  ],
  Chemistry: [
    { title: "Chemical Reactions", description: "Balancing equations" },
    { title: "Periodic Table", description: "Elements and properties" },
    { title: "Organic Chemistry", description: "Carbon compounds" },
    { title: "Inorganic Chemistry", description: "Metals and non-metals" },
    { title: "Acids and Bases", description: "pH and reactions" },
    { title: "Electrochemistry", description: "Redox reactions" },
    { title: "Biochemistry", description: "Molecules in life" },
    { title: "Environmental Chemistry", description: "Pollution and sustainability" },
    { title: "Analytical Chemistry", description: "Chemical analysis techniques" }
  ],
  Biology: [
    { title: "Cell Structure", description: "Organelles and functions" },
    { title: "Genetics", description: "DNA and inheritance" },
    { title: "Evolution", description: "Natural selection" },
    { title: "Human Anatomy", description: "Body systems" },
    { title: "Ecology", description: "Ecosystems and environment" },
    { title: "Microbiology", description: "Bacteria and viruses" },
    { title: "Botany", description: "Plants and photosynthesis" },
    { title: "Zoology", description: "Animals and behavior" },
    { title: "Physiology", description: "Functions of living organisms" }
  ],History: [
    { title: "Ancient Civilizations", description: "Egyptians, Greeks, and Romans" },
    { title: "Medieval History", description: "Knights, castles, and feudalism" },
    { title: "Renaissance", description: "Art, science, and exploration" },
    { title: "Industrial Revolution", description: "Machines and modernization" },
    { title: "World War I", description: "Causes, events, and outcomes" },
    { title: "World War II", description: "Key battles and impact" },
    { title: "Cold War", description: "USA vs USSR tensions" },
    { title: "Civil Rights Movement", description: "Struggle for equality" },
    { title: "Modern History", description: "Globalization and technology" }
  ]
};

const SubjectSelection = ({ onSelect }) => (
  <div className="flex flex-1 flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
    <h1 className="text-4xl font-bold mb-6 tracking-wide">Choose a Subject</h1>
    <div className="relative w-72">
      <select
        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Select --</option>
        {Object.keys(subjects).map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>
    </div>
  </div>
);

const ChapterPage = ({ subject, onBack }) => (
  <div className="p-6">
    <button
      onClick={onBack}
      className="bg-red-500 px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:bg-red-600 transition-all"
    >
      ⬅ Back
    </button>
    <h1 className="text-5xl font-bold mt-6 mb-6 text-white text-center">{subject} Chapters</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {subjects[subject].map((chapter, index) => (
        <div
          key={index}
          className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
        >
          <h3 className="text-xl text-white font-bold">{chapter.title}</h3>
          <p className="text-gray-300 mt-2">{chapter.description}</p>
          <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-blue-600 transition-all">
            View
          </button>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {selectedSubject ? (
          <ChapterPage subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
        ) : (
          <SubjectSelection onSelect={setSelectedSubject} />
        )}
      </div>
    </div>
  );
};

export default App;
