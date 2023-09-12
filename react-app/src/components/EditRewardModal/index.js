import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteRewardThunk } from "../../store/reward";
import { useState } from "react";

function EditRewardModal({ reward, onUpdate }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState(reward?.title)
  const [description, setDescription] = useState(reward?.description)
  const [price, setPrice] = useState(reward?.price)

  const sessionUser = useSelector((state) => state.session.user);
  console.log('reward here -----', reward)

  const handleSubmit = (e) => {
    e.preventDefault()
   let updatedReward = {
    project_id: reward.projectId,
    title,
    description,
    price
   }

    onUpdate(updatedReward, reward.id)

    closeModal()
  }

  return (
    <div id="confirm-delete-container">
      <h2>Edit Reward</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Reward Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Reward Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button type="submit">Update Reward</button>
      </form>
    </div>
  )
}

export default EditRewardModal;
