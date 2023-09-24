import { addUserProject, createUserBacking, deleteUserProject, updateUserProject } from "./user"

// TYPES
const CREATE_PROJECT = "CREATE_PROJECT"
const GET_ALL_PROJECTS = "GET_ALL_PROJECTS"
const GET_PROJECT = "GET_PROJECT"
const UNLOAD_PROJECT = "UNLOAD_PROJECT"
const UPDATE_PROJECT = "UPDATE_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"
const CLEAR_STATE = "CLEAR_STATE"
// const CREATE_BACKING = "CREATE_BACKING"

// ACTION CREATORS

export function clearState() {
  return {
    type: CLEAR_STATE
  }
}

// get all projects
export function loadProjects(projects) {
  return {
    type: GET_ALL_PROJECTS,
    projects
  }
}

//create a project
export function createProject(project) {
  return {
    type: CREATE_PROJECT,
    project
  }
}

// get single project
export function getSingleProject(project) {
  return {
    type: GET_PROJECT,
    project
  }
}

export function unloadSingleProject() {
  return {
    type: UNLOAD_PROJECT
  };
}

// update a project
export function updateProject(project, projectId) {
  return {
    type: UPDATE_PROJECT,
    project,
    projectId
  }
}

//  delete a project
export function deleteProject(projectId) {
  return {
    type: DELETE_PROJECT,
    projectId
  }
}

// export function createBacking(backing) {
//   return {
//     type: CREATE_BACKING,
//     backing
//   }
// }

// thunk action creator
export const clearStateThunk = () => async (dispatch) => {
  dispatch(clearState())
}

// loads all projects
export const loadProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects")

  if (res.ok) {
    const projects = await res.json();
    dispatch(loadProjects(projects))
  }
}

// get single project
export const loadSingleProjectThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`)
  if (res.ok) {
    const singleProject = await res.json();
    dispatch(getSingleProject(singleProject));
    return singleProject;
  } else {
    const errors = await res.json();
    return errors;
  }
}

// export const loadUserProjectsThunk = () => (dispatch, getState) => {
//   const state = getState()
// }

export const unloadSingleProjectThunk = () => async (dispatch) => {
  dispatch(unloadSingleProject());
}

// creates a project
export const createProjectThunk = (project) => async (dispatch) => {
  // console.log('it is making it into the thunk')
  const res = await fetch("/api/projects/new", {
    method: "POST",
    // headers: { "Content-Type": "application/json"},
    body: project
  });

  if (res.ok) {
    // console.log("create project was OKAY")
    const data = await res.json();
    await dispatch(createProject(data.project));
    await dispatch(addUserProject(data.project));
    return data.project;
  } else if (res.status < 500) {
    // console.log("hit this res status < 500 else if")
    const data = await res.json();
    // console.log(data)
    if (data.errors) {
      return data;
    }
  } else {
    // console.log('create project hit the else errors')
    return ["An error occurred. Please try again."]
  }
}

// update a project
export const updateProjectThunk = (project, projectId) => async (dispatch) => {
  // console.log('project in update thunk', project)
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    body: project
  })

  if (res.ok) {
    // console.log('its in the update thunk ok ----')
    const updatedProject = await res.json();
    await dispatch(updateProject(updatedProject, updatedProject.id));
    // await dispatch(updateUserProject(updatedProject, updatedProject.id));
    return updatedProject;
  }

  else {
    const errors = await res.json();
    // console.log('we in the errors update thunk', errors)
    return errors;
  }
}

// delete a project
export const deleteProjectThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE"
  });
  dispatch(deleteProject(projectId));
  dispatch(deleteUserProject(projectId))
  return res;
}

export const createBackingThunk = (backing) => async (dispatch) => {
  const res = await fetch(`/api/projects/${backing.project_id}/backings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backing),
  })

  if (res.ok) {
    const data = await res.json();
    console.log('data in create backing thunk', data)
    await dispatch(updateProject(data, backing.project_id))
    await dispatch(createUserBacking(data))
    // await dispatch(loadProjects())
  }
}

const initialState = {
  projects: {},
  singleProject: {}
}

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE: {
      return { ...initialState }
    }
    case GET_ALL_PROJECTS: {
      const projectArray = action.projects.projects;
      let newState = { ...state };
      projectArray.forEach(project => newState.projects[project.id] = project)
      return newState;
    }
    case GET_PROJECT: {
      let newState = { ...state };
      // console.log('reducer start dte', action.project.startDate, action.project.endDate)
      newState.singleProject = action.project;
      return newState;
    }
    case UNLOAD_PROJECT: {
      let newState = { ...state };
      newState.singleProject = {};
      return newState;
    }
    case CREATE_PROJECT: {
      let newState = { ...state };
      // console.log('newState in Create project----', newState)
      newState.projects[action.project.id] = action.project;
      // console.log('newstate in create project after ----', newState)
      return newState;
    }
    case UPDATE_PROJECT: {
      let newState = { ...state };
      newState.projects[action.projectId] = action.project;
      // console.log('new state in update project reducer-----', newState)
      return newState;
    }
    case DELETE_PROJECT: {
      let newState = { ...state };
      delete newState.projects[action.projectId];
      delete newState.singleProject[action.projectId];
      return newState;
    }
    default:
      return state;
  }
}

export default projectsReducer;
