import { NavLink } from "react-router-dom";

const UserBacked = ({ backings }) => {
  if (!backings) return null;

  return Object.values(backings).map(backing => (
    <li key={backing.id}>
      <div className="the-project-info-container">
        <NavLink to={`/projects/${backing.project.id}`} className="project-info-container">
          <img src={backing.project.projectImage} style={{ width: "70px", height: "50px" }}></img>
          <div style={{width: "250px"}}>
            {backing.project.title}
          </div>
        </NavLink>
        <div>
          <button className="remove-buttons">Remove Pledge</button>
        </div>
      </div>
    </li>
  ))
}

export default UserBacked;
