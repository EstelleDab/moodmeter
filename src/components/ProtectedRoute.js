import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, role }) => {
  const storedUser = localStorage.getItem("user"); //récuperation des données utilisateur
  
  if (!user) {
    console.log("No user found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    console.log(`Access denied for role: ${user.role}. Redirecting to /unauthorized`);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access granted");
  return children;
};

export default ProtectedRoute;
