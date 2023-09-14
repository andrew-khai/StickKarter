import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createRewardThunk, getProjectRewardsThunk, updateRewardThunk } from "../../store/reward";
import OpenModalButton from "../OpenModalButton";
import DeleteRewardModal from "../DeleteRewardModal";
import EditRewardModal from "../EditRewardModal";
import { getSingleProject } from "../../store/project";
import { Redirect } from "react-router-dom";
import "./RewardsPage.css"

const RewardsPage = () => {
  const { projectId } = useParams()
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(5);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const rewards = useSelector(state => Object.values(state.rewards?.rewards))
  // console.log('id', sessionUser.id)
  // console.log(rewards[0]?.creatorId)
  const projects = useSelector(state => state.users.projects)
  const project = projects[projectId];
  // console.log(project)

  useEffect(() => {
    dispatch(getProjectRewardsThunk(projectId))
    // dispatch(getSingleProject(projectId))
  }, [dispatch, projectId])

  const handleUpdate = async (updatedRewardData, updatedRewardId) => {
    console.log('making it into this call', updatedRewardData)
    await dispatch(updateRewardThunk(updatedRewardData, updatedRewardId));
    // if (updatedReward.errors) {
    //   setErrors(updatedReward.errors)
    // }
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
      setErrors(newReward.errors)
    }

    setTitle("");
    setDescription("");
    setPrice(5);

    await dispatch(getProjectRewardsThunk(projectId))

  }

  const addReward = () => {
    return (
      <div className="rewards-form-container">
        <h2>Add Reward</h2>
        <div className="rewards-form">
          {/* <ul className="errors-list">
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>{error}</li>
          ))}
          </ul> */}
          <label className="reward-form-labels">
            <div>
              Reward Title
            </div>
            <input
              className="reward-form-inputs"
              type="text"
              maxLength={60}
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
              className="reward-form-inputs"
              rows="5"
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
              className="reward-form-inputs"
              type="number"
              value={price}
              min={5}
              onChange={(e) => setPrice(e.target.value)}
            >
            </input>
          </label>
        </div>
        <button className="submit-reward-button" onClick={handleSubmit} disabled={title?.length < 0 && description?.length < 0 && price < 5}>Submit Reward</button>
      </div>
    )
  }

  if (sessionUser.id !== project?.creatorId) {
    return <Redirect to="/" />
  }

  if (rewards.length < 1) {
    return (
      <div className="main-rewards-container">
        <h1>{project?.title}: Rewards</h1>
        <h2>No rewards Yet</h2>
        <h3>Add a Reward for potential backers!</h3>
        {addReward()}
      </div>
    )
  }




  // console.log(projectId)
  return (
    <div className="main-rewards-container">
      <h1>{project?.title}: Rewards</h1>
      <div className="rewards-container-div">
        {rewards && rewards.length > 0 && rewards.map(reward => (
          <div className="mini-rewards-container" key={reward.id}>
            <div className="rewards-information">
              Reward Title: {reward.title}
            </div>
            <div className="rewards-information">
              Reward Description: {reward.description}
            </div>
            <div className="rewards-information">
              Price: {reward.price}
            </div>
            <div className="rewards-buttons-container">
              <OpenModalButton
                buttonText={"Edit Reward"}
                modalComponent={<EditRewardModal reward={reward} onUpdate={handleUpdate} />}
              />
              <OpenModalButton
                buttonText={"Delete Reward"}
                modalComponent={<DeleteRewardModal reward={reward} />}
              />
            </div>
          </div>
        ))}
      </div>
      {addReward()}
    </div>
  )
}

export default RewardsPage;
