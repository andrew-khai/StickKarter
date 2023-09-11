import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import "./ProjectForm.css"
import { createProjectThunk, updateProjectThunk } from "../../store/project";

const ProjectForm = ({ project, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(project?.categoryId);
  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  const [story, setStory] = useState(project?.story);
  const [faq, setFaq] = useState(project?.faq);
  const [projectImage, setProjectImage] = useState(project?.projectImage);
  const [startDate, setStartDate] = useState(project?.startDate);
  const [endDate, setEndDate] = useState(project?.endDate);
  const [fundingGoal, setFundingGoal] = useState(project?.fundingGoal || 100);
  const [location, setLocation] = useState(project?.location);

  // console.log('category id', categoryId)


  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  // console.log('project here--------- in form', project)

  const handleSubmit = async (e) => {
    e.preventDefault()
    project = {
      ...project,
      creator_id: sessionUser.id,
      category_id: parseInt(categoryId),
      title,
      description,
      story,
      faq,
      project_image: projectImage,
      start_date: startDate,
      end_date: endDate,
      funding_goal: fundingGoal,
      location
    }

    // console.log('project being sent to thunk----', project)
    if (formType === "Create") {
      // console.log('comint into the create if block')
      const newProject = await dispatch(createProjectThunk(project))

      if (newProject?.errors) {
        console.log('came into the create errors block')
        setErrors(newProject?.errors);
      }

      // console.log('console log after the new project', newProject)
      history.push(`/projects/${newProject.id}`)
    }

    if (formType === "Update") {
      // console.log('its coming into the update if block')
      const updatedProject = await dispatch(updateProjectThunk(project, project.id))

      if (updatedProject?.errors) {
        setErrors(updatedProject?.errors);
      }
      // console.log('updated prjec', updatedProject)
      history.push(`/projects/${updatedProject.project.id}`)
    }

  }
  // console.log("start:", project.startDate, "end:", project.endDate)

  const formatDate = (date) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  return (
    <div className="main-formpage-container">
      <div className="formpage-container">
        {/* Category */}
        {page === 1 && formType === "Create" && <div><h1>First, let's get you set up.</h1></div>}
        {page === 1 &&
          <div className="form-container">
            <h1 className="project-form-header">Select a primary category for your project</h1>
            <h2 className="project-form-explanation">These will help backers find your project, and you can it later if you need to</h2>
            <br></br>
            <select
              // defaultValue={project.categoryId ? `${project.categoryId}` : ''}
              className="project-form-categories" value={categoryId || ''} onChange={(e) => setCategoryId(e.target.value)}>
              <option value='' disabled={true}>Select</option>
              <option value="1">Arts</option>
              <option value="2">Comics & Illustration</option>
              <option value="3">Design & Tech</option>
              <option value="4">Film</option>
              <option value="5">Food & Craft</option>
              <option value="6">Games</option>
              <option value="7">Music</option>
              <option value="8">Publishing</option>
            </select>
            <br></br>
            <div className="form-button-nav-container">
              <div>
                {formType === "Create" ?
                  <p className="form-greeting">Congrats on your first project!</p> :
                  <p>Edit your project</p>
                }
              </div>
              <button className="form-next-page-button" disabled={!categoryId} onClick={() => setPage(2)}>Next: Project Title</button>
            </div>
          </div>
        }
        {/* Title */}
        {page === 2 &&
          <div className="form-container">
            <h1 className="project-form-header">Give your project a title.</h1>
            <h2 className="project-form-explanation">Include a description so others will know the purpose of your object</h2>
            <label className="project-form-labels">
              <div style={{ textAlign: "left" }}>
                Title
              </div>
              <input
                className="form-text-inputs"
                type="text"
                value={title}
                placeholder="Input title here"
                onChange={(e) => setTitle(e.target.value)}
              >
              </input>
            </label>
            <br></br>
            <label className="project-form-labels">
              <div style={{ textAlign: "left" }}>
                Description
              </div>
              <textarea
                className="form-textarea-inputs"
                value={description}
                placeholder="Input descritpion here"
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
              >
              </textarea>
            </label>
            <div className="form-button-nav-container">
              <button className="form-back-page-button" onClick={() => setPage(1)}><i class="fa-solid fa-arrow-left-long"></i> Back: Project Category</button>
              <button className="form-next-page-button" disabled={!title || !description} onClick={() => setPage(3)}>Next: Project Details</button>
            </div>
          </div>
        }
        {/* Details */}
        {page === 3 &&
          <div className="form-container">
            <h1 className="project-form-header">Give your project more information with a story or frequently asked questions</h1>
            <h2 className="project-form-explanation">These are optional, so you can add them later</h2>
            <label className="project-form-labels">
              <div style={{ textAlign: "left" }}>
                Story
              </div>
              <textarea
                className="form-textarea-inputs"
                value={story}
                placeholder="Input descritpion here"
                onChange={(e) => setStory(e.target.value)}
              >
              </textarea>
            </label>
            <br></br>
            <label className="project-form-labels">
              <div style={{ textAlign: "left" }}>
                FAQ
              </div>
              <textarea
                className="form-textarea-inputs"
                value={faq}
                placeholder="Frequently Asked Questions"
                onChange={(e) => setFaq(e.target.value)}
              >
              </textarea>
            </label>
            <div className="form-button-nav-container">
              <button className="form-back-page-button" onClick={() => setPage(2)}><i class="fa-solid fa-arrow-left-long"></i> Back: Project Title</button>
              <button className="form-next-page-button" onClick={() => setPage(4)}>Next: Project Location</button>
            </div>
          </div>
        }
        {/* Location */}
        {page === 4 &&
          <div className="form-container">
            <h1 className="project-form-header">Set a Location</h1>
            <h2 className="project-form-explanation">Input your location of legal residence if you’re raising funds as an individual. If you’re raising funds for a business or nonprofit, select the country where the entity’s tax ID is registered. (ex. Dallas, Texas or London, England)</h2>
            <label className="project-form-labels">
              <div style={{ textAlign: "left" }}>
                Location
              </div>
              <input
                className="form-text-inputs"
                type="text"
                value={location}
                placeholder="Input location here"
                onChange={(e) => setLocation(e.target.value)}
              >
              </input>
            </label>
            <div className="form-button-nav-container">
              <button className="form-back-page-button" onClick={() => setPage(3)}><i class="fa-solid fa-arrow-left-long"></i> Back: Project Details</button>
              <button className="form-next-page-button" disabled={!location} onClick={() => setPage(5)}>Next: Project Dates & Goals</button>
            </div>
          </div>
        }
        {/* Dates/Goals */}
        {page === 5 &&
          <div className="form-container">
            <h1 className="project-form-header">Set your initial start date and end date for your funding period as well as the funding goal</h1>
            <h2 className="project-form-explanation">These can be updated before your project launch date</h2>
            <div className="project-form-date-containers">
              <label className="project-form-labels">
                <div style={{ textAlign: "left" }}>
                  Start Date
                </div>
                <input
                  className="form-date-inputs"
                  type="date"
                  value={formatDate(startDate)}
                  onChange={(e) => setStartDate(e.target.value)}
                >
                </input>
              </label>
              <label className="project-form-labels">
                <div style={{ textAlign: "left" }}>
                  End Date
                </div>
                <input
                  className="form-date-inputs"
                  type="date"
                  value={formatDate(endDate)}
                  onChange={(e) => setEndDate(e.target.value)}
                >
                </input>
              </label>
              <label className="project-form-labels">
                <div style={{ textAlign: "left" }}>
                  Funding Goal
                </div>
                <input
                  className="form-funds-input"
                  type="number"
                  value={fundingGoal}
                  onChange={(e) => setFundingGoal(e.target.value)}
                >
                </input>
              </label>
            </div>
            <div className="form-button-nav-container">
              <button className="form-back-page-button" onClick={() => setPage(4)}><i class="fa-solid fa-arrow-left-long"></i> Back: Project Location</button>
              <button className="form-next-page-button" disabled={!startDate || !endDate || !fundingGoal || fundingGoal < 1} onClick={() => setPage(6)}>Next: Project Image</button>
            </div>
          </div>
        }
        {/* Image/Last */}
        {page === 6 &&
          <div className="form-container">
            <h1 className="project-form-header">Lastly, add a photo for your project</h1>
            <h2 className="project-form-explanation">Enter an image url and show potential backers your beautiful project. (AWS image hosting coming soon)</h2>
            <label className="project-form-labels">
              <div style={{ textAlign: "left" }}>
                Project Image
              </div>
              <input
                className="form-text-inputs"
                type="text"
                value={projectImage}
                placeholder="Input image URL here"
                onChange={(e) => setProjectImage(e.target.value)}
              >
              </input>
            </label>
            <div className="form-button-nav-container">
              <button className="form-back-page-button" onClick={() => setPage(5)}><i class="fa-solid fa-arrow-left-long"></i> Back: Project Dates & Goals </button>
              <button className="form-next-page-button" disabled={!projectImage} onClick={handleSubmit}>Finalize</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProjectForm;
