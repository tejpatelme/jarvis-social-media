import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/jarvis-share-logo.svg?component";
import { logInUser } from "./authSlice";
import { Spinner } from "../../components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token, loginStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(logInUser({ email, password }));
  };

  const inputStyle =
    "bg-gray-800 bg-opacity-30 rounded text-white w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40 mb-7";

  const loginAsGuest = () => {
    dispatch(
      logInUser({ email: "daffyduck@guest.com", password: "daffyduck" })
    );
  };

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
            className="rounded px-4 py-3 font-semibold text-white bg-purple-600 w-full disabled:cursor-not-allowed"
            disabled={loginStatus === "loading" ? true : false}
          >
            Login
          </button>
          <div className="my-2 h-[1px] bg-gray-600"></div>
        </form>
        <button
          className="rounded px-4 py-3 mb-3 font-semibold text-white bg-purple-600 w-full disabled:cursor-not-allowed"
          onClick={loginAsGuest}
          disabled={loginStatus === "loading" ? true : false}
        >
          {loginStatus === "loading" ? <Spinner /> : "Login As Guest"}
        </button>
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
