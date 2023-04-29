import React from "react";
import { getUserFromLS } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {

  return getUserFromLS?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
