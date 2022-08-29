import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from '../HOC/Auth';
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
          <Auth>
            <Receptions />
          </Auth>
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