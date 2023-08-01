import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

export default function RoomDelete(props) {

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
          deletedAt: new Date(),
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
      <a className="pointer-event ms-2 text-danger" onClick={handleShowModal}>
        <FontAwesomeIcon icon="fa-solid fa-large fa-trash"/>
      </a>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer la pièce {props.room.name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Non
          </Button>
          <Button variant="danger" onClick={updateRoomData}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
