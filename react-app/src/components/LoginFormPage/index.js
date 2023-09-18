import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom";
import { loadCurrentUserThunk, loadUserBackingsThunk, loadUserProjectsThunk } from "../../store/user";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    // else {
    //   await dispatch(loadCurrentUserThunk(sessionUser.id))
    //   await dispatch(loadUserProjectsThunk())
    //   await dispatch(loadUserBackingsThunk())
    // }
  };

  return (
    <div id="login-form-page-container">
      <form id="login-form-container" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {/* <ul className="errors-list">
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>{error}</li>
          ))}
        </ul> */}
        <div id="login-form">
          <label>
            <input
              className="login-inputs"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </label>
          <label>
            <input
              className="login-inputs"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          {errors.email &&
            <p style={{margin: "0px", textAlign:"center"}} className="errors">{errors.email}</p>
          }
          {!errors.email && errors.password &&
            <p style={{margin: "0px", textAlign:"center"}} className="errors">{errors.password}</p>
          }
          <button className="login-button" type="submit">Log In</button>
          <button className="demo-button" onClick={demoUser}>Demo User</button>
          <p className="signup-message">New to StickKarter? <NavLink exact to="/signup">Sign up</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
