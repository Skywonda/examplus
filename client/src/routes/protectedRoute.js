import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoading, isError, isSuccess, authCheck } = useAuth();
  useEffect(() => {
    authCheck()
  }, [authCheck])
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/auth" replace />;
  }

  if (isSuccess && allowedRoles && !allowedRoles.includes(user.type.toLowerCase())) {
    return <Navigate to={user.type === 'STUDENT' ? '/' : '/manage'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;