"use client";

import Link from "next/link";
import { Home, Users, Folder, Calendar, FileText, PieChart } from "lucide-react";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Quiz", href: "/quizzes", icon: FileText},
  { name: "Notes", href: "/notes", icon: Folder },
  { name: "Flashcard", href: "/flash", icon: Calendar },
  { name: "Reports", href: "/reports", icon: PieChart },
  { name: "About Us", href: "/AboutUs", icon:Users   },
];

const teams = [
  { name: "Heroicons", initial: "H" },
  { name: "Tailwind Labs", initial: "T" },
  { name: "Workcation", initial: "W" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">AI Tutor Pro</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <Link key={name} href={href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-6">
        {/* <h3 className="text-sm font-semibold text-gray-400 mb-2">Your teams</h3> */}
        {/* <div className="flex flex-col gap-2">
          {teams.map(({ name, initial }) => (
            <div key={name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-xs font-bold">
                {initial}
              </span>
              <span>{name}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}