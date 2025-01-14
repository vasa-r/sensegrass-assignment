/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useApp } from "../context/AppContext";

interface Props {
  children: ReactNode;
  roles: string[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const {
    token,
    logoutContext,
    user: { role },
  } = useApp();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      logoutContext();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (!roles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/farmer"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
