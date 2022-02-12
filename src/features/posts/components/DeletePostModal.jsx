import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../postsSlice";

export default function DeletePostModal({ showModal, setShowModal, postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
    navigate("/", { replace: true });
  };

  return (
    <>
      {showModal && (
        <div className="p-4 min-h-screen w-screen flex justify-center items-center bg-black bg-opacity-70 fixed top-0 left-0 z-10">
          <div className="rounded bg-gray-900 p-4 md:p-5 w-max">
            <p className="text-lg text-white font-light mb-6">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="rounded text-base font-normal py-1 px-3 bg-purple-900 text-white mr-3"
              >
                No
              </button>
              <button
                onClick={handleDeletePost}
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
