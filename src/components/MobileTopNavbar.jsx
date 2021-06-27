import React from "react";
import Logo from "../assets/jarvis-share-logo.svg?component";

export default function MobileTopNavbar() {
  return (
    <nav className="w-full md:hidden pb-4 flex justify-center border-b border-gray-800">
      <Logo />
    </nav>
  );
}
