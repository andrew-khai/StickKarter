import { useDispatch } from "react-redux";
import { createBackingThunk, loadSingleProjectThunk } from "../../store/project";
import { useEffect, useState } from "react";

const RewardShowDetails = ({ user, reward, project }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isBacker, setIsBacker] = useState(false);


  useEffect(() => {
    const errorsObj = {}
    if (user?.id == project?.creatorId) errorsObj.user = "Cannot back your own project"
    setErrors(errorsObj)
  }, [user])

  useEffect(() => {
    if (project) {
      project.backings?.forEach(backing => {
        if (backing?.userId === user?.id) {
          setIsBacker(true)
        }
      })
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPledge = {
      user_id: user.id,
      project_id: project.id,
      reward_id: reward.id,
      amount_pledged: reward.price
    }

    await dispatch(createBackingThunk(newPledge))
    await dispatch(loadSingleProjectThunk(project.id))
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
      {/* {errors.user &&
      <p className="errors">{errors.user}</p>
      } */}
      <button onClick={handleSubmit} disabled={!user || user.id == project.creatorId || isBacker} className="pledge-button">Pledge</button>
    </div>
  )
}

export default RewardShowDetails;
