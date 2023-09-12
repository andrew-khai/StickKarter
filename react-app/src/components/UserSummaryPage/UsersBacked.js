const UserBacked = ({ backings }) => {
  if (!backings) return null;
  return Object.values(backings).map(backing => (
    <li key={backing.id}>
      <div>
        <div>
          {backing.project.title}
        </div>
        <img src={backing.project.projectImage} style={{ width: "70px", height: "50px" }}></img>
        <button>Remove Pledge</button>
      </div>
    </li>
  ))
}

export default UserBacked;
