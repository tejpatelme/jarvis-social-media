import React from "react";
import { CommentCard } from "./";

export default function CommentsContainer({ comments }) {
  return (
    <div className="pb-20">
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
