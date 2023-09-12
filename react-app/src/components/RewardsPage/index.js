import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createRewardThunk, getProjectRewardsThunk, updateRewardThunk } from "../../store/reward";
import OpenModalButton from "../OpenModalButton";
import DeleteRewardModal from "../DeleteRewardModal";
import EditRewardModal from "../EditRewardModal";

const RewardsPage = () => {
  const { projectId } = useParams()
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5);
  const [errors, setErrors] = useState({});

  const rewards = useSelector(state => Object.values(state.rewards?.rewards))

  useEffect(() => {
    dispatch(getProjectRewardsThunk(projectId))
  }, [dispatch, projectId])

  const handleUpdate = async (updatedRewardData, updatedRewardId) => {
    console.log('making it into this call', updatedRewardData)
    await dispatch(updateRewardThunk(updatedRewardData, updatedRewardId));
    await dispatch(getProjectRewardsThunk(projectId))

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    let reward = {
      project_id: projectId,
      title,
      description,
      price
    }

    const newReward = await dispatch(createRewardThunk(reward))
    if (newReward.errors) {
      setErrors(newReward?.errors)
    }

    setTitle("");
    setDescription("");
    setPrice(5);

    await dispatch(getProjectRewardsThunk(projectId))

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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </label>
          <label className="reward-form-labels">
            <div>
              Reward Price
            </div>
            <input
              type="number"
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
          <OpenModalButton
            buttonText={"Edit Reward"}
            modalComponent={<EditRewardModal reward={reward} onUpdate={handleUpdate} />}
          />
          <OpenModalButton
            buttonText={"Delete Reward"}
            modalComponent={<DeleteRewardModal reward={reward} />}
          />
        </div>
      ))}
      {addReward()}
    </>
  )
}

export default RewardsPage;
