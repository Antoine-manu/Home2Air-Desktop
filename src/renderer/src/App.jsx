// import icons from './assets/icons.svg'
import React, { useEffect, useState, useContext } from 'react';
// import keytar from 'keytar';
import Login from './Pages/Login';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard';
import Notifications from './Pages/Notifications';
import { library } from '@fortawesome/fontawesome-svg-core';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import {
  faWind,
  faUser,
  faBell,
  faTicket,
  faArrowRightFromBracket,
  faGear,
  faSun,
  faTemperatureQuarter,
  faPercent,
  faVolumeHigh,
  faCloud,
  faPenToSquare,
  faTemperatureHalf,
  faDroplet,
  faHouse,
  faXmark,
  faCheck,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons';
import Template from './Pages/Template';
import { Line } from 'react-chartjs-2';
import Profil from './Pages/Profil';
import SingleSensor from './Pages/Sensor';
import NotificationsConfig from './Pages/NotifsConfig';
import { UserContext, UserProvider } from './Context/UserContext';

library.add(
  faWind,
  faUser,
  faBell,
  faTicket,
  faArrowRightFromBracket,
  faGear,
  faSun,
  faTemperatureQuarter,
  faPercent,
  faVolumeHigh,
  faWind,
  faCloud,
  faPenToSquare,
  faTemperatureHalf,
  faDroplet,
  faHouse,
  faXmark,
  faCheck,
  faRotateRight
);

function App() {
  const userContext = useContext(UserContext);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState(userContext.token);
  const [uid, setUid] = useState(userContext.uid);
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  
  const checkIfLoggedIn = () => {
    const token = keytar.getPassword('token', 'token');
    if (token) {
      setIsConnected(true);
    }
  };

  const routerLogin = createHashRouter([
    {
      path: '/',
      element: <Login />
    }
  ]);

  const router = createHashRouter([
    {
      path: '/home',
      element: <Template />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: '/',
      element: <Template />,
      children: [
        {
          index: true,
          element: <Dashboard />
        }
      ]
    },
    {
      path: '/sensors',
      element: <Template />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: '/sensor/:id',
      element: <Template />,
      children: [
        {
          index: true,
          element: <SingleSensor />
        }
      ]
    },
    {
      path: '/notifications',
      element: <Template />,
      children: [
        {
          index: true,
          element: <Notifications />
        }
      ]
    },
    {
      path: '/notifications/config',
      element: <Template />,
      children: [
        {
          index: true,
          element: <NotificationsConfig />
        }
      ]
    },
    {
      path: '/profil',
      element: <Template />,
      children: [
        {
          index: true,
          element: <Profil />
        }
      ]
    }
  ]);

  //return <React.StrictMode>{!isConnected ? <Login /> : <Home />}</React.StrictMode>;

  return (
    <UserProvider>
      <RouterProvider router={!isConnected ? routerLogin : router} />;
    </UserProvider>
  );
}

export default App;
