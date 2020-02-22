import React from 'react';
import Button from 'react-bootstrap/Button';

import { FiUser, FiPlus, FiBarChart2, FiStar, FiMap } from 'react-icons/fi';
import './NavBar.css';
import NavLink from '../NavLink/NavLink';

const NavBar = ({ gameStarted, gameClickHandler }) => {
  return (
    <div className={`NavBar ${gameStarted ? 'moved' : ''}`}>
      <NavLink to="/" exact>
        <FiMap />
      </NavLink>
      <NavLink to="/events">
        <FiStar />
      </NavLink>
      <Button
        variant="link"
        onClick={gameClickHandler}
        className={`primary ${gameStarted && 'active'}`}
      >
        {!gameStarted ? <FiPlus fontSize='35px' /> : <FiPlus /> }
      </Button>
      <NavLink to="/top">
        <FiBarChart2 />
      </NavLink>
      <NavLink to="/profile">
        <FiUser />
      </NavLink>
    </div>
  );
};

export default NavBar;
