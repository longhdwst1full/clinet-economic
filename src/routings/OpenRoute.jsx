import React from "react";
import { getUserFromLS } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
 
  return getUserFromLS?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
}
