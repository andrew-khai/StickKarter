import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import { useEffect } from "react";
import "./UserSummaryPage.css"

const UsersCreated = ({ projects, funded }) => {

  // console.log(projects)
  return (
    <>
      {projects && Object.values(projects).map(project => (
        <li key={project.id}>
          <div className="the-project-info-container">
            <NavLink to={`/projects/${project.id}`} className="project-info-container">
              <img src={project.projectImage} style={{ width: "70px", height: "50px" }}></img>
              <div style={{width: "250px"}}>
                {project.title}
              </div>
            </NavLink>
            <div className="total-funds">
              ${funded(project).toFixed(2)}
            </div>
            <div className="created-projects-buttons-container">
              <NavLink className="creator-edit-buttons" to={`/projects/${project.id}/edit`}>
                Edit Project
              </NavLink>
              <NavLink className="creator-edit-buttons" to={`/projects/${project.id}/rewards`}>
                Edit/Add Rewards
              </NavLink>
              <OpenModalButton
                className="project-delete-button"
                buttonText="Delete"
                modalComponent={<DeleteProjectModal project={project} />}
              />
            </div>
          </div>
        </li>
      ))}
    </>
  )
}

export default UsersCreated;
