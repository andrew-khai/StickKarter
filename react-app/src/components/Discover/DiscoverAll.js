import { useDispatch, useSelector } from "react-redux";
import "./Discover.css"
import { useEffect } from "react";
import { loadProjectsThunk } from "../../store/project";
import DiscoverShowProjects from "./DiscoverShowProjects";

const DiscoverAll = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(loadProjectsThunk());
  }, [dispatch])

  const projects = useSelector(state => Object.keys(state.projects.projects).map(project => {
    return state.projects.projects[project]
  }))

  // console.log(projects)

  let inOrderProjects = projects.sort((a, b) => {
    let da = new Date(a.createdAt);
    let db = new Date(b.createdAt);
    return da - db;
  })

  inOrderProjects.reverse();

  return (
    <>
      <div className="main-discover-all-div">
        <div className="discover-all-header-div">
          <p className="discover-header">
            Show me <strong className="boxed-all">All</strong> projects
          </p>
        </div>
      </div>
      <div className="discover-projects-container">
        <h2 style={{width: "1250px", margin: "30px auto", color: "#037362", paddingInline: "10px"}}>Explore <span>{projects?.length} Projects</span></h2>
        {projects && projects.length > 0 &&
          <>
            <div className="projects-grid-container">
              {projects.map(project => (
                <DiscoverShowProjects
                  project={project}
                />
              ))}
            </div>
          </>
        }
      </div>
    </>
  )

}

export default DiscoverAll;
