import { NavLink } from "react-router-dom";
import "./ProfileProjects.css"

const UserCreated = ({created}) => {
  if (!created) return null
  return (
    <>
      {created.map(project => (
        <li key={project.id}>
          <NavLink to={`/projects/${project.id}`} className="backing-container">
            <div className="backing-image">
              <img src={project.projectImage} style={{width: "52px", height: "30px"}}></img>
              <div className="backing-title">
                {project.title}
              </div>
            </div>
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default UserCreated;
