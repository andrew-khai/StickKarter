import { Offcanvas } from "react-bootstrap"; // Import necessary Bootstrap components
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import UserBackedProjects from "../ProfileProjects/UserBackedProjects";
import UserCreated from "../ProfileProjects/UserCreated";

const MobileMenu = ({
  user,
  inOrderBackings,
  inOrderProjects,
  handleLogout,
}) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const handleLogoutAndClose = async (e) => {
    e.preventDefault();
    await handleLogout(e); // Call the logout function passed as prop
    handleClose(); // Close the Offcanvas after logging out
  };

  return (
    <>
      <button id="hamburger-button" onClick={handleShow}>
        <GiHamburgerMenu size={20} />
      </button>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="end"
        className="offcanvas-fullscreen"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <div className="mobile-profile-container">
            {!user ? (
              // If no user is logged in, show Login and Sign Up buttons
              <div className="mobile-auth-buttons">
                <NavLink
                  to="/login"
                  onClick={handleClose}
                  className="mobile-login-button"
                >
                  <Button variant="success">Login</Button>
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={handleClose}
                  className="mobile-signup-button"
                >
                  <Button variant="danger">Sign Up</Button>
                </NavLink>
              </div>
            ) : (
              // If user is logged in, display user-specific information
              <>
                <div className="mobile-user-details">
                  <h3>Your Account</h3>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                </div>

                <Accordion alwaysOpen>
                  {/* Backed Projects Accordion */}
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Backed Projects</Accordion.Header>
                    <Accordion.Body>
                      <UserBackedProjects
                        backed={inOrderBackings}
                        closeMenu={handleClose}
                      />
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Created Projects Accordion */}
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Created Projects</Accordion.Header>
                    <Accordion.Body>
                      <UserCreated
                        created={inOrderProjects}
                        closeMenu={handleClose}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="mobile-user-controls">
                  <Button variant="success">
                    <NavLink
                      to="/user/summary"
                      onClick={handleClose}
                      className="mobile-project-summary-link"
                    >
                      View/Edit Projects
                    </NavLink>
                  </Button>
                  <Button variant="danger" onClick={handleLogoutAndClose}>
                    Log Out
                  </Button>
                </div>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileMenu;
