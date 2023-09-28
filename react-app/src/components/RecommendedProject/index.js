import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./RecommendedProject.css"
import { addSaveThunk, removeSaveThunk } from "../../store/user";
import { loadProjectsThunk } from "../../store/project";
import { useEffect, useState } from "react";

const RecommendedProject = ({ project }) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector(state => state.users.currentUser);

  const [isSaved, setIsSaved] = useState(false);

  // console.log(currentUser)

  // console.log('recommended project', project)
  useEffect(() => {
    if (sessionUser && currentUser) {
      setIsSaved(currentUser.saves?.some((save) => save.projectId === project.id))
    }
  }, [sessionUser, currentUser, project.id])

  const funded = (project) => {
    let sum = 0;
    if (project.backings) {
      project.backings.forEach(backing => {
        sum += backing.amountPledged;
      })
    }
    return sum;
  }

  // const saveCheck = (project, user) => {
  //   let projectIds = [];
  //   let saves= user.saves;
  //   saves?.forEach(save => projectIds.push(save.projectId))
  //   if (projectIds.includes(project.id)) return true;
  //   else return false;
  // }

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

  return (
    <div className="rec-projects-container">
      <div className="rec-project-image-container">
        <NavLink to={`/projects/${project.id}`}>
          <img className="rec-project-image" src={project.projectImage}></img>
        </NavLink>
      </div>
      <div className="rec-project-details">
        <div className="rec-project-title">{project.title}</div>
        <div className="rec-project-funding">{Math.ceil((funded(project) / project.fundingGoal) * 100)}% funded</div>
        <div className="rec-project-creator">By {project.creator?.username}</div>
        <div>
          {sessionUser && sessionUser.id !== project.creatorId &&
          !isSaved
          &&
            <button
            onClick={addSave}
            className="save-project-button">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          }
          {sessionUser && sessionUser.id !== project.creatorId &&
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

export default RecommendedProject;
