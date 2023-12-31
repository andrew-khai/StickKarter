import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProjectThunk } from "../../store/project";
import { removeUserProjectThunk } from "../../store/user";
import "./DeleteProjectModal.css"

function DeleteProjectModal ({project}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProjectThunk(project.id))
    dispatch(removeUserProjectThunk(project.id))

    closeModal()
  }

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="confirm-delete-container">
      <h2>Are you sure you want to delete your post?</h2>
      <div id="confirm-delete-buttons-container">
        <button
        id="yes-button"
        onClick={handleDelete}
        disabled={!sessionUser}
        >Yes</button>
        <button
        id="no-button"
        onClick={closeModal}
        >No</button>
      </div>
    </div>
  )
}

export default DeleteProjectModal;
