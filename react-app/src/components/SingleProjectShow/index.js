import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { createBackingThunk, loadProjectsThunk, loadSingleProjectThunk, unloadSingleProjectThunk } from "../../store/project";
import { Redirect } from "react-router-dom";
import "./SingleProjectShow.css"
import "../RewardsShow/RewardsShow.css"
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import { useHistory } from "react-router-dom";
import RewardsShow from "../RewardsShow";
import { addSaveThunk, removeSaveThunk } from "../../store/user";

const SingleProjectShow = () => {
  const { projectId } = useParams();
  const history = useHistory()
  const dispatch = useDispatch();
  const [isBacker, setIsBacker] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [pledge, setPledge] = useState(5);
  const [showStory, setShowStory] = useState(true);
  const [showFaq, setShowFaq] = useState(false);
  const [errors, setErrors] = useState({});
  const [fullyFunded, setFullyFunded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // const [singleProjectId, setSingleSpotId] = useState(projectId);

  const toggleStory = () => {
    setShowStory(true);
    setShowFaq(false);
  }

  const toggleFaq = () => {
    setShowFaq(true);
    setShowStory(false);
  }

  // useEffect(() => {
  //   const errorsObj = {}
  //   if (sessionUser.id == project.creatorId) errorsObj.user = "Cannot back your own project"
  //   setErrors(errorsObj)
  // }, [sessionUser])

  useEffect(async () => {
    await dispatch(unloadSingleProjectThunk())
    await dispatch(loadSingleProjectThunk(projectId))
  }, [dispatch, projectId])

  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector(state => state.users.currentUser);
  const project = useSelector((state) => state.projects.singleProject);

  useEffect(() => {
    if (project) {
      project.backings?.forEach(backing => {
        if (backing?.userId === sessionUser?.id) {
          setIsBacker(true)
        } else {
          setIsBacker(false)
        }
      })
    }
  }, [project])

  useEffect(() => {
    if (sessionUser && currentUser) {
      setIsSaved(currentUser.saves?.some((save) => save.projectId === project.id))
    }
  }, [sessionUser, currentUser, project.id])

  // const saveCheck = (project, user) => {
  //   let projectIds = [];
  //   let saves = user.saves;
  //   saves?.forEach(save => projectIds.push(save.projectId))
  //   if (projectIds.includes(project.id)) return true;
  //   else return false;
  // }

  // const addSave = async () => {
  //   await dispatch(addSaveThunk(currentUser, project.id))
  // }

  // const removeSave = async () => {
  //   await dispatch(removeSaveThunk(currentUser, project.id))
  // }

  // console.log('project ------', project)

  // if (!project || !project.id) {
  //   return null
  // }
  const rewards = project.rewards

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
      // setFullyFunded(true);
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

  const addSave = async () => {
    // console.log('in the add save block')
    await dispatch(addSaveThunk(currentUser, project.id));
    setIsSaved(true);
    await dispatch(loadProjectsThunk());
  }

  const removeSave = async () => {
    // console.log('in the remove save block')
    await dispatch(removeSaveThunk(currentUser, project.id));
    setIsSaved(false)
    await dispatch(loadProjectsThunk())
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPledge = {
      user_id: sessionUser.id,
      project_id: projectId,
      amount_pledged: pledge
    }

    await dispatch(createBackingThunk(newPledge))
    await dispatch(loadSingleProjectThunk(projectId))
  }

  return (
    <div id="main-single-project-container">
      {Object.keys(project).length > 0 ?
        <>
          <div id="single-project-container">
            {/* {funding(project) == "100%" && <h1 id="completely-funded">This project has been fully funded!</h1>} */}
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
                  <div className="progress-bar-container progress">
                    <div className="fund-progress-bar progress" style={{ width: funding(project), border: "5px solid green" }}></div>
                  </div>
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
                    <a href="#support">
                      <button style={{ width: "100%" }} disabled={sessionUser.id === project.creatorId} className="back-this-button">Back this project</button>
                    </a>
                  }
                  <div className="single-project-buttons-container">
                    {sessionUser && sessionUser.id !== project.creatorId && !isSaved &&
                      <button className="save-project-rectangle-button" onClick={addSave}>
                        <i class="fa-regular fa-bookmark"></i> Save Project
                      </button>
                    }
                    {sessionUser && sessionUser.id !== project.creatorId && isSaved &&
                      <button style={{ color: "blue", borderColor: "blue" }} className="save-project-rectangle-button" onClick={removeSave}>
                        <i style={{ color: "blue" }} class="fa-regular fa-bookmark"></i> Saved Project
                      </button>
                    }
                    {sessionUser && sessionUser.id === project.creatorId &&
                      <div className="creator-buttons-container">
                        <NavLink exact to={`/projects/${project.id}/edit`}>
                          <button className="single-project-edit-button"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
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
        <div id="no-project-container" style={{ height: "100vh", textAlign: "center" }}>
          <h1 style={{ textAlign: "center" }}>No Project Found</h1>
          <iframe style={{border: "none", height: "100vh", width: "100%"}} src="https://lottie.host/?file=a8c0e170-0fa5-4955-b4e9-fb61840714bb/gG2PNuWQaT.json"></iframe>
        </div>
      }
      {/* {!Object.keys(project) === 0 &&
        <div id="single-project-container" style={{ width: "100vh" }}>
          <h1 style={{ textAlign: "center" }}>No Project Found</h1>
        </div>
      } */}
      {Object.keys(project).length > 0 &&
        <>
          <nav className="single-project-dropdown-container">
            <div className="story-rewards-div">
              <div onClick={toggleStory} id="dropdown-story" className={showStory ? "button-active" : "button-inactive"}>Story</div>
              <div onClick={toggleFaq} id="dropdown-faq" className={showFaq ? "button-active" : "button-inactive"}>FAQ</div>
            </div>
            <div className="back-save-button-container">
              {sessionUser && sessionUser.id !== project.creatorId && !isSaved &&
                <>
                  {/* <button className="mini-back-this-button">Back this project</button> */}
                  <button className="mini-save-project-rectangle-button" onClick={addSave}>
                    <i class="fa-regular fa-bookmark"></i> Save this Project
                  </button>
                </>
              }
              {sessionUser && sessionUser.id !== project.creatorId && isSaved &&
                <>
                  {/* <button className="mini-back-this-button">Back this project</button> */}
                  <button style={{ color: "blue" }} className="mini-save-project-rectangle-button" onClick={removeSave}>
                    <i class="fa-regular fa-bookmark"></i> Saved Project
                  </button>
                </>
              }
            </div>
          </nav>
          <div className="dropdown-information-container">
            {showStory &&
              <div className="dropdown-story-div">
                <h2 className="dropdown-story-header">
                  Story
                </h2>
                {project?.story ?
                  <div className="dropdown-story">
                    {project?.story}
                  </div>
                  :
                  <div>No story yet!</div>
                }
              </div>
            }
            {showFaq &&
              <div className="dropdown-story-div">
                <h2 className="dropdown-story-header">
                  FAQ
                </h2>
                {project?.faq ?
                  <div className="dropdown-story">
                    {project?.faq}
                  </div>
                  :
                  <div>No FAQs yet!</div>
                }
              </div>
            }
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
                <h2 id="support">Support</h2>
                {isBacker &&
                  <h2 style={{ color: "#009E74", textAlign: "center" }}>You have already backed this project!</h2>
                }
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
                        min={5}
                        type="number"
                        value={pledge}
                        onChange={(e) => setPledge(e.target.value)}
                      >
                      </input>
                    </div>
                    {/* {errors.user &&
                    <p className="errors">{errors.user}</p>
                    } */}
                    <button onClick={handleSubmit} disabled={!sessionUser || sessionUser.id === project.creatorId || pledge < 5 || isBacker} className="pledge-button">Pledge</button>
                  </div>
                </div>
                <h2>Available Rewards</h2>
                <div className="main-single-rewards-container">
                  {rewards?.length > 0 &&
                    <RewardsShow
                      user={sessionUser}
                      rewards={rewards}
                      project={project}
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
