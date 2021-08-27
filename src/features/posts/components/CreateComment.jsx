import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GenericAvatar, Spinner } from "../../../components";
import { updatePostCommentContent, updatePostComments } from "../postsSlice";

export default function CreateComment({ postId }) {
  const textAreaRef = useRef();
  const { currentUser } = useSelector((state) => state.auth);
  const { postCommentContent, addCommentStatus } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const handleCreateComment = () => {
    if (postCommentContent.trim() === "") {
      return toast.error("Comment cannot be empty");
    }

    dispatch(updatePostComments({ postId, content: postCommentContent }));
  };

  return (
    <div className="py-4 border-b border-gray-800 w-full flex">
      <GenericAvatar
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        userId={currentUser._id}
        size="small"
      />
      <div className="w-full">
        <textarea
          placeholder="Post a comment...."
          value={postCommentContent}
          onChange={(e) =>
            dispatch(
              updatePostCommentContent({ postCommentContent: e.target.value })
            )
          }
          ref={textAreaRef}
          className="text-gray-300 bg-transparent w-full overflow-hidden resize-none"
          style={{
            minHeight: "30px",
            height: `${textAreaRef?.current?.scrollHeight}px`,
          }}
        ></textarea>
        <div className="flex justify-end pt-4">
          <button
            onClick={handleCreateComment}
            className="rounded w-28 px-4 py-1 font-normal text-white bg-purple-600 disabled:cursor-not-allowed"
            disabled={addCommentStatus === "loading" ? true : false}
          >
            {addCommentStatus === "loading" ? <Spinner /> : "Comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
