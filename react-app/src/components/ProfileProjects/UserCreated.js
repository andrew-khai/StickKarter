import { NavLink } from "react-router-dom";
import "./ProfileProjects.css"

const UserCreated = ({ created, closeMenu }) => {
  if (!created) return null
  return (
    <>
      {created.slice(0, 4).map(project => (
        <li key={project.id}>
          <NavLink onClick={closeMenu} to={`/projects/${project.id}`} className="backing-container">
            <div className="backing-image">
              <img src={project.projectImage} style={{ width: "52px", height: "30px" }}></img>
              <div className="backing-title">
                {project.title}
              </div>
            </div>
          </NavLink>
        </li>
      ))}
      <NavLink className="new-project-animation" to="/projects/new" onClick={closeMenu}>
        <div className="profile-new-link-div"><i className="fas fa-plus" /><p>New</p></div>
      </NavLink>
    </>
  )
}

export default UserCreated;
