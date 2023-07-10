import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import Home from './Pages/Home/Home';
import SingleSensor from './Pages/Sensor/SingleSensor';
import CreateSensor from './Pages/Sensor/CreateSensor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={App} />
        <Route path="/SingleSensor" Component={SingleSensor} />
        <Route path="/CreateSensor" Component={CreateSensor} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
