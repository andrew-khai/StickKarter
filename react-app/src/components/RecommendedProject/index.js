import "./RecommendedProject.css"

const RecommendedProject = ({ project }) => {
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
        <a href="">
          <img className="rec-project-image" src={project.projectImage}></img>
        </a>
      </div>
      <div className="rec-project-details">
        <div className="rec-project-title">{project.title}</div>
        <div className="rec-project-funding">{Math.ceil((funded(project) / project.fundingGoal) * 100)}% funded</div>
        <div className="rec-project-creator">By {project.creator.username}</div>
      </div>
    </div>
  )
}

export default RecommendedProject;
