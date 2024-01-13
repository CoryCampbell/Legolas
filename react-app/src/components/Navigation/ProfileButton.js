import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddFunds from "../AddFunds.js";

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
				{isLoaded && user ? (
					<>
						<NavLink to={`/transactions/${user.id}`}>Profile</NavLink>
						<li>
							<button onClick={handleLogout}>Log Out</button>
						</li>
						<div style={{ width: "100px" }}>
							<AddFunds />
						</div>
					</>
				) : (
					<>
						{/* <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              // modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
