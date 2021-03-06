import React from "react";
import { useSelector } from "react-redux";
import { FeedEmptyMessage, Heading } from "../../components";
import { NotificationCard } from "./components";

export default function Notifications() {
  const { currentUser } = useSelector((state) => state.auth);

  const sortedNotifications = currentUser.notifications
    ?.slice()
    ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <Heading title="Notifications" />
      <div className="flex flex-col md:max-w-2xl p-4 md:p-5 space-y-2 flex-grow">
        {currentUser && sortedNotifications.length === 0 ? (
          <FeedEmptyMessage text="You have no new notifications" />
        ) : (
          sortedNotifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))
        )}
      </div>
    </>
  );
}
