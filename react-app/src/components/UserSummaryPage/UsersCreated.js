import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import "./UserSummaryPage.css";
import useWindowWidth from "../../hooks/windowWidth";

const UsersCreated = ({ projects, funded }) => {
  // console.log(projects)
  let inOrderProjects = Object.values(projects).sort((a, b) => {
    let da = new Date(a.createdAt);
    let db = new Date(b.createdAt);
    return da - db;
  });

  inOrderProjects.reverse();

  const width = useWindowWidth();

  return (
    <>
      {projects &&
        inOrderProjects.map((project) => (
          <li key={project.id}>
            <div className="the-project-info-container">
              <div className="project-info-funded-container">
                <NavLink
                  to={`/projects/${project.id}`}
                  className="project-info-container"
                >
                  <img
                    src={project.projectImage}
                    style={{ width: "70px", height: "50px" }}
                  ></img>
                  <div style={{ width: "250px" }}>{project.title}</div>
                </NavLink>
                <div className="total-funds">
                  <span style={{ color: "#05ce78" }}>Funded:</span> $
                  {funded(project).toFixed(2)}
                </div>
              </div>
              <div className="created-projects-buttons-container">
                <Button variant="success" >
                  <NavLink
                    className="creator-edit-buttons"
                    to={`/projects/${project.id}/edit`}
                  >
                    Edit Project
                  </NavLink>
                </Button>
                <Button variant="success">
                  <NavLink
                    className="creator-edit-buttons"
                    to={`/projects/${project.id}/rewards`}
                  >
                    Edit/Add Rewards
                  </NavLink>
                </Button>
                <OpenModalButton
                  className="project-delete-button"
                  buttonText="Delete"
                  modalComponent={<DeleteProjectModal project={project} />}
                />
              </div>
            </div>
          </li>
        ))}
    </>
  );
};

export default UsersCreated;
