import React from "react";
import { EditProfileButton } from "./";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateFollowersAndFollowingCount } from "../usersSlice";

export default function ProfileDetails({ userToDisplay, userId }) {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let isFollowing;

  const handleFollowClick = () => {
    dispatch(updateFollowersAndFollowingCount(userId));
  };

  const isAuthenticatedUser = () => {
    return userToDisplay._id === currentUser?._id ? true : false;
  };

  const checkIfFollowing = () => {
    isFollowing = userToDisplay.followers.find(
      (user) => user === currentUser?._id
    );
    return isFollowing ? "Following" : "Follow";
  };

  const buttonStyle = () => {
    isFollowing = userToDisplay.followers.find(
      (user) => user === currentUser?._id
    );
    return isFollowing ? "btn-filled" : "btn-normal";
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="h-16 w-16 rounded-full self-start mr-2 bg-purple-600 bg-opacity-40 flex justify-center items-center flex-shrink-0">
          <span className=" font-semibold text-white text-lg">{`${userToDisplay?.firstName[0]}${userToDisplay?.lastName[0]}`}</span>
        </div>
        {isAuthenticatedUser() ? (
          <EditProfileButton />
        ) : (
          <button
            onClick={handleFollowClick}
            className={`${buttonStyle()} w-24`}
          >
            {checkIfFollowing()}
          </button>
        )}
      </div>

      <div>
        <div className="text-xl font-bold text-white">
          {userToDisplay?.firstName} {userToDisplay?.lastName}
        </div>
        <div className="text-base font-medium text-gray-500 mb-3">
          @{userToDisplay?.username}
        </div>
        <p className="text-base font-normal text-gray-200 mb-5">
          {userToDisplay?.bio}
        </p>
        <div className="flex pb-4  border-b border-gray-800">
          <Link
            to={`/profile/${userToDisplay._id}/following`}
            className="text-sm font-medium text-gray-500 mr-4"
          >
            <span className="text-base font-semibold text-gray-200">
              {userToDisplay.following.length}
            </span>{" "}
            Following
          </Link>

          <Link
            to={`/profile/${userToDisplay._id}/followers`}
            className="text-sm font-medium text-gray-500"
          >
            <span className="text-base font-semibold text-gray-200">
              {userToDisplay.followers.length}
            </span>{" "}
            Followers
          </Link>
        </div>
      </div>
    </div>
  );
}
