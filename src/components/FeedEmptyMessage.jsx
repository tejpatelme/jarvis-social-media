import React from "react";

export default function FeedEmptyMessage({ text }) {
  return (
    <div className="rounded w-full bg-purple-600 bg-opacity-40 p-4 md:p-5 font-normal text-gray-200">
      {text ? text : "Create a post or follow someone to fill up your feed"}
    </div>
  );
}
