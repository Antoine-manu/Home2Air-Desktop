import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/main.scss';
import './assets/index.css';
import App from './App';
import Home from './Pages/Home/Home';
import SingleSensor from './Pages/Sensor/SingleSensor';
import CreateSensor from './Pages/Sensor/CreateSensor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Template from "./Pages/Template";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
