"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Users, Folder, Calendar, FileText, PieChart, Menu } from "lucide-react";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Quiz", href: "/quizzes", icon: FileText },
  { name: "Notes", href: "/notes", icon: Folder },
  { name: "Flashcard", href: "/flash", icon: Calendar },
  // { name: "Reports", href: "/reports", icon: PieChart },
  { name: "About Us", href: "/AboutUs", icon: Users },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
        <Menu className="w-6 h-6" />
      </button>
      <h2 className={`text-xl font-bold mb-6 transition-all duration-300 ${isCollapsed ? "hidden" : "block"}`}>AI Tutor Pro</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <Link key={name} href={href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800">
            <Icon className="w-5 h-5" />
            <span className={isCollapsed ? "hidden" : "block"}>{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}