import React from "react";
import { getTokenLs } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
  return getTokenLs?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
}
