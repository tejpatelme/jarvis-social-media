import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/jarvis-share-logo.svg?component";
import { logInUser } from "./authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(logInUser({ email, password }));
  };

  const inputStyle =
    "bg-gray-800 bg-opacity-30 rounded text-white w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40 mb-7";

  useEffect(() => {
    if (token) {
      navigate(state?.from || "/");
    }
  }, [token]);

  return (
    <div className="p-8 md:p-5 flex justify-center items-center h-screen">
      <div className="max-w-md flex-grow">
        <div className="flex mb-6">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-white mb-8">Login</h2>

        <form onSubmit={handleLogin} className="mb-3">
          <p className="text-base mb-3 text-gray-300 w-full">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="johndoe@gmail.com"
            className={inputStyle}
          />
          <p className="text-base mb-3 text-gray-300 w-full">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className={inputStyle}
          />
          <button
            type="submit"
            className="rounded px-4 py-3 font-bold text-white bg-purple-600 w-full"
          >
            Login
          </button>
        </form>

        <p className="text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
