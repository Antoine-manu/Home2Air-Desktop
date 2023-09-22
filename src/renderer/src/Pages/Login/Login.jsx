/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { fetchRoute } from '../../Utils/auth';
import leftImage from '../../assets/img/rendu3D_scene.png'
import logo from '../../assets/img/logo.svg'

export default function Login() {
  const [email, setEmail] = useState('lea.dupont@gmail.com');
  const [password, setPassword] = useState('leadupont');
  const [error, setError] = useState(null);

  const login = async () => {
    console.log("here")
    try {
      const response = await fetchRoute('auth/login', 'POST', {
        email,
        password
      });
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('token', response.token);
      location.reload()
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      document.getElementById("login-mail").classList.add("is-invalid")
      document.getElementById("login-password").classList.add("is-invalid")

    }
  };

  return (
    <div className="login">
      <div className="login_left">
        <img src={leftImage} alt=""/>
      </div>
      <div className="row login_right">
        <img src={logo} alt="" className="logo mt-4"/>
        <h1 className="text-center mt-4">Connectez vous</h1>
        <div className="form-group col-10">
          <label htmlFor="login-mail">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="login-mail"
            className="form-control "
            aria-describedby="login-mailFeedback"
            value={email}
            onChange={(text) => {
              setEmail(text.target.value);
            }}
          />
          <div id="login-mailFeedback" className="invalid-feedback mt-2">
            {error}
          </div>
        </div>
        <div className="form-group mt-4 col-10">
          <label htmlFor="login-mail">Mot de passe</label>
          <input
            type="password"
            placeholder="Password"
            id="login-password"
            className="form-control"
            aria-describedby="login-passwordFeedback"
            value={password}
            onChange={(text) => {
              setPassword(text.target.value);
            }}
          />
          <div id="login-passwordFeedback" className="invalid-feedback mt-2">
            {error}
          </div>
        </div>
        <div className="form-check d-flex flex-row justify-content-center mt-4">
          <input type="checkbox" id="connected" name="connected" className="form-check-input"/>
          <label htmlFor="connected" className="form-check-label ms-2">Resté connecté</label>
        </div>
        <button className="btn btn-primary col-4 mt-4" onClick={login} id="login-btn">
          Se connecter
        </button>
      </div>
    </div>
  );
}
