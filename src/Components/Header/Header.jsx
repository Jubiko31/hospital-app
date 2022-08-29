import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/svg/allSvgs';

const Header = styled.div`
    box-sizing: border-box;
    display:flex;
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 12%;
    left: 0px;
    top: 0px;
    background: #C5E9FF;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
`;
const NavBar = styled.div`
    position: absolute;
    width: fit-content;
    height: 20%;
    left: 20%;
    top: 30%;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;

    color: #000;
`;

const Button = styled.button`
    box-sizing: border-box;

    position: absolute;
    width: 8%;
    height: 40%;
    left: 80%;
    top: 30%;
    font-size: 20px;
    font-weight: 300;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    &:hover {
        background-color: rgba(255,255,255,0.8);
    }
`;

const HeaderComponent = ({ page }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Header>
      <Logo className="header-logo" />
      <NavBar>{page}</NavBar>
      <Button onClick={() => logout()}>
        Log out
      </Button>
    </Header>
  );
}

export default HeaderComponent;
