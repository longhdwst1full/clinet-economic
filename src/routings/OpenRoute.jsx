import React from "react";
import { getUserFromLS } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
  const user = getUserFromLS();

  return user?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
}
