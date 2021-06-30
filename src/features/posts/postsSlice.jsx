import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../services/api-urls";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://jarvis-share-backend.curiousguy.repl.co/posts"
      );

      return response.data;
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (content, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://jarvis-share-backend.curiousguy.repl.co/posts/newpost",
        { content }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jarvis-share-backend.curiousguy.repl.co/posts/${postId}`
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateLikes = createAsyncThunk(
  "posts/updateLikes",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://jarvis-share-backend.curiousguy.repl.co/posts/likes/${postId}`,
        postId
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updatePostComments = createAsyncThunk(
  "posts/updatePostComments",
  async (details, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API.POST_COMMENT}/${details.postId}`,
        { content: details.content }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API.BASE_POST}/${postId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    deletePostStatus: "idle",
    error: null,
    posts: [],
    currentPost: null,
    newPostContent: "",
    postCommentContent: "",
  },

  reducers: {
    updateNewPostContent: (state, action) => {
      state.newPostContent = action.payload.newPostContent;
    },
    updatePostCommentContent: (state, action) => {
      state.postCommentContent = action.payload.postCommentContent;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts;
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action?.payload?.errorMessage;
      toast.error("Some error has occurred");
    },
    [createNewPost.pending]: (state) => {
      state.status = "loading";
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.newPostContent = "";
      state.posts.push(action.payload.newPost);
    },
    [getSinglePost.pending]: (state) => {
      state.status = "loading";
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.currentPost = action.payload.singlePost;
    },
    [updateLikes.fulfilled]: (state, action) => {
      const postToUpdate = state.posts.findIndex(
        (post) => post._id === action.payload.updatedPost._id
      );

      state.posts[postToUpdate] = action.payload.updatedPost;
    },
    [updatePostComments.fulfilled]: (state, action) => {
      const postToUpdate = state.posts.findIndex(
        (post) => post._id === action.payload.updatedPost._id
      );

      state.posts[postToUpdate] = action.payload.updatedPost;
      state.postCommentContent = "";
    },
    [updatePostComments.rejected]: () => {
      toast.error("Server Error!");
    },
    [deletePost.pending]: (state) => {
      toast.loading("Deleting..", { duration: 1500 });
      state.deletePostStatus = "deleting";
    },
    [deletePost.fulfilled]: (state, action) => {
      toast.success("Successfully deleted");
      const { deletedPost } = action.payload;
      const postToDeleteIndex = state.posts.findIndex(
        (post) => post._id === deletedPost._id
      );
      state.deletePostStatus = "fulfilled";
      state.posts.splice(postToDeleteIndex, 1);
    },
    [deletePost.rejected]: (state) => {
      state.deletePostStatus = "rejected";
      toast.error("Server Error");
    },
  },
});

export const { resetPosts, updateNewPostContent, updatePostCommentContent } =
  postsSlice.actions;
export default postsSlice.reducer;
