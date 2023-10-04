import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProjectsThunk, unloadSingleProjectThunk } from "../../store/project"
import ProjectFeaturedItem from "../ProjectFeatured"
import RecommendedProjects from "../RecommendedProjects"
import "./ProjectShowContainer.css"
import { loadCurrentUserThunk, removeCurrentUserThunk } from "../../store/user"

const ProjectShowContainer = () => {
  const dispatch = useDispatch()
  // const [isLoading, setIsLoading] = useState(true);
  // const [featuredProject, setFeaturedProject] = useState(null);
  // const [recommendedProjects, setRecommendedProjects] = useState([]);


  const sessionUser = useSelector(state => state.session.user)

  useEffect(async () => {
    // setIsLoading(true);

    await dispatch(loadProjectsThunk());
    await dispatch(unloadSingleProjectThunk())
    // dispatch(removeCurrentUserThunk())
    if (sessionUser) {
      await dispatch(loadCurrentUserThunk(sessionUser.id))
    }

    // setIsLoading(false);
  }, [dispatch, sessionUser])

  const projects = useSelector(state => Object.keys(state.projects.projects).map(project => {
    return state.projects.projects[project]
  }))
  const isLoading = projects.length === 0;

  // useEffect(() => {
  //   if (projects.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * projects.length);
  //     setFeaturedProject(projects[randomIndex]);

  //     const otherProjects = projects.filter(project => project.id != featuredProject?.id);

  //     const recommended = [];
  //     for (let i = 0; i < 9 && i < otherProjects.length; i++) {
  //       const randomIndex = Math.floor(Math.random() * otherProjects.length);
  //       recommended.push(otherProjects.splice(randomIndex, 1)[0]);
  //     }

  //     setRecommendedProjects(recommended);
  //   }
  // }, [projects])

  // console.log(projects)

  if (isLoading) {
    return (
      <div className="loader">
        <span className="loader-inner"></span>
      </div>
    );
  }

  // if (!(projects.length > 0)) {
  //   return null
  // }

  const recommendedProjects = projects.slice(1, 10)

  // const randomIndex = Math.floor(Math.random() * projects.length);
  // const randomProject = projects[randomIndex];
  // const otherProjects = projects.filter(project => project.id != randomProject.id)
  // const recommendedProjects = otherProjects.slice(1, 10)

  // console.log('projects here -----', projects[0])
  // console.log('projects array------', projectsArr)
  // console.log('rec projects--- ', recommendedProjects)


  return (
    <div className="projects-show-container">
      <ProjectFeaturedItem project={projects[0]} />
      <RecommendedProjects projects={recommendedProjects} />
    </div>
  )
}


export default ProjectShowContainer;
