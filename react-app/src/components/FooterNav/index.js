import { NavLink } from "react-router-dom"
import "./FooterNav.css"

function FooterNav() {
  return (
    <div id="footer-nav-container">
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

export default FooterNav;
