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
			<ul>
				<li>
					<NavLink exact to="/login"><button>Log In</button></NavLink>
				</li>
				<li>
				<NavLink exact to="/signup"><button>Sign Up</button></NavLink>
				</li>
				{/* {isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)} */}
			</ul>
		</div>
		</nav>
	);
}

export default Navigation;
