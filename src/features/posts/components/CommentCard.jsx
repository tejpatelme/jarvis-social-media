import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GenericAvatar, Icon } from "../../../components";
import { TimeAgo, DeleteCommentModal } from "../components";

export default function CommentCard({ comment, postId }) {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const commentedBy = users?.find((user) => user._id === comment.userId);
  const commentedByAuthenticatedUser = comment.userId === currentUser._id;

  return (
    <div className="py-3 border-b border-gray-800 flex">
      {
        <DeleteCommentModal
          showModal={showModal}
          setShowModal={setShowModal}
          postId={postId}
          commentId={comment._id}
        />
      }
      <GenericAvatar
        firstName={commentedBy.firstName}
        lastName={commentedBy.lastName}
        userId={commentedBy._id}
        size="small"
      />
      <div className="w-full">
        <div className="mb-1">
          <span className="text-sm font-medium text-gray-200">
            {`${commentedBy.firstName}  ${commentedBy.lastName}`}
          </span>{" "}
          <span className="text-sm text-gray-500">@{commentedBy.username}</span>
          <span className="text-sm">
            <TimeAgo timestamp={comment.date} />
          </span>
        </div>
        <p className="font-light text-gray-300 whitespace-pre-wrap break-all">
          {comment.content}
        </p>
      </div>
      <button
        title="Delete Comment"
        className="self-start justify-end"
        onClick={() => setShowModal(true)}
      >
        {commentedByAuthenticatedUser && (
          <Icon icon="delete" size="16" extraStyles="hover:text-red-500" />
        )}
      </button>
    </div>
  );
}
