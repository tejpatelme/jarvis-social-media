import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../../components";
import { deleteComment } from "../postsSlice";

export default function DeleteCommentModal({
  showModal,
  setShowModal,
  postId,
  commentId,
}) {
  const dispatch = useDispatch();
  const { deleteCommentStatus } = useSelector((state) => state.posts);

  const handleDeleteComment = async () => {
    await dispatch(deleteComment({ postId, commentId }));
  };

  return (
    <>
      {showModal && (
        <div className="p-4 min-h-screen w-screen flex justify-center items-center bg-black bg-opacity-70 fixed top-0 left-0 z-10">
          <div className="rounded bg-gray-900 p-4 md:p-5 w-max">
            <p className="text-lg text-white font-light mb-6">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="rounded text-base font-normal py-1 px-3 bg-purple-900 text-white mr-3"
              >
                No
              </button>
              <button
                disabled={deleteCommentStatus === "loading"}
                onClick={handleDeleteComment}
                className="rounded text-base font-normal py-1 px-3 bg-red-500 text-white disabled:cursor-not-allowed"
              >
                {deleteCommentStatus === "loading" ? <Spinner /> : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
