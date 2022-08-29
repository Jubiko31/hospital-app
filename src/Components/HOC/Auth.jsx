/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Navigate } from 'react-router-dom';

export function Auth({ children }) {
  const token = localStorage.getItem('token');
  return !token ? <Navigate to="/login" /> : children;
}
