import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

export default function RoomEdit(props) {

  const [name, setName] = useState(props.room.name);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateRoomData = async () => {
    try {
      const response = await fetchRoute(
        `room/update/${props.room.id}`,
        'post',
        {
          name: name,
        },
        token
      );
      if (response) {
        props.submit(props.room.place_id)
        handleCloseModal()
      }
    } catch (error) {
      console.error('erroor ' , error);
    }
  };

  return(
    <>
      <a className="pointer-event" onClick={handleShowModal}>
        <FontAwesomeIcon icon="fa-solid fa-large fa-edit"/>
      </a>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editer une piece</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label" htmlFor="">Nom de la pièce</label>
          <input className="form-control" type="text" value={name} onChange={(value) => (setName(value.target.value))}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={updateRoomData}>
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
