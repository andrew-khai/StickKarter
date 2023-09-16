import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CategoryNav from "./components/CategoryNav";
import ProjectShowContainer from "./components/ProjectShowContainer";
import FooterNav from "./components/FooterNav";
import ProjectForm from "./components/ProjectForm";
import CreateProject from "./components/ProjectForm/CreateProject";
import Tester from "./components/TESTER";
import SingleProjectShow from "./components/SingleProjectShow";
import EditProjectForm from "./components/ProjectForm/UpdateProject";
import UserSummary from "./components/UserSummaryPage";
import RewardsPage from "./components/RewardsPage";
import SplashPage from "./components/SplashPage";
import Discover from "./components/Discover";
import CategoryPage from "./components/CategoryPage";
import DiscoverAll from "./components/Discover/DiscoverAll";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>
      <div id="body-container">
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <CategoryNav />
              <div id="main-projects-container">
                <ProjectShowContainer />
              </div>
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/user/summary">
              <UserSummary />
            </Route>
            <Route exact path="/projects/new">
              <CreateProject />
            </Route>
            <Route exact path="/projects/:projectId/edit">
              <EditProjectForm />
            </Route>
            <Route exact path="/projects/:projectId/rewards">
              <RewardsPage />
            </Route>
            <Route exact path="/projects/:projectId">
              <SingleProjectShow />
            </Route>
            <Route exact path="/category/:categoryId">
              <CategoryNav />
              <CategoryPage />
            </Route>
            {/* <Route exact path="/tester">
            <SplashPage />
          </Route> */}
            <Route exact path="/discover/all">
              <DiscoverAll />
            </Route>
            <Route exact path="/discover">
              <Discover />
            </Route>
            <Route>
              <h1> PAGE NOT FOUND </h1>
            </Route>
          </Switch>
        )}
      </div>
      {/* <FooterNav /> */}
    </>
  );
}

export default App;
