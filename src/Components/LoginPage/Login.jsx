import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { LoginImg } from '../../assets/svg/allSvgs';
import HeaderComponent from '../Header/Header';
import { login } from '../../services/api';
import Error from '../AlertError/Error';
import './login.css';

const MainContainer = styled.main`
    display: block;
    width: 100%;
    height: 100%;
`;

const InputForm = styled.form`
  position: absolute;
  width: 34%;
  height: 70%;
  left: 52%;
  top: 20%;

  background: #FFFFFF;
  border-radius: 4px;
`;

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const setNewCredentials = (input) => {
    setCredentials({ ...credentials, ...input });
  };

  const action = async () => {
    try {
      const { email, password } = credentials;
      if (!email || !password) {
        return setError('Enter your username/password.');
      }

      const checkLogin = await login(credentials);
      if (checkLogin) {
        navigate('/');
      }
    } catch (error) {
      const { data } = error.response;
      return setError(data);
    }
  };
  return (
    <MainContainer>
      <HeaderComponent page="Login to the system" />
      {error && <Error error={error} setError={setError} />}
      <LoginImg className="login-img" />
      <InputForm>
        <div>
          <h4 className="login-header">Login in</h4>
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
        <Button
          id="login-button"
          variant="outline-primary"
          onClick={action}
        >
          Enter
        </Button>
        {' '}
        <Link to="/register" id="register-link">Registration</Link>
      </InputForm>
    </MainContainer>
  );
}

export default Login;
