// Types

const GET_CURRENT = "GET_CURRENT";
const REMOVE_CURRENT = "REMOVE_CURRENT";
const DELETE_USER_PROJECT = "DELETE_USER_PROJECT";
const GET_USER_BACKINGS = "GET_USER_BACKINGS";
const GET_USER_PROJECTS = "GET_USER_PROJECTS";
const ADD_USER_PROJECT = "ADD_USER_PROJECT";

// Action Creators

// get current user details

export function addUserProject(project) {
  return {
    type: ADD_USER_PROJECT,
    project
  }
}

export function loadCurrentUser(user) {
  return {
    type: GET_CURRENT,
    user,
  };
}

export function loadUserProjects(projects) {
  return {
    type: GET_USER_PROJECTS,
    projects
  }
}

export function loadUserBackings(backings) {
  return {
    type: GET_USER_BACKINGS,
    backings
  }
}

export function removeCurrentUser() {
  return {
    type: REMOVE_CURRENT
  }
}

export function deleteUserProject(projectId) {
  return {
    type: DELETE_USER_PROJECT,
    projectId
  }
}


// Thunks

// export const removeUserProjectThunk = (projectId) => async (dispatch) => {
//   const res = await fetch(`/api/project/${projectId}`, {
//     method: "DELETE"
//   })
//   dispatch(deleteUserProject(projectId))
//   dispatch(loadUserProjectsThunk())
//   return res;
// }

export const loadUserProjectsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/users/projects`)
  // console.log(res)

  if (res.ok) {
    const projects = await res.json();
    dispatch(loadUserProjects(projects.projects))
    return projects
  }
}

export const loadUserBackingsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/users/backings`)
  // console.log(res)

  if (res.ok) {
    const backings = await res.json();
    dispatch(loadUserBackings(backings.backings))
    return backings
  }
}

export const loadCurrentUserThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(loadCurrentUser(user))
  }
}

export const removeCurrentUserThunk = () => async (dispatch) => {
  dispatch(removeCurrentUser())
}

// Reducer
const initialState = {
  currentUser: {},
  projects: {},
  backings: {}
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CURRENT: {
      let newState = { ...state };
      newState.currentUser = action.user;
      return newState;
    }
    case REMOVE_CURRENT: {
      let newState = {...state}
      newState.currentUser = {}
      newState.backings = {}
      newState.projects = {}
      return newState;
    }
    case ADD_USER_PROJECT: {
      let newState = {...state};
      newState.projects[action.project.id] = action.project;
      console.log('action', action)
      console.log('newstate', newState)
      return newState;
    }
    case GET_USER_PROJECTS: {
      let newState = {...state};
      newState.projects = action.projects
      return newState;
    }
    case GET_USER_BACKINGS: {
      let newState = {...state};
      newState.backings = action.backings
      return newState;
    }
    case DELETE_USER_PROJECT: {
      let newState = {...state};
      delete newState.currentUser.projects[action.projectId]
      return newState;
    }
    default:
      return state;
  }
}

export default usersReducer;
