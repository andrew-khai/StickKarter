import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./ProjectFeatured.css"

const ProjectFeaturedItem = ({ project }) => {
  // console.log('project -----', project)
  const sessionUser = useSelector((state) => state.session.user);

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

  return (
    <div className="main-featured-project-container">
      <h1 class="featured-project-text">FEATURED PROJECT</h1>
      <div className="featured-project-container" style={{width: "625px"}}>
        <NavLink to={`/projects/${project?.id}`} style={{width: "625px"}}>
          <img className="featured-project-image" style={{ width: "625px", height: "335.08px" }} src={project?.projectImage}></img>
        </NavLink>
        <div className="fund-progress-bar" style={{ width: funding(project), border: "5px solid green" }}></div>
        <h2>
          {project?.title}
        </h2>
        <div>
          {project?.description}
        </div>
        <div>
          {sessionUser && sessionUser.id !== project?.creatorId &&
            <button className="save-project-button">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectFeaturedItem;
