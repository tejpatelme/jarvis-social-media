import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "../features/posts/postsSlice";
import usersSliceReducer from "../features/users/usersSlice";
import authSliceReducer from "../features/auth/authSlice";

const enableDevTools = process.env.NODE_ENV === "development" ? true : false;

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    users: usersSliceReducer,
    auth: authSliceReducer,
  },
  devTools: enableDevTools,
});
