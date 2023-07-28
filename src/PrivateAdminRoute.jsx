// PrivateAdminRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ isLoggedIn, element }) => {
    return isLoggedIn ? element : <Navigate to="/Login" />;
};

export default PrivateAdminRoute;
