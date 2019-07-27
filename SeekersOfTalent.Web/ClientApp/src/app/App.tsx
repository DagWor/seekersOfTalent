import React, { useEffect } from 'react';
import './App.scss'
import AppLayout from './layout/app-layout'
import {BrowserRouter} from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux';
import store from './../_setup/store'
import { checkSession } from '../_setup/actions/auth-actions';

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
         <AppLayout/>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
