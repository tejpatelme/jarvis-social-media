import React from "react";

export default function FormatISOString({ timestamp }) {
  const date = new Date(timestamp);

  const dateString = date.toDateString().substr(4);

  const timeString = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <p className="text-sm text-gray-500 mb-4">{`${dateString} • ${timeString}`}</p>
  );
}
