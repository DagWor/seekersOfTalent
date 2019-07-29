import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from '../../shared/pages/login/login'
import AuthPage from '../../shared/pages/auth-page/auth-page'
import LandingPage from '../../shared/pages/landing/landing'
import Register from '../../shared/pages/register/register'
import ViewProfile from '../../user/pages/view-profile/view-profile'
import BuildProfile from '../../user/pages/build-profile/build-profile'
import RecruiterRegister from '../../recruiter/pages/register/recruiter-register'
import { useSelector } from "react-redux";
import { ApplicationState } from "../../_state_model/application-state";
import NotFound from './../../shared/pages/not-found/not-found'
import { RoleType } from "../../_enum/role-type";

function AppRouter() {

  const appState = useSelector( (state:ApplicationState) => state.auth)

  return (
    <Router>
      <Fragment>
        {
          appState.authenticated &&
          appState.session != null &&
          appState.session.role == RoleType.EMPLOYEE &&
          <Fragment>
            <Route path="/home" component={LandingPage} />
            <Route path="/view-profile/:employeeId" component={ViewProfile} />
            <Route path="/edit-profile" component={BuildProfile} />
            <Redirect  from ={`/`} to={`/view-profile/${appState.session.id}`}/>
          </Fragment>
        }
        {
          appState.authenticated &&          
          appState.session != null &&
          appState.session.role == RoleType.EMPLOYER &&
          <Fragment>
            <Route path="/home" component={LandingPage} />
            <Route path="/view-profile/{employeeId}" component={ViewProfile} />
            <Redirect  from ={`/`} to={`/home`}/>
          </Fragment>
        }
        {
          !appState.authenticated &&
          <Fragment>
            <Route path="/login" exact component={Login} />
            <Route path="/home" component={LandingPage} />
            <Route path="/register" component={Register} />
            <Route path="/view-profile/{employeeId}" component={ViewProfile} />
            <Route path="/auth" component={AuthPage} />
            <Redirect  from ={`/`} to={`/home`}/>
          </Fragment>
        }
      </Fragment>
    </Router>
  );
}

export default AppRouter;