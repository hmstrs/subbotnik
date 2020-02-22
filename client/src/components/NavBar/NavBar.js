import React from 'react';
import Button from 'react-bootstrap/Button';

import {
	FaUser,
  FaPlus,
  FaPlusCircle
} from 'react-icons/fa';

import { FiBarChart2, FiStar, FiMap } from 'react-icons/fi';
import './NavBar.css';
import NavLink from '../NavLink/NavLink';

const NavBar = ({ gameStarted, gameClickHandler }) => {
  return (
    <div className={`NavBar ${gameStarted ? 'moved' : ''}`}>
      <NavLink to="/" exact>
        <FiMap />
      </NavLink>
      <NavLink to="/favourites">
        <FiStar />
      </NavLink>
      <Button
        variant="link"
        onClick={gameClickHandler}
        className={`primary ${gameStarted && 'active'}`}
      >
        {!gameStarted ? <FaPlusCircle fontSize='35px' /> : <FaPlus /> }
      </Button>
      <NavLink to="/explore">
        <FiBarChart2 />
      </NavLink>
      <NavLink to="/profile">
        <FaUser />
      </NavLink>
    </div>
  );
};

export default NavBar;
