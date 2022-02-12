import React from "react";
import toast from "react-hot-toast";
import Icon from "../../../components/Icon";

export default function CopyLink({ postId }) {
  const postURL = `https://jarvis-share.netlify.app/posts/${postId}`;

  const handleCopyLinkClicked = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(postURL);
    toast.success("Link Copied!");
  };

  return (
    <button onClick={handleCopyLinkClicked} title="Copy Link">
      <Icon icon="share" size="18" color="text-gray-500" />
    </button>
  );
}
