import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [push, setPush] = useState('');

  const setUserValues = (id, token, push) => {
    setUserId(id);
    setToken(token);
    setPush(push);
  };
  const clearUserValues = () => {
    setUserId('');
    setToken('');
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken, setUserValues }}>
      {children}
    </UserContext.Provider>
  );
};
