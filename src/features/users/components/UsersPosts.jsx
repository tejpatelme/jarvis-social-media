import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../posts/components";
import { FeedEmptyMessage } from "../../../components";
import { sortPostsByDate } from "../../../utils/post-utils";

export default function UsersPosts({ userId }) {
  const { posts } = useSelector((state) => state.posts);

  const usersPosts = posts.filter((post) => post.userId._id === userId);

  const sortedUsersPosts = sortPostsByDate(usersPosts);

  return (
    <div className="pt-4 pb-20 space-y-3">
      {sortedUsersPosts.length === 0 ? (
        <FeedEmptyMessage text="User has no posts currently :(" />
      ) : (
        sortedUsersPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
