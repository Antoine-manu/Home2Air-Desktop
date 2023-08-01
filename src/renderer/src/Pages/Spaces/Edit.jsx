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
          name: name,
        },
        token
      );
      if (response) {
        props.submit(props.place)
        handleCloseModal()
      }
    } catch (error) {
      console.error('erroor ' , error);
    }
  };

  return(
    <>
      <button onClick={handleShowModal} className="btn btn-outline-primary">Modifier l'espace</button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editer l'espace {props.space.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label" htmlFor="">Nom de la l'espace</label>
          <input className="form-control" type="text" value={name} onChange={(value) => (setName(value.target.value))}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={updateSpaceData}>
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
