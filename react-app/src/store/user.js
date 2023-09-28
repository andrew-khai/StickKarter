// Types

import { loadProjectsThunk } from "./project";

const GET_CURRENT = "GET_CURRENT";
const REMOVE_CURRENT = "REMOVE_CURRENT";
const DELETE_USER_PROJECT = "DELETE_USER_PROJECT";
const GET_USER_BACKINGS = "GET_USER_BACKINGS";
const GET_USER_PROJECTS = "GET_USER_PROJECTS";
const CREATE_USER_BACKING = "CREATE_USER_BACKING";
const DELETE_USER_BACKING = "DELETE_USER_BACKING";
const ADD_USER_PROJECT = "ADD_USER_PROJECT";
const UPDATE_USER_PROJECT = "UPDATE_USER_PROJECT";
const ADD_SAVE = "ADD_SAVE"
const REMOVE_SAVE = "REMOVE_SAVE"

// Action Creators

// get current user details

export function addUserProject(project) {
  return {
    type: ADD_USER_PROJECT,
    project
  }
}

export function updateUserProject(project, projectId) {
  return {
    type: UPDATE_USER_PROJECT,
    project,
    projectId
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

export function createUserBacking(backing) {
  return {
    type: CREATE_USER_BACKING,
    backing
  }
}

export function deleteUserBacking(backingId) {
  return {
    type: DELETE_USER_BACKING,
    backingId
  }
}

export function addSave() {
  return {
    type: ADD_SAVE,
  };
}

export function removeSave() {
  return {
    type: REMOVE_SAVE,
  };
}

// Thunks

export const removeUserProjectThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE"
  })
  dispatch(deleteUserProject(projectId))
  dispatch(loadUserProjectsThunk())
  return res;
}

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

export const deleteUserBackingThunk = (backingId) => async (dispatch) => {
  const res = await fetch(`/api/backings/${backingId}`, {
    method: "DELETE"
  })
  await dispatch(deleteUserBacking(backingId));
  await dispatch(loadUserBackingsThunk())
}

export const addSaveThunk = (user, projectId) => async (dispatch) => {
  const res = await fetch(`/api/users/${user.id}/likes/${projectId}`, {
    method: "POST",
    body: JSON.stringify(user, projectId)
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(loadCurrentUser(user));
    // dispatch(loadProjectsThunk());
  }
}

export const removeSaveThunk = (user, projectId) => async (dispatch) => {
  console.log(user, projectId)
  const res = await fetch(`/api/users/${user.id}/likes/${projectId}`, {
    method: "DELETE",
    body: JSON.stringify(user, projectId)
  })
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    await dispatch(loadCurrentUser(user))
    // await dispatch(loadProjectsThunk());
  }
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
      // console.log('action', action)
      // console.log('newstate', newState)
      return newState;
    }
    case UPDATE_USER_PROJECT: {
      let newState = { ...state };
      newState.projects[action.projectId] = action.project;
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
    case CREATE_USER_BACKING: {
      let newState = { ...state };
      newState.backings[action.backing.id] = action.backing;
      return newState;
    }
    case DELETE_USER_BACKING: {
      let newState = { ...state };
      delete newState.backings[action.backingId];
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
