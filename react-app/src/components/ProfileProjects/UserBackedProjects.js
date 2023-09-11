import { NavLink } from "react-router-dom"
import "./ProfileProjects.css"

const UserBackedProjects = ({ backed }) => {
  console.log('backed projects here', backed)
  if (!backed) {
    return null
  }
  return (
    <>
      {backed.map(backing => (
        <li key={backing.id}>
          <NavLink to={`/projects/${backing.project.id}`} className="backing-container">
            <div className="backing-image">
            <img src={backing.project.projectImage} style={{width: "52px", height: "30px"}}></img>
            </div>
            <div className="backing-title">
              {backing.project.title}
            </div>
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default UserBackedProjects;
