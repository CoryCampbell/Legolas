import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddFunds from "../AddFunds/index.js";

function ProfileButton({ user, isLoaded }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const history = useHistory();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		closeMenu();
		history.push("/");
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<button className="account-button" onClick={openMenu}>
				Account
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{isLoaded && user && (
					<div className="user-options">
						<div className="profile-options">
							<NavLink to={`/transactions/${user.id}`} className="nav-to-profile">
								Profile
							</NavLink>
							<button className="logout-button" onClick={handleLogout}>
								Log Out
							</button>
						</div>
						<div className="add-funds-container">
							<AddFunds />
						</div>
					</div>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
