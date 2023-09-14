import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteRewardThunk } from "../../store/reward";
import { useEffect, useState } from "react";
import "./EditRewardModal.css"

function EditRewardModal({ reward, onUpdate }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState(reward?.title)
  const [description, setDescription] = useState(reward?.description)
  const [price, setPrice] = useState(reward?.price)
  const [errors, setErrors] = useState({})

  const sessionUser = useSelector((state) => state.session.user);
  // console.log('reward here -----', reward)

  useEffect(() => {
    const errorsObj = {}
    if (title.length <= 0) errorsObj.title = "Title is required"
    if (description.length <= 0) errorsObj.description = "Description is required"
    if (price < 5) errorsObj.price = "Price must be at least 5"
    setErrors(errorsObj)
  }, [title, description, price])

  const handleSubmit = (e) => {
    e.preventDefault()
    let updatedReward = {
      id: reward.id,
      project_id: reward.projectId,
      title,
      description,
      price
    }

    onUpdate(updatedReward)

    closeModal()
  }

  console.log(errors)

  return (
    <div id="confirm-delete-container">
      <h2>Edit Reward</h2>
      <form onSubmit={handleSubmit}>
        <label className="edit-rewards-labels">
          Reward Title:
          <input type="text" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
          {errors.title && <p  className="errors">{errors.title}</p>}
        <label className="edit-rewards-labels">
          Reward Description:
          <textarea rows="10" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
          {errors.description && <p className="errors">{errors.description}</p>}
        <label className="edit-rewards-labels">
          Price:
          <input type="number" min={5} value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
          {errors.price && <p className="errors">{errors.price}</p>}
        <button disabled={!title || !description}  id="update-reward-button" type="submit">Update Reward</button>
      </form>
    </div>
  )
}

export default EditRewardModal;
