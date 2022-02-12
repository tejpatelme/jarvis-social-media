import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Heading, UserCard } from "../../components";

export default function Followers() {
  const { userId } = useParams();
  const { users } = useSelector((state) => state.users);
  const user = users.find((user) => user._id === userId);

  return (
    <>
      {user && (
        <>
          <Heading
            title={`${user.firstName}  ${user.lastName} Followers`}
            showBackButton={true}
          />
          <div className="flex flex-col md:max-w-2xl p-4 md:p-5 space-y-2 flex-grow">
            {user.followers.map((userId) => {
              const user = users.find((user) => user._id === userId);
              return <UserCard key={userId} user={user} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
