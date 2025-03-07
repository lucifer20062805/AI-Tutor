"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button.jsx";
import { Input } from "@/app/components/ui/input.jsx";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";

const classes = ["8", "9", "10"];
const subjectsByClass = {
  8: ["Math", "Physics", "Chemistry", "Biology"],
  9: ["Math", "Physics", "Chemistry", "History"],
  10: ["Math", "Biology", "Chemistry", "History"],
};

const subjects = {
  8: {
    Math: [
      "Algebra.pdf",
      "Geometry.pdf",
      "Trigonometry.pdf",
      "Probability.pdf",
      "Statistics.pdf",
      "Calculus.pdf",
      "Vectors.pdf",
      "Coordinate_Geometry.pdf",
      "Number_Theory.pdf",
    ],
    Physics: [
      "Motion.pdf",
      "Forces.pdf",
      "Energy.pdf",
      "Waves.pdf",
      "Optics.pdf",
      "Electricity.pdf",
      "Magnetism.pdf",
      "Thermodynamics.pdf",
      "Modern_Physics.pdf",
    ],
    Chemistry: [
      "Atoms.pdf",
      "Bonding.pdf",
      "Reactions.pdf",
      "Acids_and_Bases.pdf",
      "Organic_Chemistry.pdf",
      "Periodic_Table.pdf",
      "Stoichiometry.pdf",
      "Thermochemistry.pdf",
      "Electrochemistry.pdf",
    ],
    Biology: [
      "Cell_Biology.pdf",
      "Genetics.pdf",
      "Evolution.pdf",
      "Ecology.pdf",
      "Physiology.pdf",
      "Biochemistry.pdf",
      "Microbiology.pdf",
      "Botany.pdf",
      "Zoology.pdf",
    ],
  },
  9: {
    Math: [
      "Algebra.pdf",
      "Geometry.pdf",
      "Trigonometry.pdf",
      "Probability.pdf",
      "Statistics.pdf",
      "Calculus.pdf",
      "Vectors.pdf",
      "Coordinate_Geometry.pdf",
      "Number_Theory.pdf",
    ],
    Physics: [
      "Motion.pdf",
      "Forces.pdf",
      "Energy.pdf",
      "Waves.pdf",
      "Optics.pdf",
      "Electricity.pdf",
      "Magnetism.pdf",
      "Thermodynamics.pdf",
      "Modern_Physics.pdf",
    ],
    Chemistry: [
      "Atoms.pdf",
      "Bonding.pdf",
      "Reactions.pdf",
      "Acids_and_Bases.pdf",
      "Organic_Chemistry.pdf",
      "Periodic_Table.pdf",
      "Stoichiometry.pdf",
      "Thermochemistry.pdf",
      "Electrochemistry.pdf",
    ],
    Biology: [
      "Cell_Biology.pdf",
      "Genetics.pdf",
      "Evolution.pdf",
      "Ecology.pdf",
      "Physiology.pdf",
      "Biochemistry.pdf",
      "Microbiology.pdf",
      "Botany.pdf",
      "Zoology.pdf",
    ],
  },
  10: {
    Math: [
      "Algebra.pdf",
      "Geometry.pdf",
      "Trigonometry.pdf",
      "Probability.pdf",
      "Statistics.pdf",
      "Calculus.pdf",
      "Vectors.pdf",
      "Coordinate_Geometry.pdf",
      "Number_Theory.pdf",
    ],
    Physics: [
      "Motion.pdf",
      "Forces.pdf",
      "Energy.pdf",
      "Waves.pdf",
      "Optics.pdf",
      "Electricity.pdf",
      "Magnetism.pdf",
      "Thermodynamics.pdf",
      "Modern_Physics.pdf",
    ],
    Chemistry: [
      "Atoms.pdf",
      "Bonding.pdf",
      "Reactions.pdf",
      "Acids_and_Bases.pdf",
      "Organic_Chemistry.pdf",
      "Periodic_Table.pdf",
      "Stoichiometry.pdf",
      "Thermochemistry.pdf",
      "Electrochemistry.pdf",
    ],
    Biology: [
      "Cell_Biology.pdf",
      "Genetics.pdf",
      "Evolution.pdf",
      "Ecology.pdf",
      "Physiology.pdf",
      "Biochemistry.pdf",
      "Microbiology.pdf",
      "Botany.pdf",
      "Zoology.pdf",
    ],
  },
};

const ChapterPage = ({ subject, selectedClass, onBack }) => (
  <div className="w-full p-6">
    <button
      onClick={onBack}
      className="bg-red-500 px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:bg-red-600 transition-all"
    >
      ⬅ Back
    </button>
    <h1 className="text-5xl font-bold mt-6 mb-6 text-white text-center">
      Class {selectedClass} - {subject} Chapters
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {subjects[selectedClass][subject].map((fileName, index) => {
        const pdfUrl = `/pdfs/${selectedClass}/${subject}/${fileName}`;
        const title = fileName.replace(/_/g, " ").replace(".pdf", "");
        return (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all w-full flex flex-col"
          >
            <h3 className="text-xl text-white font-bold">{title}</h3>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-blue-600 transition-all inline-block text-center"
            >
              View
            </a>
          </div>
        );
      })}
    </div>
  </div>
);

const App = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-6 flex flex-col items-center">
          {!selectedSubject ? (
            <>
              <h1 className="text-4xl font-bold mb-6 text-white">
                Select Class and Subject
              </h1>
              <div className="mb-4 w-72">
                <select
                  className="w-72 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  onChange={(e) => setSelectedClass(e.target.value)}
                  value={selectedClass || ""}
                >
                  <option value="">-- Select Class --</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{`Class ${cls}`}</option>
                  ))}
                </select>
              </div>
              {selectedClass && (
                <div className="mb-4 w-72">
                  <select
                    className="w-72 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    value={selectedSubject || ""}
                  >
                    <option value="">-- Select Subject --</option>
                    {subjectsByClass[selectedClass].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ) : (
            <ChapterPage
              subject={selectedSubject}
              selectedClass={selectedClass}
              onBack={() => setSelectedSubject(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
