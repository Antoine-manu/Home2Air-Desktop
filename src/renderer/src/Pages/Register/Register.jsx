import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CryptoJS from 'crypto-js';
import { Button, Modal } from 'react-bootstrap';

export default function Register(props) {
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  console.log('react', window.SECRET_KEY);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function encryptedPassword() {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  }

  const registerUser = async () => {
    const jsonData = {
      username: username,
      email: mail,
      first_name: firstName,
      last_name: password,
      role_id: 1,
      active: 1,
      darkMode: 0,
      password: encryptedPassword()
    };
    const response = await fetchRoute('user/create', 'POST', jsonData);
    console.log(response);
  };

  return (
    <>
      <div>
        <a
          className="btn btn-outline-primary"
          onClick={() => {
            handleShowModal();
          }}
        >
          Pas encore de compte ?
        </a>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Vos configurations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                className="form-control"
                id="username"
                onKeyUp={(value) => {
                  setUsername(value.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Nom de famille</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                onKeyUp={(value) => {
                  setLastName(value.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first_name">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                onKeyUp={(value) => {
                  setFirstName(value.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onKeyUp={(value) => {
                  setPassword(value.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Adresse mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onKeyUp={(value) => {
                  setMail(value.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={registerUser}>
                Valider
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
