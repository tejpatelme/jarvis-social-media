import React, { useState } from "react";
import Logo from "../../assets/jarvis-share-logo.svg?component";
import { Link } from "react-router-dom";
import { signUpUser } from "./authSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputStyle =
    "bg-gray-800 bg-opacity-30 rounded text-white w-full px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-40 mb-7";

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ firstName, lastName, username, email, password }));
  };

  return (
    <div className="p-8 md:p-5 flex justify-center items-center h-screen">
      <div className="max-w-md flex-grow">
        <div className="mb-6">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-white mb-8">Signup</h2>

        <form onSubmit={handleSignup} className="mb-3">
          <div className="flex">
            <div className="mr-2">
              <p className="text-base mb-3 text-gray-300 w-full">First Name</p>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="John"
                className={inputStyle}
              />
            </div>

            <div>
              <p className="text-base mb-3 text-gray-300 w-full">Last Name</p>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Doe"
                className={inputStyle}
              />
            </div>
          </div>

          <div className="flex">
            <div className="mr-2">
              <p className="text-base mb-3 text-gray-300 w-full">Username</p>
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="johndoe"
                className={inputStyle}
              />
            </div>

            <div>
              <p className="text-base mb-3 text-gray-300 w-full">Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="johndoe@gmail.com"
                className={inputStyle}
              />
            </div>
          </div>

          <p className="text-base mb-3 text-gray-300 w-full">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className={inputStyle}
          />
          <button className="rounded px-4 py-3 font-bold text-white bg-purple-600 w-full">
            Signup
          </button>
        </form>

        <p className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
