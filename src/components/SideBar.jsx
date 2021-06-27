import React, { useState } from "react";
import Logo from "../assets/jarvis-share-logo.svg?component";
import Icon from "./Icon";
import SidebarNavlink from "./SidebarNavlink";
import LogoutModal from "./LogoutModal";
import { useSelector } from "react-redux";

export default function SideBar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="px-4 py-5 sticky left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col items-center">
      {showLogoutModal && (
        <LogoutModal
          showModal={showLogoutModal}
          setShowModal={setShowLogoutModal}
        />
      )}
      <Logo />
      <div className="w-full mt-6 space-y-2 flex flex-col h-full justify-between">
        <div className="space-y-2">
          <SidebarNavlink icon="home" link="/" title="Home" />
          <SidebarNavlink icon="search" link="search" title="Search" />
          <SidebarNavlink
            icon="notifications"
            link="notifications"
            title="Notifications"
          />
          <SidebarNavlink
            icon="person"
            link={`profile/${currentUser?._id}`}
            title="Profile"
          />
        </div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="px-4 py-2 font-medium rounded w-full flex items-center text-gray-300 hover:bg-gray-600 hover:bg-opacity-30"
        >
          <Icon icon="logout" size="28" />
          <span className="ml-2">Logout</span>
        </button>
      </div>
    </div>
  );
}
