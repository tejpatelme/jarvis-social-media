import React from "react";

export default function Icon({ icon, size, color, extraStyles }) {
  return (
    <span
      className={`material-icons-round flex justify-center items-center ${
        color ? color : "text-gray-300"
      } cursor-pointer ${extraStyles ? extraStyles : ""}`}
      style={{ fontSize: `${size}px` }}
    >
      {icon}
    </span>
  );
}
