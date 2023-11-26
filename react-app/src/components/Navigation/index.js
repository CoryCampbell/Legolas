import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../static/test-logos-and-images/Legolas-logo-dark.png";
import logoHover from "../../static/test-logos-and-images/Legolas-logo-final.png";
import SearchBar from "../SearchBar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  return (
		<nav className="navigation-container">
			<div className="navlinks-container">
				<div className="logo-container">
					<NavLink exact to="/">
						<img className="logo" src={logo} alt="logo" />
						<img className="logo-hover" src={logoHover} alt="logo" />
					</NavLink>
				</div>
			</div>
			<SearchBar />
			{!sessionUser ? (
				<div className="auth-container">
					<div className="nav-buttons-container">
						<div>
							<NavLink exact to="/login">
								<button className="nav-login-button">Log In</button>
							</NavLink>
						</div>
						<div>
							<NavLink exact to="/signup">
								<button className="nav-signup-button">Sign Up</button>
							</NavLink>
						</div>
					</div>
				</div>
			) : (
				isLoaded && (
					<li className="profile-button">
						<ProfileButton user={sessionUser} isLoaded={isLoaded} />
					</li>
				)
			)}
		</nav>
	);
}

export default Navigation;
