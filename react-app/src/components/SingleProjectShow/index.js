import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { loadSingleProjectThunk } from "../../store/project";
import { Redirect } from "react-router-dom";

const SingleProjectShow = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [isBacker, setIsBacker] = useState(false);


  useEffect(() => {
    dispatch(loadSingleProjectThunk(projectId))
  }, [dispatch, projectId])

  const sessionUser = useSelector((state) => state.session.user);

  const project = useSelector((state) => state.projects.singleProject);

  console.log('project in single project----', project)


  // project?.backings.forEach(backing => {
  //   if (backing.userId === sessionUser.id) {
  //     setIsBacker(true);
  //   }
  // })

  console.log('is backer check-----', isBacker)

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
  // console.log(differenceInMS)
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

  return (
    <div id="main-single-project-container">
      {Object.keys(project).length === 0 ? <><h1>No Project Found</h1></> :
        <>
          <div id="single-project-container">
            <div className="single-project-headers">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
            <div className="single-project-image-details container">
              <div className="single-project-image-box">
                <img src={project?.projectImage} alt={project.title}></img>
              </div>
              <ul className="other-details-list">
                <li>
                  <i class="fa-regular fa-compass"></i> {project.category?.name}
                </li>
                <li>
                  <i class="fa-solid fa-location-dot"></i> {project?.location}
                </li>
              </ul>
            </div>
            <div className="rightside-project-details">
              <div>Progress Bar PlaceHolder</div>
              <div className="project-funding-details-container">
                <div className="project-funding-details">
                  <div>
                    ${funded(project)}
                  </div>
                  <span>
                    pledged of ${project?.fundingGoal}
                  </span>
                </div>
                <div className="project-backer-details">
                  <div>
                    {project.backings?.length}
                  </div>
                  <span>
                    backing(s)
                  </span>
                </div>
                <div className="project-date-details">
                  <div>
                    {differenceInDays}
                  </div>
                  <span>
                    days to go
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default SingleProjectShow;
