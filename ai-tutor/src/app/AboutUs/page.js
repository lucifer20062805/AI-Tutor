"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/header";
import Image from "next/image";

const teamMembers = [
  {
    name: "Arya",
    role: "AI Engineer, CTO, CEO, DIRECTOR,FOUNDER",
    image: "/images/arya.jpg",
  },
  {
    name: "Rachit",
    role: "peon",
    image: "/images/jane.jpg",
  },
  {
    name: "RAJAT",
    role: "Janitor",
    image: "/images/alex.jpg",
  },
  {
    name: "Vedang",
    role: "Security guard",
    image: "/images/emily.jpg",
  },
];

export default function AboutUs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8">
          <div className="max-w-4xl bg-gray-900 p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-gray-300 mb-6">
              Welcome to <span className="font-bold text-white">AI Tutor</span>, your AI-powered learning companion.
              We are a passionate team dedicated to making education interactive and engaging.
            </p>

            {/* Team Section */}
            <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-gray-700"
                  />
                  <h3 className="text-lg font-semibold mt-3">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button onClick={() => window.history.back()} className="bg-blue-600 px-6 py-3 text-lg">
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}