import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";

export default function PrivateRoute({ path, ...props }) {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: location.pathname }} replace to="/login" />
  );
}
