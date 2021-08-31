import React from "react";
import { useSelector } from "react-redux";
import { CreatePost, PostCard } from "./components";
import {
  MobileTopNavbar,
  LogoutModal,
  FeedEmptyMessage,
  Heading,
} from "../../components";
import toast from "react-hot-toast";

export default function Posts() {
  const { posts, status, error } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);

  const followingUsersPosts = posts.filter((post) => {
    return (
      currentUser?.following?.includes(post?.userId?._id) ||
      post?.userId?._id === currentUser?._id
    );
  });

  const sortedPosts = followingUsersPosts
    ?.slice()
    ?.sort((a, b) => b.postedOn.localeCompare(a.postedOn));

  return (
    <>
      <Heading title="Home" />
      <div className="md:max-w-2xl flex-grow p-4 md:p-5 mb-20">
        <LogoutModal />
        {error && toast.error(error)}
        <MobileTopNavbar />
        <CreatePost />
        {status === "loading" && <p className="text-white">Loading...</p>}
        <div className="space-y-3">
          {sortedPosts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        {sortedPosts.length === 0 && status === "fulfilled" && (
          <FeedEmptyMessage />
        )}
      </div>
    </>
  );
}
