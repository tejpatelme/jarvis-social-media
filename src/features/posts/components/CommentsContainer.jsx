import React from "react";
import { CommentCard } from "./";

export default function CommentsContainer({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
