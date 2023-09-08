import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div id="rightside-nav">
      <div id='navigation-search'>
        <button id="search-button" onClick={() => alert("Feature coming soon!")}>
          Search
          <span><i class="fa-solid fa-magnifying-glass"></i></span>
        </button>
      </div>
      {!user ? (
        <NavLink id="login-link-button" to="/login">Log In</NavLink>
      ) :
        <button id="user-dropdown-button" onClick={openMenu}>
          {user.username}
        </button>
      }
      <ul id="user-dropdown-container" className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            {/* <NavLink to="/login">Log In</NavLink> */}
            {/* <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            /> */}

            {/* <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
