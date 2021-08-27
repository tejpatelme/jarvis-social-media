import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../postsSlice";

export default function CreatePost() {
  const [textAreaHeight, setTextAreaHeight] = useState("");
  const { addPostStatus } = useSelector((state) => state.posts);
  const [post, setPost] = useState({ postContent: "", postMedia: null });
  const dispatch = useDispatch();
  const textAreaRef = useRef();

  const removeMedia = (e) => setPost({ ...post, postMedia: null });

  const handleNewPost = () => {
    if (post.postContent.trim() === "") {
      return toast.error("Post content cannot be empty");
    }

    const formData = new FormData();

    formData.append("postContent", post.postContent);
    formData.append("postMedia", post.postMedia);

    dispatch(createNewPost(formData));
  };

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [post.postContent]);

  useEffect(() => {
    if (addPostStatus === "fulfilled") {
      setPost({ postContent: "", postMedia: null });
    }
  }, [addPostStatus]);

  return (
    <div className="p-3 md:p-5 rounded ring-1 ring-purple-200 ring-opacity-20">
      <p className="text-xl text-gray-200 font-light mb-3">
        What's on your mind?
      </p>
      <textarea
        placeholder="Start typing...."
        value={post.postContent}
        // onChange={(e) =>
        //   dispatch(updateNewPostContent({ newPostContent: e.target.value }))
        // }
        onChange={(e) => setPost({ ...post, postContent: e.target.value })}
        ref={textAreaRef}
        className="text-gray-300 bg-gray-800 bg-opacity-30 p-2 rounded w-full overflow-hidden resize-none"
        style={{ minHeight: "30px", height: textAreaHeight }}
      ></textarea>
      {post.postMedia && (
        <div className="bg-gray-800 p-1 mt-2 rounded bg-opacity-30 border border-gray-600 inline-flex items-center text-white text-base">
          <button className="mr-1" onClick={removeMedia}>
            <Icon icon="highlight_off" size="16" />
          </button>{" "}
          {post.postMedia.name}
        </div>
      )}
      <div className="flex justify-between pt-4">
        <label title="Add Media" htmlFor="input-media">
          <Icon icon="mms" size="24" color="text-purple-600" />
          <input
            id="input-media"
            type="file"
            accept="image/*, video/*"
            onChange={(e) => setPost({ ...post, postMedia: e.target.files[0] })}
            className="hidden"
          />
        </label>
        <button
          onClick={handleNewPost}
          className="rounded px-4 py-1 font-normal text-white bg-purple-600 disabled:cursor-not-allowed"
          disabled={addPostStatus === "loading" ? true : false}
        >
          {addPostStatus === "loading" ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
