import "./Profile.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleUser, updateFollowersAndFollowingCount } from "./usersSlice";

export default function Profile() {
  const { userId } = useParams();
  const { users, userToDisplay } = useSelector((state) => state.users);
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

  useEffect(() => {
    if (users.length > 0) {
      dispatch(getSingleUser({ userId }));
    }
  }, [users]);

  return (
    <>
      {!userToDisplay ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 md:px-5 md:max-w-2xl flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="h-16 w-16 rounded-full self-start mr-2 bg-purple-600 bg-opacity-40 flex justify-center items-center flex-shrink-0">
              <span className=" font-semibold text-white text-lg">{`${userToDisplay?.firstName[0]}${userToDisplay?.lastName[0]}`}</span>
            </div>
            {!isAuthenticatedUser() && (
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
            <div className="flex">
              <div className="text-sm font-medium text-gray-500 mr-4">
                <Link to={`/profile/${userToDisplay._id}/following`}>
                  <span className="text-base font-semibold text-gray-200">
                    {userToDisplay.following.length}
                  </span>{" "}
                  Following
                </Link>
              </div>

              <div className="text-sm font-medium text-gray-500">
                <Link to={`/profile/${userToDisplay._id}/followers`}>
                  <span className="text-base font-semibold text-gray-200">
                    {userToDisplay.followers.length}
                  </span>{" "}
                  Followers
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
