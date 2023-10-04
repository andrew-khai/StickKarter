import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./ProjectFeatured.css"
import { useState, useEffect } from "react";
import { addSaveThunk, removeSaveThunk } from "../../store/user";
import { loadProjectsThunk } from "../../store/project";
import HomepageLoading from "../LoadingModal/homepageloading";

const ProjectFeaturedItem = ({ project }) => {
  // console.log('project -----', project)
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector(state => state.users.currentUser);
  const [isSaved, setIsSaved] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);

    if (sessionUser && currentUser) {
      setIsSaved(currentUser.saves?.some((save) => save?.projectId === project?.id))
    }

    // setIsLoading(false);
  }, [sessionUser, currentUser, project?.id])

  const addSave = async () => {
    // console.log('in the add save block')
    await dispatch(addSaveThunk(currentUser, project.id));
    setIsSaved(true);
    await dispatch(loadProjectsThunk());
  }

  const removeSave = async () => {
    // console.log('in the remove save block')
    await dispatch(removeSaveThunk(currentUser, project.id));
    setIsSaved(false)
    await dispatch(loadProjectsThunk())
  }

  const funding = (project) => {
    let sum = 0;
    if (project?.backings) {
      project.backings.forEach(backing => {
        sum += backing.amountPledged;
      })
      return fundPercent(sum)
    }
    return "0%"
  }

  const fundPercent = (sum) => {
    let number = Math.ceil(((sum) / (project?.fundingGoal)) * 100)
    if (number > 100) {
      number = 100;
    }
    return number.toString() + '%';
  }

  // if (isLoading) {
  //   return <HomepageLoading />
  // }

  return (
    <div className="main-featured-project-container">
      {/* {isLoading && <HomepageLoading />} */}
      <h1 class="featured-project-text">FEATURED PROJECT</h1>
      <div className="featured-project-container" style={{width: "625px"}}>
        <NavLink to={`/projects/${project?.id}`} style={{width: "625px"}}>
          <img className="featured-project-image" style={{ width: "625px", height: "335.08px" }} src={project?.projectImage}></img>
        </NavLink>
        <div className="progress-bar-container progress">
        <div className="fund-progress-bar progress" style={{ width: funding(project), border: "5px solid green" }}></div>
        </div>
        <h2>
          {project?.title}
        </h2>
        <div>
          {project?.description}
        </div>
        <div>
        {sessionUser && sessionUser.id !== project?.creatorId &&
          !isSaved
          &&
            <button
            onClick={addSave}
            className="save-project-button">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          }
          {sessionUser && sessionUser.id !== project?.creatorId &&
          isSaved
          &&
            <button
            onClick={removeSave}
            style={{borderColor: "blue"}}
            className="save-project-button">
              <i style={{color: "blue"}} class="fa-regular fa-bookmark"></i>
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectFeaturedItem;
