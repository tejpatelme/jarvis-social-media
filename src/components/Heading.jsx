import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

export default function Heading({ title, showBackButton }) {
  const navigate = useNavigate();

  const onNavigateBack = () => navigate(-1);

  return (
    <div className="w-full border-b border-gray-800 px-4 md:px-5 py-4 flex items-center sticky top-0 bg-gray-900">
      {showBackButton && (
        <button onClick={onNavigateBack} className="mr-3">
          <Icon
            icon="arrow_back"
            extraStyles="rounded-full p-1 hover:bg-purple-600/25"
          />
        </button>
      )}
      <h1 className="font-bold text-xl text-white  sticky top-0">{title}</h1>
    </div>
  );
}
