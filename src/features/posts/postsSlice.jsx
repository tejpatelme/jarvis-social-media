import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../services/api-urls";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API.BASE_POST);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (post, thunkAPI) => {
    try {
      const response = await axios.post(API.NEW_POST, post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      const response = await axios.get(`${API.BASE_POST}/${postId}`);

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
      const response = await axios.post(`${API.POST_LIKES}/${postId}`, postId);

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

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (details, thunkAPI) => {
    const { postId, commentId } = details;
    try {
      const response = await axios.post(
        `${API.POST_COMMENT}/${postId}/delete`,
        { commentId }
      );
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
    addPostStatus: "idle",
    addCommentStatus: "idle",
    deletePostStatus: "idle",
    deleteCommentStatus: "idle",
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
      state.addPostStatus = "loading";
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.addPostStatus = "fulfilled";
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
    [updatePostComments.pending]: (state) => {
      state.addCommentStatus = "loading";
    },
    [updatePostComments.fulfilled]: (state, action) => {
      state.addCommentStatus = "fulfilled";
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
    [deleteComment.pending]: (state) => {
      state.deleteCommentStatus = "loading";
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.deleteCommentStatus = "fulfilled";
      const postToUpdate = state.posts.findIndex(
        (post) => post._id === action.payload.post._id
      );
      state.posts[postToUpdate] = action.payload.post;
    },
    [deleteComment.rejected]: (state) => {
      state.deleteCommentStatus = "rejected";
      toast.error("Server Error");
    },
  },
});

export const { resetPosts, updateNewPostContent, updatePostCommentContent } =
  postsSlice.actions;
export default postsSlice.reducer;
