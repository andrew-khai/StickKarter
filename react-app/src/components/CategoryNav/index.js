import { NavLink } from "react-router-dom";
import "./CategoryNav.css"
import useWindowWidth from "../../hooks/windowWidth";

function CategoryNav() {
  const width = useWindowWidth();

  return (
    <div id="category-nav-container">
      <NavLink to="/category/1">
        Arts
      </NavLink>
      <NavLink to="/category/2">
        Comics & Illustrations
      </NavLink>
      <NavLink to="/category/3">
        Design & Tech
      </NavLink>
      <NavLink to="/category/4">
        Film
      </NavLink>
      <NavLink to="/category/5">
        Food & Crafts
      </NavLink>
      <NavLink to="/category/6">
        Games
      </NavLink>
      <NavLink to="/category/7">
        Music
      </NavLink>
      <NavLink to="/category/8">
        Publishing
      </NavLink>
    </div>
  )
}

export default CategoryNav;
