const GET_PROJECT_REWARDS = "GET_PROJECT_REWARDS";
const CREATE_REWARD = "CREATE_REWARD"
const DELETE_REWARD = "DELETE_REWARD"
const UPDATE_REWARD = "UPDATE_REWARD"

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

export function updateReward(reward) {
  return {
    type: UPDATE_REWARD,
    reward
  }
}

export function deleteReward(rewardId) {
  return {
    type: DELETE_REWARD,
    rewardId
  }
}

export const getProjectRewardsThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/rewards`);

  if (res.ok) {
    const rewards = await res.json();
    await dispatch(getProjectRewards(rewards))
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
    await dispatch(createReward(newReward))
    // await dispatch(getProjectRewards(reward.project_id))
    return newReward;
  }
  else {
    const errors = await res.json();
    return errors
  }
}

export const updateRewardThunk = (reward) => async (dispatch) => {
  // console.log('making it into update Thunk', reward, 'id', rewardId)
  const res = await fetch(`/api/rewards/${reward.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reward)
  })

  if (res.ok) {
    const updatedReward = await res.json();
    dispatch(updateReward(updatedReward))
  }
  else {
    const errors = await res.json();
    return errors
  }
}

export const deleteRewardThunk = (rewardId) => async (dispatch) => {
  const res = await fetch(`/api/rewards/${rewardId}`, {
    method: "DELETE"
  });

    dispatch(deleteReward(rewardId))
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
    case UPDATE_REWARD: {
      let newState = {...state};
      // console.log('action------', action.reward.reward)
      // console.log('newstate update reward---', newState)
      newState.rewards[action.reward.reward.id] = action.reward.reward;
      // console.log('newstate after key----', newState)
      return newState;
    }
    case DELETE_REWARD: {
      let newState = {...state}
      delete newState.rewards[action.rewardId];
      return newState;
    }
    default:
      return state;
  }
}


export default rewardsReducer;
