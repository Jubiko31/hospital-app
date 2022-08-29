import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../LoginPage/Login';
import Register from '../LoginPage/Register';
import Receptions from '../Receptions/Receptions';
import './App.css';

const App = () => {
  return (
   <Router>
    <Routes>
    <Route 
        path="/"
        exact
        element={
            <Receptions />
        }
      />
      <Route 
        path="/register"
        exact
        element={
            <Register />
        }
      />
      <Route 
        path="/login"
        exact
        element={
            <Login />
        }
      />
    </Routes>
   </Router>
  );
}

export default App;