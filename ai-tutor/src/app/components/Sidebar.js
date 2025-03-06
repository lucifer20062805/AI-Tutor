"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">AI Tutor Pro</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/" className="p-2 bg-gray-800 rounded-md">Home</Link>
        <Link href="/quizzes" className="p-2 bg-gray-800 rounded-md">Quizzes</Link>
        <Link href="/videos" className="p-2 bg-gray-800 rounded-md">Videos</Link>
        <Link href="/notes" className="p-2 bg-gray-800 rounded-md">Notes</Link>
        <Link href="/AboutUs" className="p-2 bg-gray-800 rounded-md">AboutUs</Link>
      </nav>
    </div>
  );
}
