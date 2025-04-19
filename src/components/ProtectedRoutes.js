// components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Use Redux to access the user's authentication state

const ProtectedRoute = ({ element, ...rest }) => {
  // Get the user's authentication status from Redux store
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
