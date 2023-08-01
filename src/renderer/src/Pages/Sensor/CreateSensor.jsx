import React, { useState, useEffect } from 'react';
// import { StyleSheet } from 'react-native';
import { fetchRoute } from '../../Utils/auth';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Select from '../../Components/Select';

export default function CreateSensor(props) {
  const sensorCreate = props.sensorCreate;
  const [name, setName] = useState('');
  const [room, setRoom] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [notifications, setNotifications] = useState('');
  const [reference, setReference] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllRooms = async () => {
    // const tk = ;
    const r = await fetchRoute('room/find-all', 'post', {}, token);
    setRooms(r);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const createSensor = async () => {
    const createdBy = `${uid}`;
    const jsonData = {
      name: name,
      room_id: room,
      reference: reference,
      createdBy: createdBy
    };
    console.log('jsonData', jsonData);
    const response = await fetchRoute('sensor/create', 'POST', jsonData, token);
    if (response) {
      handleCloseModal();
      sensorCreate(true);
      console.log('succès');
    }
  };

  return (
    <div>
      <a className="btn btn-outline-primary" onClick={handleShowModal}>
        Ajouter un nouveau capteur
      </a>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un capteur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nom"
            className="form-control"
            onKeyUp={(value) => {
              setName(value.target.value);
            }}
          />

          <select
            name="room"
            id="room-select"
            className="form-select mt-4"
            onChange={(value) => {
              setRoom(Number(value.target.value));
            }}
          >
            <option value="null" selected disabled>
              Choissiez une piece
            </option>
            {rooms.map((room, i) => {
              return (
                <option key={i} value={room.id}>
                  {room.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Référence"
            className="form-control mt-4"
            onKeyUp={(value) => {
              setReference(value.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={createSensor}>
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
