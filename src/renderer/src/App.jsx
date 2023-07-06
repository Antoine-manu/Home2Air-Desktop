// import icons from './assets/icons.svg'
import React, { useEffect, useState } from 'react';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
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

  ```git remote add origin https://github.com/Antoine-manu/Home2Air-Desktop.git
git branch -M main
git push -u origin main`````;
  
  return <React.StrictMode>{!isConnected ? <Login /> : <Home />}</React.StrictMode>;
}

export default App;
