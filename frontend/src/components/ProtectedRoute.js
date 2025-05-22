import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading user...</div>; // Or a spinner
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
