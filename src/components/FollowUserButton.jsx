import "../features/users/Profile.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowersAndFollowingCount } from "../features/users/usersSlice";

export default function FollowUserButton({ userId }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  let isFollowing;

  const handleFollowClick = () => {
    dispatch(updateFollowersAndFollowingCount(userId));
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
    <button onClick={handleFollowClick} className={`${buttonStyle()} w-24`}>
      {checkIfFollowing()}
    </button>
  );
}
