import { useState } from "react"
import RecommendedProject from "../RecommendedProject";
import "./RecommendedProjects.css"

const RecommendedProjects = ({ projects }) => {
  // const [page, setPage] = useState(1)

  // console.log("recommnded", projects)
  return (
    <>
      {projects && projects.length > 0 ?
        <div className="main-recommended-projects-container">
          <h1 className="recommended-text">RECOMMENDED FOR YOU</h1>
          <div className="recommended-projects-container">
            {projects.map(project => (
              <RecommendedProject
                project={project}
                key={project.id}
              />
            ))}
          </div>
          <br></br>
          <div style={{ textAlign: "right" }}>{"<  1  2  3  >"}</div>
        </div>
        :
        <div className="main-recommended-projects-container">
          <h1 className="recommended-text">RECOMMENDED FOR YOU</h1>
          <div className="recommended-projects-container">
            <p>No other projects in this category yet!</p>
          </div>
        </div>
      }
    </>
  )
}

export default RecommendedProjects
