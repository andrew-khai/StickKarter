import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { loadSingleProjectThunk } from "../../store/project";
import { Redirect } from "react-router-dom";
import "./SingleProjectShow.css"
import "../RewardsShow/RewardsShow.css"
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import { useHistory } from "react-router-dom";
import RewardsShow from "../RewardsShow";

const SingleProjectShow = () => {
  const { projectId } = useParams();
  const history = useHistory()
  const dispatch = useDispatch();
  const [isBacker, setIsBacker] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [pledge, setPledge] = useState(1);
  const [singleProjectId, setSingleSpotId] = useState(projectId);



  useEffect(() => {
    dispatch(loadSingleProjectThunk(projectId))
  }, [dispatch, projectId])

  const sessionUser = useSelector((state) => state.session.user);

  const project = useSelector((state) => state.projects.singleProject);
  console.log('project ------', project)

  if (!project || !project.id) {
    return null
  }
  const rewards = project.rewards
  // console.log('rewards here-----', rewards)

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
  // console.log('project in single project----', Object.keys(project))
  // if (Object.keys(project).length < 1) {
  //   return <Redirect to="/" />
  // }


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

  const redirectToLogin = () => {

    history.push("/login")
  }

  const currentDate = new Date();
  let endDate = new Date(project.endDate)
  // console.log(endDate)

  const differenceInMs = endDate - currentDate;
  // console.log(differenceInMs)
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

  return (
    <div id="main-single-project-container">
      {Object.keys(project).length > 0 ?
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
                  {!sessionUser ?
                    <button onClick={redirectToLogin} className="back-this-button">Back this project</button>
                    :
                    <button className="back-this-button">Back this project</button>
                  }
                  <div className="single-project-buttons-container">
                    {sessionUser && sessionUser.id !== project.creatorId &&
                      <button className="save-project-rectangle-button">
                        <i class="fa-regular fa-bookmark"></i> Save Project
                      </button>
                    }
                    {sessionUser && sessionUser.id === project.creatorId &&
                      <div className="creator-buttons-container">
                        <NavLink exact to={`/projects/${project.id}/edit`}>
                          <button className="single-project-edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
                        </NavLink>
                        {/* <OpenModalButton
                          className="project-delete-button"
                          buttonText={<i class="fa-regular fa-trash-can"></i>}
                          modalComponent={<DeleteProjectModal project={project} />}
                        /> */}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <><h1 style={{textAlign: "center"}}>No Project Found</h1></>
      }
      {Object.keys(project).length > 0 &&
        <>
          <nav className="single-project-dropdown-container">
            <div className="story-rewards-div">
              <div className="dropdown-story">Story</div>
              <div className="dropdown-faq">FAQ</div>
            </div>
            <div className="back-save-button-container">
              {sessionUser && sessionUser.id !== project.creatorId &&
                <>
                  <button className="mini-back-this-button">Back this project</button>
                  <button className="mini-save-project-rectangle-button">
                    <i class="fa-regular fa-bookmark"></i> Save this Project
                  </button>
                </>
              }
            </div>
          </nav>
          <div className="dropdown-information-container">
            <div className="dropdown-story-div">
              <h2 className="dropdown-story-header">
                Story
              </h2>
              <div className="dropdown-story">
                {project?.story}
              </div>
            </div>
            <div className="creator-rewards-container">
              <div className="creator-container">
                <div className="creator-username">
                  {project.creator?.username}
                </div>
                <div className="creator-details">
                  {project.creator?.projects} created • {project.creator?.backings} backed
                </div>
                <div className="creator-bio">
                  {project.creator?.bio}
                </div>
              </div>
              <br></br>
              <div className="single-project-rewards-container">
                <h2>Support</h2>
                <div className="no-reward-pledge">
                  <p style={{ marginBottom: "0px" }}>Make a pledge without a reward</p>
                  <div className="pledge-amount-container">
                    <p>Pledge amount</p>
                    <div className="pledge-input-container">
                      <div className="pledge-money-sign">
                        <p style={{ margin: "0px", padding: "5px 10px 5px 5px", borderRight: "1px solid black" }}>$</p>
                      </div>
                      <input
                        className="pledge-input"
                        type="number"
                        value={pledge}
                        onChange={(e) => setPledge(e.target.value)}
                      >
                      </input>
                    </div>
                  </div>
                </div>
                <h2>Available Rewards</h2>
                <div className="main-single-rewards-container">
                  {rewards?.length > 0 &&
                    <RewardsShow
                      rewards={rewards}
                    />
                  }
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
