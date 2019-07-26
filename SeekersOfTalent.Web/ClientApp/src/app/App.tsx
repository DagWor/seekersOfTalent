import React from 'react';
import './App.scss'
import AppLayout from './layout/app-layout'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './../_setup/store'

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
