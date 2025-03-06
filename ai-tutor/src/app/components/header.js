"use client";

import React from "react";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-900 text-white flex items-center justify-between p-4 shadow-md">
      {/* <button onClick={toggleSidebar} className="text-white p-2">
        <Menu size={24} />
      </button> */}
      <h1 className="bg-gray-900 text-gray-900 font-bold">Dashboard</h1>
      <div className="">
        <h1 className="bg-gray-900 text-xl font-bold">AI Tutor Pro</h1>
      </div>

      {/* <img
        src="https://via.placeholder.com/40"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      /> */}
    </header>
  );
};

export default Header;
