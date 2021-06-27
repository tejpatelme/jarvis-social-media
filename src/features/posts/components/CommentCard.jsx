import React from "react";
import { useSelector } from "react-redux";
import { GenericAvatar } from "../../../components";
import { TimeAgo } from "../components";

export default function CommentCard({ comment }) {
  const { users } = useSelector((state) => state.users);
  const commentedBy = users?.find((user) => user._id === comment.userId);

  return (
    <div className="py-3 border-b border-gray-800 flex">
      <GenericAvatar
        firstName={commentedBy.firstName}
        lastName={commentedBy.lastName}
        userId={commentedBy._id}
        size="small"
      />
      <div>
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
    </div>
  );
}
