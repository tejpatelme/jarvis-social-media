import React from "react";

export default function Input({ type, placeholder, setInput }) {
  return (
    <input
      onChange={(e) => setInput(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="bg-gray-800 bg-opacity-30 rounded text-white w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40 mb-7"
    />
  );
}
