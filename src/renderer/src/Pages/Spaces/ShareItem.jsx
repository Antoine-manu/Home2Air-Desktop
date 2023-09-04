import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

export default function ShareItem(props) {

  const [user, setUser] = useState(props.user);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return(
    <>
      <li className="list-group-item d-flex flex-row justify-content-between align-items-center" style={{cursor : 'pointer'}} onClick={handleShowModal}  key={user.id}>
        <div className="d-flex flex-column">
          <span>{user.first_name} {user.last_name}</span>
          <small>{user.email}</small>
        </div>
        <FontAwesomeIcon  icon="fa-solid fa-share text-light"/>
      </li>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Voulez vous inviter a l'espace {props.space.name} {user.first_name} {user.last_name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Non
          </Button>
          <Button variant="primary" onClick={() => props.submit(user.id)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
