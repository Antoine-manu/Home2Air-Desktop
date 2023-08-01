import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

export default function Create(props) {

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addSpace = async () => {
    try {
      const response = await fetchRoute(
        `place/create`,
        'post',
        {
          name: name,
          createdBy: uid,
        },
        token
      );
      if (response) {
        props.submit()
        handleCloseModal()
      }
    } catch (error) {
      console.error('erroor ' , error);
    }
  };

  return(
    <>
      <button onClick={handleShowModal} className="btn btn-outline-primary">Ajouter un nouvel espace</button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un espace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label" htmlFor="">Nom de la l'espace</label>
          <input className="form-control" type="text" onChange={(value) => (setName(value.target.value))}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Retour
          </Button>
          <Button variant="primary" onClick={addSpace}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
