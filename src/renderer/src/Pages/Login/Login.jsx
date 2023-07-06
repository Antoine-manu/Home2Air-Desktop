/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react';
import { fetchFromStorage, fetchRoute } from '../../Utils/auth';

// const keytar = require('keytar');

export default function Login() {
  const [email, setEmail] = useState('Daveloper@test.com');
  const [password, setPassword] = useState('test');
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);

  const login = async () => {
    try {
      const response = await fetchRoute('auth/login', 'POST', {
        email,
        password
      });
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('token', response.token);
      setConnected(true);
    } catch (error) {
      setError(error.message);
      console.log(error.message)
    }
  };

  return (
    <main>
      <div>
        <input
          type="email"
          placeholder="Email"
          id="login-mail"
          value={email}
          onChange={(text) => {
            setEmail(text.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          id="login-password"
          value={password}
          onChange={(text) => {
            setPassword(text.target.value);
          }}
        />
        <button onClick={login} id="login-btn">
          Se connecter
        </button>
      </div>
    </main>
  );
}
