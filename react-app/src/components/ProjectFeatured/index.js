import "./ProjectFeatured.css"

const ProjectFeaturedItem = ({ project }) => {
  console.log('project -----', project)

  return (
    <div className="main-featured-project-container">
      <h1 class="featured-project-text">FEATURED PROJECT</h1>
      <div className="featured-project-container">
        <img className="featured-project-image" style={{ width: "625px", height: "auto" }} src={project?.projectImage}></img>
        <h2>
          {project.title}
        </h2>
        <div>
          {project.description}
        </div>
        <div>
          <button className="save-project-button">
            <i class="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectFeaturedItem;
