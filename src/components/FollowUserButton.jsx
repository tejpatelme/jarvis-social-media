import "../features/users/Profile.css";
import React, { useState } from "react";
import { Spinner } from "./";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowersAndFollowingCount } from "../features/users/usersSlice";

export default function FollowUserButton({ userId }) {
  const [followUserStatus, setFollowUserStatus] = useState("idle");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  let isFollowing;

  const handleFollowClick = async () => {
    setFollowUserStatus("loading");
    await dispatch(updateFollowersAndFollowingCount(userId));
    setFollowUserStatus("fulfilled");
  };

  const checkIfFollowing = () => {
    isFollowing = currentUser?.following?.find((user) => user === userId);
    return isFollowing ? "Following" : "Follow";
  };

  const buttonStyle = () => {
    isFollowing = currentUser?.following?.find((user) => user === userId);
    return isFollowing ? "btn-filled" : "btn-normal";
  };

  return (
    <button
      disabled={followUserStatus === "loading"}
      onClick={handleFollowClick}
      className={`${buttonStyle()} w-24 disabled:cursor-not-allowed`}
    >
      {followUserStatus === "loading" ? <Spinner /> : checkIfFollowing()}
    </button>
  );
}
