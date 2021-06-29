import "./Profile.css";
import React, { useEffect } from "react";
import { ProfileDetails, UsersPosts } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUser } from "./usersSlice";

export default function Profile() {
  const { userId } = useParams();
  const { users, userToDisplay } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length > 0) {
      dispatch(getSingleUser({ userId }));
    }
  }, [users]);

  return (
    <div className="p-4 md:px-5 md:max-w-2xl flex-grow">
      {!userToDisplay ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          <ProfileDetails userId={userId} userToDisplay={userToDisplay} />
          <UsersPosts userId={userId} />
        </>
      )}
    </div>
  );
}
