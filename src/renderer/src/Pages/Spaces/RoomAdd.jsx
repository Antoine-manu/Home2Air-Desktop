import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchRoute} from "../../Utils/auth";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Select from "../../Components/Select";

export default function RoomAdd(props) {
  const [place_id, setPlaceId] = useState(props.default.id);
  const [name, setName] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const createRoom = async () => {
    if(name !== ""){
      const jsonData = {
        name : name,
        place_id : place_id
      };
      const response = await fetchRoute(
        'room/create',
        'POST',
        jsonData,
        token
      );
      if(response){
        handleCloseModal()
        props.places.map(place => {
          if(place.id == place_id){
            props.submit(place.id)
          }
        })
      }
    }
  };

  return(
    <>
      <button className="btn btn-outline-primary me-2" onClick={handleShowModal}>Ajouter une pièce</button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une piece</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="selectSpace" className="form-label">Selectionnez un espace</label>
          <select name="selectSpace" id="selectSpace" className="form-select mb-3" onChange={(value) => {setPlaceId(parseInt(value.target.value))} }>
            {props.places.map(place =>
              <option value={place.id} key={place.id} selected={place.id == props.default.id ? true : false}>{place.name}</option>
            )}
          </select>
          <label htmlFor="nameRoom" className="form-label">Nom de la pièce</label>
          <input type="text" id="nameRoom" className="form-control" onChange={(value) => {setName(value.target.value);}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={createRoom}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
