import { useDispatch } from "react-redux";
import { createBackingThunk } from "../../store/project";

const RewardShowDetails = ({ user, reward, project }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPledge = {
      user_id: user.id,
      project_id: project.id,
      reward_id: reward.id,
      amount_pledged: reward.price
    }

    await dispatch(createBackingThunk(newPledge))
  }

  return (
    <div id={reward.id} className="single-reward-container">
      <div className="single-reward-title">
        <h3 className="reward-title">
          {reward.title}
        </h3>
        <span>
          ${reward.price}
        </span>
      </div>
      <div>
        {reward.description}
      </div>
      <button onClick={handleSubmit} disabled={!user || user.id == project.creatorId} className="pledge-button">Pledge</button>
    </div>
  )
}

export default RewardShowDetails;
