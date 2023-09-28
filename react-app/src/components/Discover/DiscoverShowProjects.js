import { NavLink } from "react-router-dom";

const DiscoverShowProjects = ({ project }) => {

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

  const funded = (project) => {
    let sum = 0;
    if (project.backings) {
      project.backings.forEach(backing => {
        sum += backing.amountPledged;
      })
    }
    return sum;
  }

  const currentDate = new Date();
  let endDate = new Date(project.endDate)
  // console.log(endDate)

  const differenceInMs = endDate - currentDate;
  // console.log(differenceInMs)
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

  return (
    <div className="single-project-discover">
      <div className="single-project-image-div">
        <NavLink to={`/projects/${project?.id}`}>
          <img src={project?.projectImage} style={{ width: "390px", height: "220px" }}></img>
        </NavLink>
      </div>
      <div className="single-project-main-info">
        <div style={{fontSize: "1.1rem", fontWeight: "bold"}}>
          {project?.title}
        </div>
        <div style={{marginTop: "10px", color: "#656969"}}>
          {project?.description}
        </div>
        <div style={{marginTop: "20px", color: "#656969"}}>
          by {project.creator?.username}
        </div>
      </div>
      <div className="single-project-pledge-info">
        <div className="fund-progress-bar" style={{ width: funding(project), border: "5px solid green", marginBottom: "5px" }}></div>
        <div style={{color: "#037362"}}>
          ${funded(project)} pledged
        </div>
        <div>
          <div>{Math.ceil((funded(project) / project?.fundingGoal) * 100)}% funded</div>
        </div>
        <div style={{color: "#656969"}}>
          {differenceInDays < 0 ? 0 : differenceInDays} days to go
        </div>
      </div>
      <div className="single-project-other-info">
        <div style={{color: "#656969"}}>
          <i class="fa-regular fa-compass"></i> {project.category?.name}
        </div>
        <div style={{color: "#656969"}}>
          <i class="fa-solid fa-location-dot"></i> {project?.location}
        </div>
      </div>
    </div>
  )
}

export default DiscoverShowProjects;
