import React, { type ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to access this page.");
    }
  }, [token]);

  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/log" replace />;
  }

  // Token exists, render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
