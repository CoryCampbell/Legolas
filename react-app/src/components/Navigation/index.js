import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../static/test-logos-and-images/legolas-sample2.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	return (
		<nav>
		<div className='navlinks-container'>
			<div className='logo-container'>
				<NavLink exact to="/">
					<img className='logo' src={logo} />
				</NavLink>
			</div>
			<div className='nav-content'>
			About
			</div>
		</div>
		<div className='auth-container'>
			<div className='nav-buttons-container'>
				<div>
					<NavLink exact to="/login"><button className='nav-login-button'>Log In</button></NavLink>
				</div>
				<div>
				<NavLink exact to="/signup"><button className='nav-signup-button'>Sign Up</button></NavLink>
				</div>
				{/* {isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)} */}
			</div>
		</div>
		</nav>
	);
}

export default Navigation;
