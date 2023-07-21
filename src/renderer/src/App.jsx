// import icons from './assets/icons.svg'
import { useEffect, useState } from 'react';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Template from './Pages/Template';
import CreateSensor from './Pages/Sensor/CreateSensor';
import SingleSensor from './Pages/Sensor/SingleSensor';
import EditSensor from './Pages/Sensor/EditSensor';
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
      path: '/',
      element: <Login />
    }
  ]);

  const router = createHashRouter([
    {
      path: '/',
      element: <Template />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: '/sensor/create',
      element: <Template />,
      children: [
        {
          index: true,
          element: <CreateSensor />
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
      path: '/sensor/edit/:id',
      element: <Template />,
      children: [
        {
          index: true,
          element: <EditSensor />
        }
      ]
    }
  ]);

  //return <React.StrictMode>{!isConnected ? <Login /> : <Home />}</React.StrictMode>;
  return <RouterProvider router={!isConnected ? routerLogin : router} />;
}

export default App;
