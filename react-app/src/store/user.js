// Types

const GET_CURRENT = "GET_CURRENT";

// Action Creators

// get current user details

export function loadCurrentUser(user) {
  return {
    type: GET_CURRENT,
    user,
  };
}


// Thunks

export const loadCurrentUserThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(loadCurrentUser(user))
  }
}

// Reducer
const initialState = {
  currentUser: {}
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CURRENT: {
      let newState = { ...state };
      newState.currentUser = action.user;
      return newState;
    }
    default:
      return state;
  }
}

export default usersReducer;
