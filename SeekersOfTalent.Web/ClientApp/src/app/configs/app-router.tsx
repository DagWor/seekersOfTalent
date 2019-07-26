import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../../shared/pages/login/login'
import AuthPage from '../../shared/pages/auth-page/auth-page'
import LandingPage from '../../shared/pages/landing/landing'
import Register from '../../shared/pages/register/register'
import ViewProfile from '../../user/pages/view-profile/view-profile'
import BuildProfile from '../../user/pages/build-profile/build-profile'
import RecruiterRegister from '../../recruiter/pages/register/recruiter-register'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/recruiter-register" component={RecruiterRegister} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/view-profile" component={ViewProfile} />
        <Route path="/build-profile" component={BuildProfile} />
      </div>
    </Router>
  );
}

export default AppRouter;