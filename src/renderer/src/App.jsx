// import icons from './assets/icons.svg'
import React, { useEffect, useState } from 'react';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import Template from "./Pages/Template";
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
      path: "/",
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
