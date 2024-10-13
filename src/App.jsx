import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeCurrentUser } from "./features/auth/authSlice";
import axios from "axios";
import { loadPosts } from "./features/posts/postsSlice";
import GenericPageSkeleton from "./components/GenericPageSkeleton";

const Following = lazy(() => import("./features/users/Following"));
const Followers = lazy(() => import("./features/users/Followers"));
const Profile = lazy(() => import("./features/users/Profile"));
const Search = lazy(() => import("./features/users/Search"));
const Notifications = lazy(() => import("./features/users/Notifications"));
const EditProfile = lazy(() => import("./features/users/EditProfile"));
const SideBar = lazy(() => import("./components/SideBar"));
const BottomNavbar = lazy(() => import("./components/BottomNavbar"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Posts = lazy(() => import("./features/posts/Posts"));
const SinglePostPage = lazy(() => import("./features/posts/SinglePostPage"));
const Login = lazy(() => import("./features/auth/Login"));
const Signup = lazy(() => import("./features/auth/Signup"));

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
      <Suspense fallback={<GenericPageSkeleton />}>
        <Toaster position="bottom-center" />
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <div className="block m-auto md:flex md:items-start">
                <SideBar />
                <BottomNavbar />
                <div className="border-r border-gray-800 flex-grow md:max-w-2xl min-h-screen">
                  <Routes>
                    <PrivateRoute
                      path="/"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <Posts />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/posts/:postId"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <SinglePostPage />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/profile/:userId"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <Profile />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/profile/:userId/following"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <Following />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/profile/:userId/followers"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <Followers />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/notifications"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <Notifications />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/editprofile"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <EditProfile />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/search"
                      element={
                        <Suspense fallback={<GenericPageSkeleton />}>
                          <Search />
                        </Suspense>
                      }
                    />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
