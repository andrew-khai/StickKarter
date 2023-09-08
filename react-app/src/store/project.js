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

export function singleProject(project) {
  return {
    type: GET_PROJECT,
    project
  }
}

// thunk action creator
export const loadProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects")

  if (res.ok) {
    const projects = await res.json();
    dispatch(loadProjects(projects))
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
    default:
      return state;
  }
}

export default projectsReducer;
