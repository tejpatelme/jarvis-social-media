import React from "react";

export default function Icon({ icon, size, color }) {
  return (
    <span
      className={`material-icons-round flex justify-center items-center ${
        color ? color : "text-gray-300"
      } cursor-pointer`}
      // style={{ height: `${size}px`, width: `${size}px` }}
      style={{ fontSize: `${size}px` }}
    >
      {icon}
    </span>
  );
}
