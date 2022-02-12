import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { resetPosts } from "../features/posts/postsSlice";

export default function LogoutModal({ showModal, setShowModal }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    setShowModal(false);
    dispatch(logout());
    dispatch(resetPosts());
  };

  return (
    <>
      {showModal && (
        <div className="min-h-screen w-screen flex justify-center items-center bg-black bg-opacity-70 fixed top-0 left-0 z-10">
          <div className="rounded bg-gray-900 p-4 md:p-5 w-max">
            <p className="text-lg text-white font-light mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="rounded text-base font-normal py-1 px-3 bg-purple-900 text-white mr-3"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="rounded text-base font-normal py-1 px-3 bg-red-500 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
