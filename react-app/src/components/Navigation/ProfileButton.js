import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loadCurrentUserThunk, loadUserBackingsThunk, loadUserProjectsThunk, removeCurrentUserThunk } from "../../store/user";
import UserBackedProjects from "../ProfileProjects/UserBackedProjects";
import UserCreated from "../ProfileProjects/UserCreated";
import { loadProjectsThunk } from "../../store/project";

function ProfileButton({ user }) {
  // console.log(user)
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(4);
  const ulRef = useRef();

  const projects = useSelector(state => state.users.projects);
  const backings = useSelector(state => state.users.backings);


  let inOrderProjects = Object.values(projects).sort((a, b) => {
    let da = new Date(a.createdAt);
    let db = new Date(b.createdAt);
    return da - db;
  })

  inOrderProjects.reverse();

  let inOrderBackings = Object.values(backings).sort((a, b) => {
    let da = new Date(a.createdAt);
    let db = new Date(b.createdAt);
    return da - db;
  })

  inOrderBackings.reverse();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(async () => {
    if (user) {
      await dispatch(loadCurrentUserThunk(user.id))
      await dispatch(loadUserProjectsThunk())
      await dispatch(loadUserBackingsThunk())
    }
  }, [dispatch, user, loadUserProjectsThunk])

  // console.log('projects-------', projects)

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
  }, [dispatch, searchQuery])

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery('');
  }

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value)
  }

  const performSearch = () => {
    return;
  }

  // const currentUser = useSelector((state) => state.users.currentUser)
  // console.log('currentuser here -------', currentUser)

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeCurrentUserThunk())
    dispatch(logout());
    closeMenu()
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div id="rightside-nav">
      <div id='navigation-search'>
        <button
          id="search-button"
          // onClick={openSearchModal}
        >
          Search
          <span><i class="fa-solid fa-magnifying-glass"></i></span>
        </button>
      </div>
      {isSearchModalOpen && (
        <div id="search-modal" className="modal-overlay">
          <div className="modal-content search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search for projects..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <span className="close-button" onClick={closeSearchModal}>
              &times;
            </span>

            {/* <button className="search-button" onClick={performSearch}><i class="fa-solid fa-magnifying-glass"></i></button> */}
            {/* Display search results here */}
          </div>
        </div>
      )}
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
              <div className="profile-container-headers">Your Account</div>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li className="project-summary-link"><NavLink onClick={closeMenu} to="/user/summary">View/Edit Projects</NavLink></li>
              <li>
                <button id="logout-button" onClick={handleLogout}>Log Out</button>
              </li>
            </div>
            <div className="profile-backed-projects-container">
              <div className="profile-container-headers">Backed Projects</div>
              <ul className="backing-projects-list">
                <UserBackedProjects
                  backed={inOrderBackings?.slice(0, 4)}
                  closeMenu={closeMenu}
                />
                {/* <li className="project-summary-link"><NavLink onClick={closeMenu} to="/user/summary">View Backed Projects</NavLink></li> */}
              </ul>
            </div>
            <div className="profile-backed-projects-container no-border-right">
              <div className="profile-container-headers">Created Projects</div>
              <ul className="backing-projects-list">
                <UserCreated
                  created={inOrderProjects?.slice(0, 4)}
                  closeMenu={closeMenu}
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
