import { useHistory } from "react-router-dom"
import "./Discover.css"
import { NavLink } from "react-router-dom"

const Discover = () => {
  const history = useHistory()

  return (
    <>
      <div className="main-discover-page-div">
        <div className="discover-header-div">
          <div className="discover-collections-div">
            <div className="discover-collections-header">
              <h3 className="section-headers">Collections</h3>
              <span
                className="x-close-button"
                onClick={(e) => {
                  e.stopPropagation()
                  history.push("/")
                }}
              ><i class="fa-solid fa-xmark"></i></span>
            </div>
            <div className="category-links-div">
              <NavLink to="/discover/all">
                <h2 className="section-titles">All</h2>
              </NavLink>
            </div>
            <div className="discover-collections-header">
              <h3 className="section-headers">Sections</h3>
            </div>
            <div className="category-links-div">
              <NavLink to="/category/1">
                <h2 className="section-titles">Arts</h2>
              </NavLink>
              <NavLink to="/category/2">
                <h2 className="section-titles">Comics & Illustrations</h2>
              </NavLink>
              <NavLink to="/category/3">
                <h2 className="section-titles">Design & Tech</h2>
              </NavLink>
              <NavLink to="/category/4">
                <h2 className="section-titles">Film</h2>
              </NavLink>
              <NavLink to="/category/5">
                <h2 className="section-titles">Food & Craft</h2>
              </NavLink>
              <NavLink to="/category/6">
                <h2 className="section-titles">Games</h2>
              </NavLink>
              <NavLink to="/category/7">
                <h2 className="section-titles">Music</h2>
              </NavLink>
              <NavLink to="/category/8">
                <h2 className="section-titles">Publishing</h2>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover;
