import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeEditProfileData,
  updateEditProfileData,
  updateUserDetails,
} from "./usersSlice";

export default function EditProfile() {
  const { editProfileData } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const textAreaRef = useRef();

  const textAreaStyle =
    "text-gray-300 bg-gray-800 bg-opacity-60 w-full rounded overflow-hidden resize-none outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40 p-3";
  const inputStyle =
    "bg-gray-800 bg-opacity-60 rounded text-white w-full px-4 py-2 outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40";

  const handleEditProfileData = () => {
    if (editProfileData.firstName.trim() === "") {
      return toast.error("First Name cannot be empty");
    }

    if (editProfileData.lastName.trim() === "") {
      return toast.error("Last Name cannot be empty");
    }

    dispatch(
      updateUserDetails({
        firstName: editProfileData.firstName,
        lastName: editProfileData.lastName,
        bio: editProfileData.bio,
      })
    );
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(initializeEditProfileData({ userData: currentUser }));
    }
  }, [currentUser]);

  return (
    <>
      {editProfileData && Object.keys(editProfileData) !== 0 && (
        <div className="p-4 md:p-5 max-w-2xl flex-grow">
          <div className="flex mb-5">
            <label className="block mr-3 w-full">
              <span className="text-sm text-gray-300 mb-2 block">
                First Name
              </span>
              <input
                onChange={(e) =>
                  dispatch(
                    updateEditProfileData({
                      field: "firstName",
                      data: e.target.value,
                    })
                  )
                }
                value={editProfileData.firstName}
                type="text"
                placeholder=""
                className={inputStyle}
              />
            </label>

            <label className="block mr-3 w-full">
              <span className="text-sm text-gray-300 mb-2 block">
                Last Name
              </span>
              <input
                value={editProfileData.lastName}
                onChange={(e) =>
                  dispatch(
                    updateEditProfileData({
                      field: "lastName",
                      data: e.target.value,
                    })
                  )
                }
                type="text"
                placeholder=""
                className={inputStyle}
              />
            </label>
          </div>
          <label className="block mb-5">
            <span className="text-sm text-gray-300 mb-2 block">Bio</span>
            <textarea
              ref={textAreaRef}
              onChange={(e) =>
                dispatch(
                  updateEditProfileData({
                    field: "bio",
                    data: e.target.value,
                  })
                )
              }
              value={editProfileData.bio}
              className={textAreaStyle}
              style={{ height: `${textAreaRef?.current?.scrollHeight}px` }}
            ></textarea>
          </label>

          <div className="flex justify-end">
            <button onClick={handleEditProfileData} className="btn-filled">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
