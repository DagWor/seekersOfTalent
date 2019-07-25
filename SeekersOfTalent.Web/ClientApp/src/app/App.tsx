import React from 'react';
import './App.scss';
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
