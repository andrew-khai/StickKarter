import { NavLink } from "react-router-dom";
import "./CategoryNav.css"

function CategoryNav() {
  return (
    <div id="category-nav-container">
      <NavLink to="">
        Arts
      </NavLink>
      <NavLink to="">
        Comics & Illustrations
      </NavLink>
      <NavLink to="">
        Design & Tech
      </NavLink>
      <NavLink to="">
        Film
      </NavLink>
      <NavLink to="">
        Food & Crafts
      </NavLink>
      <NavLink to="">
        Games
      </NavLink>
      <NavLink to="">
        Music
      </NavLink>
      <NavLink to="">
        Publishing
      </NavLink>
    </div>
  )
}

export default CategoryNav;
