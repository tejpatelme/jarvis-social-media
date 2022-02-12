import React from "react";
import { Link } from "react-router-dom";

export default function EditProfileButton() {
  return (
    <Link to="/editprofile">
      <button className="btn-normal">Edit Profile</button>
    </Link>
  );
}
