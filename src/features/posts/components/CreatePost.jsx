import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, updateNewPostContent } from "../postsSlice";

export default function CreatePost() {
  const [textAreaHeight, setTextAreaHeight] = useState("");
  const { newPostContent } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const textAreaRef = useRef();

  const handleNewPost = () => {
    if (newPostContent.trim() === "") {
      return toast.error("Post content cannot be empty");
    }

    dispatch(createNewPost(newPostContent));
  };

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [newPostContent]);

  return (
    <div className="p-5 rounded ring-1 ring-purple-200 ring-opacity-20">
      <p className="text-xl text-gray-200 font-light mb-3">
        What's on your mind?
      </p>
      <textarea
        placeholder="Start typing...."
        value={newPostContent}
        onChange={(e) =>
          dispatch(updateNewPostContent({ newPostContent: e.target.value }))
        }
        ref={textAreaRef}
        className="text-gray-300 bg-transparent w-full overflow-hidden resize-none"
        style={{ minHeight: "30px", height: textAreaHeight }}
      ></textarea>
      <div className="flex justify-end pt-4">
        <button
          onClick={handleNewPost}
          className="rounded px-4 py-1 font-normal text-white bg-purple-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}
