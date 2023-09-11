import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./RecommendedProject.css"

const RecommendedProject = ({ project }) => {

  const sessionUser = useSelector((state) => state.session.user);

  const funded = (project) => {
    let sum = 0;
    if (project.backings) {
      project.backings.forEach(backing => {
        sum += backing.amountPledged;
      })
    }
    return sum;
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
        <div className="rec-project-creator">By {project.creator.username}</div>
        <div>
          {sessionUser && sessionUser.id !== project.creatorId &&
            <button className="save-project-button">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default RecommendedProject;
