import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

export default function BottomBarNavlink({ link, icon }) {
  return (
    <NavLink
      end
      to={link}
      activeClassName="bg-gray-600 bg-opacity-10"
      className="px-3 py-4 w-full flex items-center justify-center text-gray-30"
    >
      <Icon icon={icon} size="28" />
    </NavLink>
  );
}
