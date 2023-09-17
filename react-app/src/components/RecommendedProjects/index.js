import { useState } from "react"
import RecommendedProject from "../RecommendedProject";
import "./RecommendedProjects.css"

const RecommendedProjects = ({ projects }) => {
  const projectsPerPage = 3;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  const currentProjects = projects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }

  const isPreviousDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  // console.log("recommnded", projects)
  return (
    <>
      {projects && projects.length > 0 ?
        <div className="main-recommended-projects-container">
          <h1 className="recommended-text">RECOMMENDED FOR YOU</h1>
          <div className="recommended-projects-container">
            {currentProjects.map(project => (
              <RecommendedProject
                project={project}
                key={project.id}
              />
            ))}
          </div>
          {/* <br></br>
          <div style={{ textAlign: "right" }}>{"<  1  2  3  >"}</div> */}
          <br />
          <div style={{ textAlign: 'right', marginTop: "10px" }}>
            <button className="chevron-buttons" disabled={isPreviousDisabled} onClick={() => handlePageChange(page - 1)}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                style={{border: "none", backgroundColor: "white", color: "blue", fontSize: "1rem", cursor: "pointer"}}
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={i + 1 === page ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button className="chevron-buttons" disabled={isNextDisabled} onClick={() => handlePageChange(page + 1)}>&gt;</button>
          </div>
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
