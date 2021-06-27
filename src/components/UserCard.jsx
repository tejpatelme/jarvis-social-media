import React from "react";
import { GenericAvatar, FollowUserButton } from "./";

export default function UserCard({ user }) {
  return (
    <div className="p-4 rounded ring-1 ring-purple-200 ring-opacity-20 flex justify-between items-center w-full">
      <div className="flex">
        <GenericAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          userId={user._id}
        />

        <div className="">
          <span className="block text-base font-medium text-gray-200">
            {user.firstName} {user.lastName}
          </span>
          <span className="block text-base text-gray-500">
            @{user.username}
          </span>
        </div>
      </div>
      <FollowUserButton userId={user._id} />
    </div>
  );
}
