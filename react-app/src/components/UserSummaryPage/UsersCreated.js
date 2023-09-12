import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";

const UsersCreated = ({ projects }) => {

  // console.log(projects)
  return (
    <>
      {projects && Object.values(projects).map(project => (
        <li key={project.id}>
          <div>
            <div>
              {project.title}
            </div>
            <img src={project.projectImage} style={{ width: "70px", height: "50px" }}></img>
          </div>
          <div>
            <NavLink to={`/projects/${project.id}/edit`}>Edit Project</NavLink>
            <button>Edit/Add Rewards</button>
            <OpenModalButton
              className="project-delete-button"
              buttonText="Delete"
              modalComponent={<DeleteProjectModal project={project} />}
            />
          </div>
        </li>
      ))}
    </>
  )
}

export default UsersCreated;
