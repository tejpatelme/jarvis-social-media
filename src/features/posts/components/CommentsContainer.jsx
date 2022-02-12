import React from "react";
import { CommentCard } from "./";

export default function CommentsContainer({ post }) {
  return (
    <div className="pb-20">
      {post.comments.map((comment) => (
        <CommentCard key={comment._id} postId={post._id} comment={comment} />
      ))}
    </div>
  );
}
