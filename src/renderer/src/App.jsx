// import icons from './assets/icons.svg'
import React, { useEffect, useState } from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard';
import Notifications from './Pages/Notifications';
import { library } from "@fortawesome/fontawesome-svg-core";
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import {faWind, faUser, faBell, faTicket, faArrowRightFromBracket, faGear, faSun, faTemperatureQuarter, faPercent, faVolumeHigh, faCloud, faPenToSquare, faTemperatureHalf, faDroplet, faHouse, faXmark, faCheck, faLayerGroup, faShareNodes, faEye, faTrash, faDropletSlash} from "@fortawesome/free-solid-svg-icons";
import Template from './Pages/Template';
import { Line } from 'react-chartjs-2';
import Profil from "./Pages/Profil";
import Spaces from "./Pages/Spaces";
import SingleSensor from "./Pages/Sensor";

library.add(faWind, faUser, faBell, faTicket, faArrowRightFromBracket, faGear, faSun, faTemperatureQuarter, faPercent, faVolumeHigh, faWind, faCloud, faPenToSquare, faTemperatureHalf, faDroplet, faHouse, faXmark, faCheck, faLayerGroup, faShareNodes, faEye, faTrash, faDropletSlash);

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
    {
      path: "/sensor/:id",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <SingleSensor/>
        }
      ]
    },
    {
      path: "/notifications",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <Notifications/>
        }
      ]
    },
    {
      path: "/profil",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <Profil/>
        }
      ]
    },
    {
      path: "/spaces",
      element: <Template/>,
      children:[
        {
          index: true,
          element: <Spaces/>
        }
      ]
    },
  ]);

  //return <React.StrictMode>{!isConnected ? <Login /> : <Home />}</React.StrictMode>;
  return <RouterProvider router={!isConnected ? routerLogin : router}/>;
}

export default App;
