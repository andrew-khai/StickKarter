import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";

const UsersCreated = ({ projects, funded }) => {

  // console.log(projects)
  return (
    <>
      {projects && Object.values(projects).map(project => (
        <li key={project.id}>
          <div className="the-project-info-container">
            <NavLink to={`/projects/${project.id}`} className="project-info-container">
              <img src={project.projectImage} style={{ width: "70px", height: "50px" }}></img>
              <div>
                {project.title}
              </div>
            </NavLink>
            <div className="total-funds">
              {funded(project)}
            </div>
            <div className="created-projects-buttons-container">
              <NavLink to={`/projects/${project.id}/edit`}>Edit Project</NavLink>
              <NavLink to={`/projects/${project.id}/rewards`}>
                <button>Edit/Add Rewards</button>
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
