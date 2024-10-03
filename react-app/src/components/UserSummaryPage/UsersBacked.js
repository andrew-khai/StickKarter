import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserBackingThunk } from "../../store/user";
import Button from "react-bootstrap/Button";

const UserBacked = ({ backing }) => {
  // if (!backings) return null;
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteUserBackingThunk(backing.id));
  };

  return (
    <li key={backing?.id}>
      <div className="the-project-info-container">
        <NavLink
          to={`/projects/${backing?.project.id}`}
          className="project-info-container"
        >
          <img
            src={backing?.project.projectImage}
            style={{ width: "70px", height: "50px" }}
          ></img>
          <div style={{ width: "250px" }}>
            {backing?.project.title}
            <br></br>
            <span style={{ color: "green" }}>
              ${backing?.amountPledged} pledged
            </span>
          </div>
        </NavLink>
        <div>
          {backing.reward ? (
            <span className="backing-rewards">
              <span style={{ color: "#05ce78" }}>Reward:</span>{" "}
              {backing.reward.title}
            </span>
          ) : (
            <span className="backing-rewards">No Reward</span>
          )}
        </div>
        <div>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="remove-buttons"
          >
            Remove Pledge
          </Button>
        </div>
      </div>
    </li>
  );
};

export default UserBacked;
