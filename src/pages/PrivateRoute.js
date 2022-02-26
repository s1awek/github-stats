/** @format */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return <Routes>{isUser ? <Route path='/' element={children}></Route> : <Route path='/' element={<Navigate replace to='/login'></Navigate>}></Route>}</Routes>;
};
export default PrivateRoute;
