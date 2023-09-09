import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { loadSingleProjectThunk } from "../../store/project";
import { Redirect } from "react-router-dom";
import "./SingleProjectShow.css"

const SingleProjectShow = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [isBacker, setIsBacker] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [singleProjectId, setSingleSpotId] = useState(projectId);



  useEffect(() => {
    dispatch(loadSingleProjectThunk(projectId))
  }, [dispatch, projectId])

  const sessionUser = useSelector((state) => state.session.user);

  const project = useSelector((state) => state.projects.singleProject);

  // if (project) {
  //   if (project.backings) {
  //     project.backings.forEach(backing => {
  //       if (backing.userId === sessionUser.id) {
  //         setIsBacker(true);
  //         return;
  //       }
  //     })
  //   }
  // }

  // const owner = (project) => {
  //   if (project.creatorId === sessionUser.id) {
  //     setIsOwner(true);
  //   }
  //   return;
  // }

  // if (sessionUser) {
  //   owner();
  // }
  // console.log('project in single project----', project)


  // project?.backings.forEach(backing => {
  //   if (backing.userId === sessionUser.id) {
  //     setIsBacker(true);
  //   }
  // })

  // console.log('is backer check-----', isBacker)
  const funding = (project) => {
    let sum = 0;
    if (project.backings) {
      project.backings.forEach(backing => {
        sum += backing.amountPledged;
      })
      return fundPercent(sum)
    }
    return "0%"
  }

  const fundPercent = (sum) => {
    let number = Math.ceil(((sum) / (project.fundingGoal)) * 100)
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
    <div id="main-single-project-container">
      {project ?
        <>
          <div id="single-project-container">
            {/* if backer backer message here */}
            <div className="single-project">
              <div className="single-project-headers">
                <h2 className="single-project-title">{project.title}</h2>
                <p className="single-project-description">{project.description}</p>
              </div>
              <div className="single-page-details">
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
                  <div className="fund-progress-bar" style={{ width: funding(project), border: "5px solid green" }}></div>
                  <div className="project-funding-details-container">
                    <div className="project-funding-details">
                      <div className="project-funding">
                        ${funded(project)}
                      </div>
                      <span className="project-funding-goal">
                        pledged of ${project?.fundingGoal}
                      </span>
                    </div>
                    <div>
                      <div className="project-backer-details">
                        {project.backings?.length}
                      </div>
                      <span className="project-backings">
                        backing(s)
                      </span>
                    </div>
                    <div>
                      <div className="project-date-details">
                        {differenceInDays < 0 ? 0 : differenceInDays}
                      </div>
                      <span className="project-days-left">
                        days to go
                      </span>
                    </div>
                  </div>
                  <button className="back-this-button">Back this project</button>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <><h1>No Project Found</h1></>
      }
    </div>
  )
}

export default SingleProjectShow;
