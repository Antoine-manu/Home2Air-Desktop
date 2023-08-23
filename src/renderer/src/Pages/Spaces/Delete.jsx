import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

export default function Edit(props) {

  const [_default, setDefault] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(props.space.name);
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

  useEffect(() => {
    setName(props.space.name);
  }, [props.space]);

  const updateSpaceData = async () => {
    try {
      const response = await fetchRoute(
        `place/update/${props.space.id}`,
        'post',
        {
          deletedAt: new Date(),
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
      <button onClick={handleShowModal} className="btn btn-outline-danger ms-2"><FontAwesomeIcon icon="fa-solid fa-trash"/></button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'espace {props.space.name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="danger" onClick={updateSpaceData}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
