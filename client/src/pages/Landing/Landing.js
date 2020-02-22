import React from 'react';

import './Landing.css';

import logo from '../../assets/logo.svg'
import phone from '../../assets/phone.png'

const Landing = props => {
  return (<div className='landing'>
		<header>
			<img src={logo} alt="" style={{width: 50}} />
			<a className='btn' href="/login">ВОЙТИ</a>
		</header>
		<div className='hero'>
			<div>
				<h1>
					Ждем тебя на Субботнике<br/>
				</h1>
				<h4>
					Все любят находиться в чистоте, <br/>  а кто способен создавать чистоту вокруг себя?
				</h4>
				<a className='btn' href="/login">ВОЙТИ</a>
			</div>
			<img className='phone' src={phone} alt=""/>
		</div>
  </div>);
};

export default Landing;
