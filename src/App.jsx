import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { SideBar, BottomNavbar, PrivateRoute } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { initializeCurrentUser } from "./features/auth/authSlice";
import {
  Following,
  Profile,
  Search,
  Followers,
  EditProfile,
  Notifications,
} from "./features/users";
import { Posts, SinglePostPage } from "./features/posts";
import { Login, Signup } from "./features/auth";
import axios from "axios";
import { loadPosts } from "./features/posts/postsSlice";

function App() {
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const setupDefaultHeaders = () => {
      if (token) {
        return (axios.defaults.headers.common["Authorization"] = token);
      }
      delete axios.defaults.headers.common["Authorization"];
    };

    setupDefaultHeaders();
  }, [token]);

  useEffect(() => {
    if (token) {
      dispatch(initializeCurrentUser());
    }
  }, [token, users]);

  useEffect(() => {
    if (token && status === "idle") {
      dispatch(loadPosts());
    }
  }, [token]);

  return (
    <div className="App max-w-6xl m-auto">
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <div className="block m-auto md:flex md:items-start">
              <SideBar />
              <BottomNavbar />
              <Routes>
                <PrivateRoute path="/" element={<Posts />} />
                <PrivateRoute
                  path="/posts/:postId"
                  element={<SinglePostPage />}
                />
                <PrivateRoute path="/profile/:userId" element={<Profile />} />
                <PrivateRoute
                  path="/profile/:userId/following"
                  element={<Following />}
                />
                <PrivateRoute
                  path="/profile/:userId/followers"
                  element={<Followers />}
                />
                <PrivateRoute
                  path="/notifications"
                  element={<Notifications />}
                />
                <PrivateRoute path="/editprofile" element={<EditProfile />} />
                <PrivateRoute path="/search" element={<Search />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
