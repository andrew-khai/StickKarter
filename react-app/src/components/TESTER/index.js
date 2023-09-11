import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteProjectThunk, loadProjectsThunk } from "../../store/project";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import { NavLink } from "react-router-dom";

const Tester = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProjectsThunk());
  }, [dispatch])
  const projects = useSelector(state => Object.keys(state.projects.projects).map(project => {
    return state.projects.projects[project]
  }))

  // console.log(projects)

  if (!(projects.length > 0)) {
    return null
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProjectThunk())
  }

  return (
    <>
      <h1>Testing</h1>
      {projects.map(project => (
        <li id={project.id}>
          {project.id}.
          {project.title}
          <NavLink exact to={`/projects/${project.id}/edit`}>
            <button className="single-project-edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
          </NavLink>
          <OpenModalButton
            className="project-delete-button"
            buttonText="Delete"
            modalComponent={<DeleteProjectModal project={project} />}
          />
        </li>
      ))}
    </>
  )
}

export default Tester
