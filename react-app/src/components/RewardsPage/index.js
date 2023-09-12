import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getProjectRewardsThunk } from "../../store/reward";

const RewardsPage = () => {
  const { projectId } = useParams()
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getProjectRewardsThunk(projectId))
  }, [dispatch, projectId])

  const rewards = useSelector(state => Object.values(state.rewards.rewards))

  const handleSubmit = async (e) => {
    e.preventDefault()
    let reward = {
      project_id: projectId,
      title,
      description,
      price
    }
  }

  const addReward = () => {
    return (
      <div className="rewards-form-container">
        <div>
          <label className="reward-form-labels">
            <div>
              Reward Title
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
            </input>
          </label>
          <label className="reward-form-labels">
            <div>
              Reward Description
            </div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </input>
          </label>
          <label className="reward-form-labels">
            <div>
              Reward Price
            </div>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
            </input>
          </label>
        </div>
        <button onClick={handleSubmit}>Submit Reward</button>
      </div>
    )
  }

  if (rewards.length < 1) {
    return (
      <>
        <h1>No rewards Yet</h1>
        <h2>Add a Reward for potential backers!</h2>
        {addReward()}
      </>
    )
  }




  // console.log(projectId)
  return (
    <>
      {rewards && rewards.length > 0 && rewards.map(reward => (
        <div className="main-rewards-container" key={reward.id}>
          <div>
            Reward Title: {reward.title}
          </div>
          <div>
            Reward Description: {reward.description}
          </div>
          <div>
            Price: {reward.price}
          </div>
          <button>
            Edit
          </button>
          <button>
            Delete
          </button>
        </div>
      ))}
      {addReward()}
    </>
  )
}

export default RewardsPage;
