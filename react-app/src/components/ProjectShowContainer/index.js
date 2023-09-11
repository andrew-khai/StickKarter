import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProjectsThunk } from "../../store/project"
import ProjectFeaturedItem from "../ProjectFeatured"
import RecommendedProjects from "../RecommendedProjects"
import "./ProjectShowContainer.css"

const ProjectShowContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProjectsThunk());
  }, [dispatch])

  const projects = useSelector(state => Object.keys(state.projects.projects).map(project => {
    return state.projects.projects[project]
  }))

  if (!(projects.length > 0)) {
    return null
  }

  const recommendedProjects = projects.slice(1, 4)

  // console.log('projects here -----', projects[0])
  // console.log('projects array------', projectsArr)
  // console.log('rec projects--- ', recommendedProjects)


  return (
    <div className="projects-show-container">
      <ProjectFeaturedItem project={projects[0]}/>
      <RecommendedProjects projects={recommendedProjects}/>
    </div>
  )
}


export default ProjectShowContainer;
