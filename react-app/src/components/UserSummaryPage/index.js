import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUserThunk, loadUserBackingsThunk, loadUserProjectsThunk } from "../../store/user";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserBacked from "./UsersBacked";
import UserCreated from "./UsersCreated";
import { loadProjectsThunk } from "../../store/project";
import UsersCreated from "./UsersCreated";
import "./UserSummaryPage.css"

const UserSummary = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const projects = useSelector(state => state.users.projects);
  const backings = useSelector(state => state.users.backings);

  useEffect(async () => {
    await dispatch(loadCurrentUserThunk(sessionUser.id))
    await dispatch(loadUserProjectsThunk())
    await dispatch(loadUserBackingsThunk())
  }, [dispatch])

  const user = useSelector((state) => state.users.currentUser)
  // if (user) {
  //   console.log(user)
  // }
  if (!user) {
    return null;
  }

  const funded = (project) => {
    let sum = 0;
    if (project.backings) {
      project.backings.forEach(backing => {
        sum += backing.amountPledged;
      })
    }
    return sum;
  }

  return (
    <>
      <div id="main-user-summary-container">
        <div id="user-summary-container">
          <div className="users-created-container">
            <div className="users-created-header">
              <h2>Created Projects</h2>
              <p>{Object.keys(projects).length} project(s)</p>
            </div>
            <div className="users-created-list-container">
              <ul className="users-created-list">
                <UsersCreated
                  projects={projects}
                  funded={funded}
                />
              </ul>
            </div>
          </div>
          <div className="users-backed-container">
            <div className="users-backed-header">
              <h2>Backed Projects</h2>
              <p>{Object.keys(backings).length} project(s)</p>
            </div>
            <div className="users-backed-list-container">
              <ul className="users-backed-list">
                <UserBacked
                  backings={backings}
                />
              </ul>
            </div>
          </div>
          <div className="users-saved-container">
            <div className="users-saved-header">
              <h2>Saved Projects</h2>
              <p>{user.saves?.length} project(s)</p>
            </div>
            <div className="users-saved-list-container">
              <ul className="users-saved-list">
                {user && user.saves?.length > 0 &&
                  user.saves.map(save => (
                    <li key={save.id}>
                      <div className="the-project-info-container">
                        <NavLink to={`/projects/${save.projectId}`} className="project-info-container">
                          <img src={save.projectImage} style={{ width: "70px", height: "50px" }}></img>
                          <div>
                            {save.title}
                          </div>
                        </NavLink>
                        <div>
                          <button>Remove from Saved Projects</button>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSummary
