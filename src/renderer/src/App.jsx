// import icons from './assets/icons.svg'
import React, { useEffect, useState } from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard';
import { library } from "@fortawesome/fontawesome-svg-core";
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import {faWind, faUser, faBell, faTicket, faArrowRightFromBracket, faGear, faSun, faTemperatureQuarter, faPercent, faVolumeHigh, faCloud, faPenToSquare, faTemperatureHalf, faDroplet, faHouse} from "@fortawesome/free-solid-svg-icons";
import Template from './Pages/Template';
import { Line } from 'react-chartjs-2';

library.add(faWind, faUser, faBell, faTicket, faArrowRightFromBracket, faGear, faSun, faTemperatureQuarter, faPercent, faVolumeHigh, faWind, faCloud, faPenToSquare, faTemperatureHalf, faDroplet, faHouse);

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsConnected(true);
    }
  };


  const routerLogin = createHashRouter([
    {
      path: "/",
      element: <Login/>,
    },
  ]);

  const router = createHashRouter([
    {
      path: "/home",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <Home/>
        }
      ]
    },
    {
      path: "/",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <Dashboard/>
        }
      ]
    },
    {
      path: "/sensors",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <Home/>
        }
      ]
    },
  ]);

  //return <React.StrictMode>{!isConnected ? <Login /> : <Home />}</React.StrictMode>;
  return <RouterProvider router={!isConnected ? routerLogin : router}/>;
}

export default App;
