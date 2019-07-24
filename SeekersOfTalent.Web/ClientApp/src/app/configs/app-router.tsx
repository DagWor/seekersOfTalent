import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from '../../shared/pages/login/login'
import LandingPage from '../../shared/pages/landing/landing'
import Register from '../../shared/pages/register/register'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/login" exact component={Login} />
        <Route path="/register/" component={Register} />
        <Route path="/landing/" component={LandingPage} />
      </div>
    </Router>
  );
}

export default AppRouter;