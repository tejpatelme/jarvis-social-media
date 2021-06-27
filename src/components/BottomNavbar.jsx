import React, { useState } from "react";
import BottomBarNavlink from "./BottomBarNavlink";
import { Icon, LogoutModal } from "./";
import { useSelector } from "react-redux";

export default function BottomNavbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="fixed w-full flex md:hidden justify-between bottom-0 border-t border-gray-800 bg-gray-900 ">
      {showLogoutModal && (
        <LogoutModal
          showModal={showLogoutModal}
          setShowModal={setShowLogoutModal}
        />
      )}
      <BottomBarNavlink icon="home" link="/" />
      <BottomBarNavlink icon="search" link="search" />
      <BottomBarNavlink icon="notifications" link="notifications" />
      <BottomBarNavlink icon="person" link={`profile/${currentUser?._id}`} />
      <button
        onClick={() => setShowLogoutModal(true)}
        className="px-4 py-2 font-medium rounded w-full flex items-center text-gray-300 hover:bg-gray-600 hover:bg-opacity-30"
      >
        <Icon icon="logout" size="28" />
        <span className="ml-2 hidden md:inline">Logout</span>
      </button>
    </div>
  );
}
