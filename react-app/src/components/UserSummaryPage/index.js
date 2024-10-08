import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserBackingThunk,
  loadCurrentUserThunk,
  loadUserBackingsThunk,
  loadUserProjectsThunk,
  removeSaveThunk,
} from "../../store/user";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserBacked from "./UsersBacked";
import UserCreated from "./UsersCreated";
import { clearStateThunk, loadProjectsThunk } from "../../store/project";
import UsersCreated from "./UsersCreated";
import "./UserSummaryPage.css";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

const UserSummary = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.users.projects);
  const backings = useSelector((state) => state.users.backings);

  useEffect(async () => {
    await dispatch(clearStateThunk());
    await dispatch(loadCurrentUserThunk(sessionUser.id));
    await dispatch(loadUserProjectsThunk());
    await dispatch(loadUserBackingsThunk());
  }, [dispatch]);

  const user = useSelector((state) => state.users.currentUser);
  // if (user) {
  //   console.log(user)
  // }
  if (!user) {
    return <Redirect to="/" />;
  }

  const funded = (project) => {
    let sum = 0;
    if (project.backings) {
      project.backings.forEach((backing) => {
        sum += backing.amountPledged;
      });
    }
    return sum;
  };

  let inOrderBackings = Object.values(backings).sort((a, b) => {
    let da = new Date(a.createdAt);
    let db = new Date(b.createdAt);
    return da - db;
  });

  inOrderBackings.reverse();

  return (
    <>
      <div id="main-user-summary-container">
        <div id="user-summary-container">
          <div className="users-created-container">
            <div className="users-created-header">
              <h2>Created Projects</h2>
              <p>{Object.keys(projects).length} project(s)</p>
            </div>
            <div className="section-descriptions-container">
              <div className="section-description">
                Keep track of your created projects
              </div>
            </div>
            <div>
              {/* <div className="users-created-labels">
                <div className="created-labels">My Projects</div>
                <div className="created-labels">Total Funded</div>
                <div className="created-labels">Creator Controls</div>
              </div> */}
              <div className="users-created-list-container">
                <ul className="users-created-list">
                  <UsersCreated projects={projects} funded={funded} />
                </ul>
              </div>
            </div>
          </div>
          <div className="users-backed-container">
            <div className="users-backed-header">
              <h2>Backed Projects</h2>
              <p>{Object.keys(backings).length} project(s)</p>
            </div>
            <div className="section-descriptions-container">
              <div className="section-description">
                Keep track of the projects you have backed
              </div>
            </div>
            {/* <div className="users-created-labels">
              <div className="created-labels">Projects I backed</div>
              <div className="created-labels">Reward</div>
              <div className="created-labels">Remove Pledge</div>
            </div> */}
            <div className="users-backed-list-container">
              <ul className="users-backed-list">
                {Object.values(backings).length > 0 ? (
                  inOrderBackings.map((backing) => (
                    <UserBacked backing={backing} />
                  ))
                ) : (
                  <div>No Pledges Yet</div>
                )}
                {/* <UserBacked
                  backings={backings}
                /> */}
              </ul>
            </div>
          </div>
          <div className="users-saved-container">
            <div className="users-saved-header">
              <h2>Saved Projects</h2>
              <p>{user.saves?.length} project(s)</p>
            </div>
            <div className="section-descriptions-container">
              <div className="section-description">
                Your saved for later projects
              </div>
            </div>
            {/* <div className="users-created-labels">
              <div className="created-labels">Projects I saved</div>
              <div className="created-labels">Remove From Saved</div>
            </div> */}
            <div className="users-saved-list-container">
              <ul className="users-saved-list">
                {user && user.saves?.length > 0 ? (
                  user.saves.map((save) => (
                    <li key={save.id}>
                      <div className="the-project-info-container">
                        <NavLink
                          to={`/projects/${save.projectId}`}
                          className="project-info-container"
                        >
                          <img
                            src={save.projectImage}
                            style={{ width: "70px", height: "50px" }}
                          ></img>
                          <div style={{ width: "250px" }}>{save.title}</div>
                        </NavLink>
                        <div>
                          <Button
                            variant="danger"
                            className="remove-saved-button"
                            onClick={async () => {
                              await dispatch(
                                removeSaveThunk(user, save.projectId)
                              );
                              await dispatch(loadCurrentUserThunk(user.id));
                            }}
                          >
                            Remove from Saved Projects
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div>No Saved Projects yet</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSummary;
