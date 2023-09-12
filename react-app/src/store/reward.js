const GET_PROJECT_REWARDS = "GET_PROJECT_REWARDS";
const CREATE_REWARD = "CREATE_REWARD"

export function getProjectRewards(rewards) {
  return {
    type: GET_PROJECT_REWARDS,
    rewards
  }
}

export function createReward(reward) {
  return {
    type: CREATE_REWARD,
    reward
  }
}

export const getProjectRewardsThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/rewards`);

  if (res.ok) {
    const rewards = await res.json();
    dispatch(getProjectRewards(rewards))
    return rewards;
  }
  else {
    const errors = await res.json();
    return errors;
  }
}

export const createRewardThunk = (reward) => async (dispatch) => {
  const res = await fetch(`/api/projects/${reward.project_id}/rewards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reward)
  })

  if (res.ok) {
    let newReward = await res.json();
    dispatch(createReward(newReward))
    return newReward
  }
  else {
    const errors = await res.json();
    return errors
  }
}

const initialState = {
  rewards: {}
}

const rewardsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PROJECT_REWARDS: {
      let newState = {...state};
      newState.rewards = action.rewards.rewards;
      return newState;
    }
    case CREATE_REWARD: {
      let newState = {...state};
      newState.rewards[action.reward.id] = action.reward;
      return newState;
    }
    default:
      return state;
  }
}


export default rewardsReducer;
