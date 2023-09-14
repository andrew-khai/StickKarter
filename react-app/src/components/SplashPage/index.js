import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadProjectsThunk } from "../../store/project";

const SplashPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjectsThunk())
  }, [dispatch])

  const allFunded = (projects) => {
    let sum = 0;
    if (projects) {
      projects.forEach(project => {
        if (project.backings) {
          project.backings.forEach(backing => {
            sum += backing.amountPledged;
          })
        }
      })
    }
    return sum;
  }

  const totalPledges = (projects) => {
    let count = 0;
    if (projects) {
      projects.forEach(project => {
        count += project.backings.length;
      })
    }
    return count
  }

  const projects = useSelector(state => state.projects)
  const projectsArr = Object.values(projects.projects)


  // console.log(projectsArr)

  return (
    <>
      <div className="splash-page-container">
        <h1>Bring a creative dream to life</h1>
        <h2>ON STICKKARTER:</h2>
        <div className="stickkarter-totals-container">
          <div>
            <div>{projectsArr.length}</div>
            <span>total projects</span>
          </div>
          <div>
            <div>${allFunded(projectsArr)}</div>
            <span>towards creative work</span>
          </div>
          <div>
            <div>{totalPledges(projectsArr)}</div>
            <span>pledges</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default SplashPage;
