import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loadCurrentUserThunk } from "../../store/user";
import UserBackedProjects from "../ProfileProjects/UserBackedProjects";
import UserCreated from "../ProfileProjects/UserCreated";

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (sessionUser) {
      dispatch(loadCurrentUserThunk(sessionUser.id))
    }
  }, [dispatch])

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

  const currentUser = useSelector((state) => state.users.currentUser)
  console.log('currentuser here -------', currentUser)

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
    history.push("/")
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
          <div className="main-profile-container">
            <div className="profile-container">
              <span>Your Account</span>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </div>
            <div className="profile-backed-projects-container">
              <span>Backed Projects</span>
              <ul className="backing-projects-list">
                <UserBackedProjects
                backed={currentUser.backings?.slice(0,4)}
                />
              </ul>
            </div>
            <div className="profile-backed-projects-container">
              <span>Created Projects</span>
              <ul className="backing-projects-list">
                <UserCreated
                created={currentUser.projects?.slice(0,4)}
                />
              </ul>
            </div>
          </div>
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
