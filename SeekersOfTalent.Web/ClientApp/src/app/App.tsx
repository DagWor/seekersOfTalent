import React from 'react';
import './App.scss';
import {InputLabel, TextField, Button } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import NewAppBar from '../shared/navbar'
import LandingPage from '../shared/pages/landing/landing'
import Login from '../shared/pages/login/login'
import AppRoutes from '../app/configs/app-router'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  );
}
export default App;
