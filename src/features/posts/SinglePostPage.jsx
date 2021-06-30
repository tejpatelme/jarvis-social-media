import React, { useState } from "react";
import { Icon, GenericAvatar } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FormatISOString,
  CreateComment,
  CommentsContainer,
  DeletePostModal,
} from "./components/";
import { updateLikes } from "./postsSlice";

export default function SinglePostPage() {
  const [showModal, setShowModal] = useState(false);
  const { postId } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);
  const post = posts?.find((post) => post._id === postId);
  const dispatch = useDispatch();

  const handleLikeClicked = () => {
    dispatch(updateLikes(post?._id));
  };

  const checkIfPostLiked = () => {
    const match = post?.likes?.likedBy.find(
      (user) => user === currentUser?._id
    );

    return match ? "text-purple-500" : "text-gray-500";
  };

  const postAuthoredByLoggedInUser = () => currentUser._id === post.userId._id;

  return (
    <>
      {post && currentUser && (
        <div className="max-w-2xl p-4 md:p-5 flex-grow">
          {showModal && (
            <DeletePostModal
              showModal={showModal}
              setShowModal={setShowModal}
              postId={postId}
            />
          )}
          <div className="flex mb-4 justify-between">
            <div className="flex">
              <GenericAvatar
                firstName={post?.userId?.firstName}
                lastName={post?.userId?.lastName}
                userId={post?.userId?._id}
              />
              <div>
                <span className="block text-base font-medium text-gray-300">
                  {`${post?.userId?.firstName}  ${post?.userId?.lastName}`}
                </span>
                <span className="block text-base text-gray-500">{`@${post?.userId?.username}`}</span>
              </div>
            </div>
            {postAuthoredByLoggedInUser() && (
              <button onClick={() => setShowModal(true)} className="self-start">
                <Icon
                  icon="delete"
                  size="24"
                  extraStyles="hover:text-red-500"
                />
              </button>
            )}
          </div>

          <div>
            <p className="mb-3 text-gray-300 whitespace-pre-wrap break-all">
              {post?.content}
            </p>
            <FormatISOString timestamp={post?.postedOn} />
            <div className="flex justify-between p-3 border-b border-t border-gray-800">
              <button
                onClick={handleLikeClicked}
                className={`flex items-center rounded ${checkIfPostLiked()}`}
              >
                <Icon icon="thumb_up" size="18" color={checkIfPostLiked()} />{" "}
                <span className=" ml-1">{post?.likes?.count}</span>
              </button>
              <Icon icon="question_answer" size="18" color="text-gray-500" />
              <Icon icon="share" size="18" color="text-gray-500" />
            </div>
          </div>

          <CreateComment postId={postId} />
          <CommentsContainer comments={post?.comments} />
        </div>
      )}
    </>
  );
}
