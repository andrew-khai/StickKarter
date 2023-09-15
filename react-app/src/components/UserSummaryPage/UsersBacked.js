import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserBackingThunk } from "../../store/user";


const UserBacked = ({ backing }) => {
  // if (!backings) return null;
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteUserBackingThunk(backing.id))
  }

  return (
    <li key={backing?.id}>
      <div className="the-project-info-container">
        <NavLink to={`/projects/${backing?.project.id}`} className="project-info-container">
          <img src={backing?.project.projectImage} style={{ width: "70px", height: "50px" }}></img>
          <div style={{ width: "250px" }}>
            {backing?.project.title}
          </div>
        </NavLink>
        <div>
          <button onClick={handleDelete} className="remove-buttons">Remove Pledge</button>
        </div>
      </div>
    </li>
  )
}

export default UserBacked;
