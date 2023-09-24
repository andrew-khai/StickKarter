import "./LoadingModal.css"

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-spinner">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p style={{color: "white", fontSize:"1.3rem", textAlign: "center"}}>Setting up your project!</p>
      </div>
    </div>
  )
}

export default LoadingModal;
