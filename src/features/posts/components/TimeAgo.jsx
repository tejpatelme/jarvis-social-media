import React from "react";
import { parseISO, formatDistanceToNowStrict } from "date-fns";

export default function TimeAgo({ timestamp }) {
  let timeAgo;

  if (timestamp) {
    const date = parseISO(timestamp);
    timeAgo = formatDistanceToNowStrict(date);
  }

  return <span className="text-gray-500"> • {timeAgo}</span>;
}
