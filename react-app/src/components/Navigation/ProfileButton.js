import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import {
  loadCurrentUserThunk,
  loadUserBackingsThunk,
  loadUserProjectsThunk,
  removeCurrentUserThunk,
} from "../../store/user";
import UserBackedProjects from "../ProfileProjects/UserBackedProjects";
import UserCreated from "../ProfileProjects/UserCreated";
import { loadProjectsThunk } from "../../store/project";
import useWindowWidth from "../../hooks/windowWidth";
import { GiHamburgerMenu } from "react-icons/gi";
import Accordion from "react-bootstrap/Accordion";
import "./Navigation.css";
import MobileMenu from "./offCanvas";
import { Button } from "react-bootstrap";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const ulRef = useRef();
  const width = useWindowWidth();

  const projects = useSelector((state) => state.users.projects);
  const backings = useSelector((state) => state.users.backings);

  const inOrderProjects = Object.values(projects)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const inOrderBackings = Object.values(backings)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  useEffect(() => {
    if (user) {
      dispatch(loadCurrentUserThunk(user.id));
      dispatch(loadUserProjectsThunk());
      dispatch(loadUserBackingsThunk());
    }
  }, [dispatch, user]);

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

  useEffect(() => {
    dispatch(loadProjectsThunk(searchQuery));
  }, [dispatch, searchQuery]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeCurrentUserThunk());
    dispatch(logout());
    setShowMenu(false);
    history.push("/");
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const ulClassName = `profile-dropdown${showMenu ? "" : " hidden"}`;

  {
    /* {isSearchModalOpen && (
    <div id="search-modal" className="modal-overlay">
      <div className="modal-content search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="close-button" onClick={() => setIsSearchModalOpen(false)}>
          &times;
        </span>
      </div>
    </div>
  )} */
  }
  return (
    <div id="rightside-nav">
      {width > 640 ? (
        <>
          <div id="navigation-search">
            <button id="search-button">
              Search
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </button>
          </div>
          {!user ? (
            <NavLink id="login-link-button" to="/login">
              Log In
            </NavLink>
          ) : (
            <button id="user-dropdown-button" onClick={() => setShowMenu(true)}>
              {user.username}
            </button>
          )}
          <ul id="user-dropdown-container" className={ulClassName} ref={ulRef}>
            {user && (
              <div className="main-profile-container">
                <div className="profile-container">
                  <div className="profile-container-headers">Your Account</div>
                  <li>{user.username}</li>
                  <li>{user.email}</li>
                  <li className="project-summary-link">
                    <NavLink
                      onClick={() => setShowMenu(false)}
                      to="/user/summary"
                      style={{marginBottom: "10px"}}
                    >
                      View/Edit Projects
                    </NavLink>
                  </li>
                  <li>
                    <Button variant="danger" size="sm" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </li>
                </div>
                <div className="profile-backed-projects-container">
                  <div className="profile-container-headers">
                    Backed Projects
                  </div>
                  <UserBackedProjects
                    backed={inOrderBackings}
                    closeMenu={() => setShowMenu(false)}
                  />
                </div>
                <div className="profile-backed-projects-container no-border-right">
                  <div className="profile-container-headers">
                    Created Projects
                  </div>
                  <UserCreated
                    created={inOrderProjects}
                    closeMenu={() => setShowMenu(false)}
                  />
                </div>
              </div>
            )}
          </ul>
        </>
      ) : (
        // Pass necessary props to MobileMenu for mobile view
        <MobileMenu
          user={user}
          inOrderBackings={inOrderBackings}
          inOrderProjects={inOrderProjects}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default ProfileButton;
