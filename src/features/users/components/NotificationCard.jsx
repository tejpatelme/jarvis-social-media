import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GenericAvatar } from "../../../components";
import { TimeAgo } from "../../posts/components";

export default function NotificationCard({ notification }) {
  const { users } = useSelector((state) => state.users);
  const notificationFrom = users.find((user) => user._id === notification.from);
  const navigate = useNavigate();

  const onNotificationClicked = () => {
    if (notification.type === "follow") {
      return navigate(`/profile/${notification.from}`);
    }
    if (notification.type === "like" || notification.type === "comment") {
      return navigate(`/posts/${notification.postId}`);
    }
  };

  const generateNotificationText = () => {
    if (notification.type === "follow") {
      return "followed you";
    }
    if (notification.type === "like") {
      return "liked your post";
    }
    if (notification.type === "comment") {
      return "commented on your post";
    }
  };

  return (
    <div
      onClick={onNotificationClicked}
      className="p-3 rounded ring-1 ring-purple-200 ring-opacity-20 flex justify-between items-center w-full cursor-pointer"
    >
      <div className="flex items-center">
        <GenericAvatar
          firstName={notificationFrom.firstName}
          lastName={notificationFrom.lastName}
          userId={notificationFrom._id}
          size="small"
        />

        <div className="w-full">
          <span className="text-base font-medium text-gray-200">
            {notificationFrom.firstName} {notificationFrom.lastName}
          </span>
          <span className="text-base text-gray-400">
            {" "}
            {generateNotificationText()}{" "}
            <TimeAgo timestamp={notification.createdAt} />
          </span>
        </div>
      </div>
    </div>
  );
}
