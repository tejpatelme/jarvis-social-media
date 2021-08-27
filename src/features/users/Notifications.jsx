import React from "react";
import { useSelector } from "react-redux";
import { FeedEmptyMessage } from "../../components";
import { NotificationCard } from "./components";

export default function Notifications() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col md:max-w-2xl p-4 md:p-5 space-y-2 flex-grow">
      {currentUser && currentUser.notifications.length === 0 ? (
        <FeedEmptyMessage text="You have no new notifications" />
      ) : (
        currentUser.notifications.map((notification) => (
          <NotificationCard notification={notification} />
        ))
      )}
    </div>
  );
}
