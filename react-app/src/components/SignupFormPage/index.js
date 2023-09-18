import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, signUp } from "../../store/session";
import './SignupForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const demoUser = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let password = 'password'
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleSubmit = async (e) => {
    const errorsObj = {}
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      errorsObj.password = 'Confirm Password field must be the same as the Password field';
      setErrors(errorsObj)
    }
  };

  return (
    <div id="signup-form-page-container">
      <form id="signup-form-container" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* <ul className="errors-list">
          {errors.map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
        </ul> */}
        <div id="signup-form">
          <label>
            <input
              className="signup-inputs"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </label>
          {errors.email &&
          <p style={{margin: "0px", textAlign:"center"}} className="errors">{errors.email}</p>
          }
          <label>
            <input
              className="signup-inputs"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </label>
          {errors.username &&
          <p style={{margin: "0px", textAlign:"center"}} className="errors">{errors.username}</p>
          }
          <label>
            <input
              className="signup-inputs"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          <label>
            <input
              className="signup-inputs"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
          </label>
          {errors.password &&
          <p style={{margin: "0px", textAlign:"center", textWrap: "balance"}} className="errors">{errors.password}</p>
          }
          <button className="signup-button" type="submit">Sign Up</button>
          <button className="demo-button" onClick={demoUser}>Demo User</button>
          <p className="signup-message">Have an account already? <NavLink exact to="/login">Login</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
