import React from "react";
import Icon from "../../../components/Icon";
import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLikes } from "../postsSlice";

export default function PostCard({ post }) {
  const {
    _id,
    userId: { _id: userId, username, firstName, lastName },
    likes: { count },
    postedOn,
    comments,
    content,
  } = post;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPost = useSelector((state) =>
    state.posts.posts.find((post) => post._id === _id)
  );
  const { currentUser } = useSelector((state) => state.auth);

  const handleLikeClicked = () => {
    dispatch(updateLikes(_id));
  };

  const checkIfPostLiked = () => {
    const match = currentPost.likes.likedBy.find(
      (user) => user === currentUser?._id
    );

    return match ? "text-purple-500" : "text-gray-500";
  };

  const navigateToPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const navigateToProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      onClick={navigateToPost}
      className="p-4 md:p-5 rounded ring-1 ring-purple-200 ring-opacity-20 cursor-pointer w-full break-all"
    >
      <div className="flex">
        <div
          onClick={navigateToProfile}
          className="h-12 w-12 rounded-full self-start mr-2 bg-purple-600 bg-opacity-40 flex justify-center items-center flex-shrink-0"
        >
          <span className=" font-semibold text-white text-lg">{`${firstName[0]}${lastName[0]}`}</span>
        </div>
        <div className="w-full">
          <div className="mb-1">
            <span className="text-base font-medium text-gray-200">
              {`${firstName}  ${lastName}`}
            </span>{" "}
            <span className="text-base text-gray-500">@{username}</span>
            <TimeAgo timestamp={postedOn} />
          </div>
          <p className="font-light text-gray-300 mb-4 whitespace-pre-wrap">
            {content}
          </p>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-between max-w-sm"
          >
            <button
              onClick={handleLikeClicked}
              className={`flex items-center rounded ${checkIfPostLiked()}`}
            >
              <Icon icon="thumb_up" size="18" color={checkIfPostLiked()} />{" "}
              <span className="ml-1">{count}</span>
            </button>
            <div className="flex justify-between">
              <Icon icon="question_answer" size="18" color="text-gray-500" />
              <span className="ml-1 text-gray-500">{comments.length}</span>
            </div>
            <Icon icon="share" size="18" color="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
