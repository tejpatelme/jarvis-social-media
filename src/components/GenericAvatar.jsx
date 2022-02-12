import React from "react";
import { useNavigate } from "react-router-dom";

export default function GenericAvatar({ firstName, lastName, userId, size }) {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  if (!size) {
    return (
      <div
        onClick={navigateToProfile}
        className="h-12 w-12 rounded-full self-start mr-2 bg-purple-600 bg-opacity-40 flex justify-center items-center flex-shrink-0 cursor-pointer"
      >
        <span className="font-semibold text-white text-lg">{`${firstName[0]}${lastName[0]}`}</span>
      </div>
    );
  }

  if (size === "small") {
    return (
      <div
        onClick={navigateToProfile}
        className="h-8 w-8 rounded-full self-start mr-2 bg-purple-600 bg-opacity-40 flex justify-center items-center flex-shrink-0 cursor-pointer"
      >
        <span className="font-semibold text-white text-xs">{`${firstName[0]}${lastName[0]}`}</span>
      </div>
    );
  }
}
