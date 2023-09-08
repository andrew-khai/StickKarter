// TYPES
const CREATE_PROJECT = "CREATE_PROJECT"
const GET_ALL_PROJECTS = "GET_ALL_PROJECTS"
const GET_PROJECT = "GET_PROJECT"
const UPDATE_PROJECT = "UPDATE_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"

// ACTION CREATORS

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
export function singleProject(project) {
  return {
    type: GET_PROJECT,
    project
  }
}

// thunk action creator
// loads all projects
export const loadProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects")

  if (res.ok) {
    const projects = await res.json();
    dispatch(loadProjects(projects))
  }
}

// creates a project
export const createProjectThunk = (project) => async (dispatch) => {
  // console.log('it is making it into the thunk', project)
  const res = await fetch("/api/projects/new", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(project)
  });

  if (res.ok) {
    // console.log("create project was OKAY")
    const data = await res.json();
    dispatch(createProject(data.project));
    return null;
  } else if (res.status < 500) {
    // console.log("hit this res status < 500 else if")
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    // console.log('create project hit the else errors')
    return ["An error occurred. Please try again."]
  }
}

const initialState = {
  projects: {}
}

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS: {
      const projectArray = action.projects.projects;
      let newState = { ...state };
      projectArray.forEach(project => newState.projects[project.id] = project)
      return newState;
    }
    case CREATE_PROJECT: {
      let newState = { ...state };
      console.log('newState in Create project----', newState)
      newState.projects[action.project.id] = action.project;
      console.log('newstate in create project after ----', newState)
      return newState;
    }
    default:
      return state;
  }
}

export default projectsReducer;
