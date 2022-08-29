import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginImg } from '../../assets/svg/allSvgs';
import Error from '../AlertError/Error';
import Success from '../AlertError/Success';
import './register.css';
import HeaderComponent from '../Header/Header';
import { validateEmail, validatePassword, validName } from '../../validators';

const MainContainer = styled.main`
    display: block;
    width: 100%;
    height: 100%;
`;
const InputForm = styled.form`
  position: absolute;
  width: 34%;
  height: 75%;
  left: 52%;
  top: 18%;

  background: #FFFFFF;
  border-radius: 4px;
`;

const Register = () => {
  const API = 'http://localhost:4001/';
  const register = async (data) => {
    const res = await axios.post(`${API}registration`, data);
    return res.data;
  };
  const [credentials, setCredentials] = useState({
    fullName: '', email: '', password: '', checkPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const setNewCredentials = (input) => {
    setCredentials({ ...credentials, ...input });
  };

  const action = async () => {
    try {
      const errors = [];
      const {
        fullName, email, password, checkPassword,
      } = credentials;
      if (!fullName || !email || !password || !checkPassword) {
        return setError('All field are required.');
      }
      if (password !== checkPassword) errors.push('Passwords do not match');
      if (!validName(fullName)) errors.push('Invalid name format');
      if (!validateEmail(email)) errors.push('Please enter valid email address');
      if (!validatePassword(password)) errors.push('Password should containt: At least 3 letters, 2 uppercase letters, 2 numbers, 1 special character.');

      if (errors.length) {
        return setError(errors);
      }

      const checkRegistration = await register(credentials);
      if (checkRegistration) {
        setSuccess('Go to Login page to log into the system.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MainContainer>
      <HeaderComponent page="Register to the system" />
      {error && <Error error={error} setError={setError} />}
      {success && <Success success={success} setSuccess={setSuccess} />}
      <LoginImg className="login-img" />

      <InputForm>
        <div>
          <h4 className="login-header">Register</h4>
          <div>
            <label id="username-label">Username:</label>
            <input
              type="text"
              name="username"
              id="name-input-reg"
              placeholder="Enter userame"
              onInput={({ target }) => setNewCredentials({ fullName: target.value })}
            />
          </div>

          <label id="email-label">Login:</label>
          <input
            type="email"
            name="login"
            id="email-input"
            placeholder="Enter your email"
            onInput={({ target }) => setNewCredentials({ email: target.value })}
          />
        </div>
        <div>
          <label id="pass-label">Password:</label>
          <input
            type="password"
            name="password"
            id="password-input"
            placeholder="Enter your password"
            onInput={({ target }) => setNewCredentials({ password: target.value })}
          />
        </div>
        <div>
          <label id="repeat-label">Repeat Password:</label>
          <input
            type="password"
            name="password"
            id="repeat-input"
            placeholder="Repeat your password"
            onInput={({ target }) => setNewCredentials({ checkPassword: target.value })}
          />
        </div>
        <Button id="register-button" variant="outline-primary" onClick={action}>Register</Button>
        {' '}
        <Link to="/login" id="login-link">Login</Link>
      </InputForm>
    </MainContainer>
  );
}

export default Register;
