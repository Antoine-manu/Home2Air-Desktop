/* eslint-disable prettier/prettier */
import { useState, useContext } from 'react';
import { fetchRoute } from '../../Utils/auth';
import { UserContext } from '../../Context/UserContext';
import Register from '../Register/Register';
import leftImage from '../../assets/img/rendu3D_scene.png';
import logo from '../../assets/img/logo.svg';
import CryptoJS from 'crypto-js';

export default function Login() {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState('Daveloper@test.com');
  const [password, setPassword] = useState('test');
  const [persist, setPersist] = useState(false);
  const [error, setError] = useState(null);

  function _encryptedPassword() {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  }

  const login = async () => {
    try {
      const encryptedPassword = _encryptedPassword(); // Add password encryption
      const response = await fetchRoute('auth/login', 'POST', {
        email,
        password: encryptedPassword // Use the encrypted password
      });
      userContext.setUserId(response.userId);
      userContext.setToken(response.token);
      if (persist) {
        window.api.saveCredentials({ uid: response.userId, token: response.token });
      }
      // location.reload();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login_left">
        <img src={leftImage} alt="" />
      </div>
      <div className="row login_right">
        <img src={logo} alt="" className="logo mt-4" />
        <h1 className="text-center mt-4">Connectez vous</h1>
        <div className="form-group col-10">
          <label htmlFor="login-mail">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="login-mail"
            className="form-control "
            value={email}
            onChange={(text) => {
              setEmail(text.target.value);
            }}
          />
        </div>
        <div className="form-group mt-4 col-10">
          <label htmlFor="login-mail">Mot de passe</label>
          <input
            type="password"
            placeholder="Password"
            id="login-password"
            className="form-control "
            value={password}
            onChange={(text) => {
              setPassword(text.target.value);
            }}
          />
        </div>
        <div className="form-check d-flex flex-row justify-content-center mt-4">
          <input type="checkbox" id="connected" name="connected" className="form-check-input" />
          <label
            htmlFor="connected"
            className="form-check-label ms-2"
            onClick={(value) => {
              setPersist(value.target.value);
            }}
          >
            Rester connecté
          </label>
        </div>
        <div className="form-check d-flex flex-row justify-content-center mt-4">
          <Register />
        </div>
        <button className="btn btn-primary col-4 mt-4" onClick={login} id="login-btn">
          Se connecter
        </button>
      </div>
    </div>
  );
}
