"use client"; // 👈 Add this for Next.js

import React, { useState } from "react";

function FlashCard({ data }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-96 h-56 flex items-center justify-center bg-gray-800 rounded-lg p-6 text-center text-xl cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => setFlipped(!flipped)}
    >
      {flipped ? data.answer : data.question}
    </div>
  );
}

export default FlashCard;
