// import { useState } from "react";
// import { useDispatch} from "react-redux"

import RewardShowDetails from "./RewardShowDetails";

const RewardsShow = ({ user, rewards, project }) => {
  // console.log('reward here------------', user.id, projectId, rewards)
  // rewards.forEach(reward => console.log(reward.title))
  // const dispatch = useDispatch();


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newPledge = {
  //     user_id: user.id,
  //     project_id: project.id,
  //     reward: reward.title
  //   }
  // }

  return (
    <>
      {
        rewards.map(reward => (
          <RewardShowDetails
            reward={reward}
            user={user}
            project={project}
          />
          // <div id={reward.id} className="single-reward-container">
          //   <div className="single-reward-title">
          //     <h3 className="reward-title">
          //     {reward.title}
          //     </h3>
          //     <span>
          //       ${reward.price}
          //     </span>
          //   </div>
          //   <div>
          //     {reward.description}
          //   </div>
          //   <button disabled={!user || user.id == project.creatorId} className="pledge-button">Pledge</button>
          // </div>
        ))
      }
    </>
  )
}

export default RewardsShow;
