import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    console.log("No user found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("Access granted");
  return children;
};

export default ProtectedRoute;
