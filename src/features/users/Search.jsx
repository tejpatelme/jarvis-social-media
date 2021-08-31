import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Heading, UserCard } from "../../components";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  const filteredUsers = users?.filter((user) => {
    const name = `${user.firstName} ${user.lastName}`;

    return user._id === currentUser?._id
      ? false
      : name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <Heading title="Search" />
      {filteredUsers && (
        <div className="md:max-w-2xl flex-grow p-4 md:p-5">
          <div className="w-full mb-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-gray-800 bg-opacity-60 rounded text-white w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40"
            />
          </div>

          <div className="w-full space-y-3">
            {filteredUsers?.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
