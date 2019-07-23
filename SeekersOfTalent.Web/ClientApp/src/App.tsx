import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TalentRegister from './talent/talent-register'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/TRegistration" component={TalentRegister}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
