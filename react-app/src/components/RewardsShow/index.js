const RewardsShow = ({ rewards }) => {
  console.log('reward here------------', rewards)
  // rewards.forEach(reward => console.log(reward.title))

  return (
    <>
      {
        rewards.map(reward => (
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
          </div>
        ))
      }
    </>
  )
}

export default RewardsShow;
