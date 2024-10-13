import React from "react";

export default function LoadingShimmer({ height }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-md w-full`}
      style={{ height: height }}
    ></div>
  );
}
