/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import SmallCaptor from '../../Components/SmallCaptor';
import {NavLink } from 'react-router-dom';
import Captor from '../../Components/SmallCaptor'
import Create from '../Sensor/CreateSensor'
import {Button, Dropdown, Modal} from "react-bootstrap";
import Select from "../../Components/Select";

export default function Home() {

  const [places, setPlaces] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sensorCreate, setSensorCreate] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );
  const [_default, setDefault] = useState([]);

  useEffect(() => {
    getPlacesList();
  }, []);

  useEffect(() => {
    searchRooms();
  }, [_default, sensorCreate]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const searchRooms = async () => {
    const r = await fetchRoute('room/find-by-place', 'post', { place: _default.id }, token);
    setRooms(r);
    console.log(r)
    return r;
  };

  const getPlacesList = async () => {
    const placeList = await fetchRoute(
      'place/find-user-place',
      'post',
      {
        user_id: uid
      },
      token
    );
    setPlaces(placeList);
    if (placeList.length > 0) {
      setDefault(placeList[0]);
    }
  };
  return (
    <>
      <div className="home">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <h1 className="mt-1">{_default.name}</h1>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

              <Dropdown.Menu>
                {places.map(place =>
                  place.id != _default.id ?
                    <Dropdown.Item key={place.id} onClick={() => setDefault(place)}>{place.name}</Dropdown.Item>
                    :
                    ""
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Create place={_default} sensorCreate={setSensorCreate}/>
        </div>
        <input className="form-control mt-3" type="text" placeholder="Chercher un capteur"/>

        <div>
          {rooms.length > 0 ?
            rooms.map(room =>
              <div className="mt-4 mb-3" key={room.id}>
                <span>{room.name}</span>
                <div className="d-flex flex-row align-items-center flex-wrap">
                  {
                    room.Sensor.length > 0 ?
                      room.Sensor.map(sensor =>
                        <Captor key={sensor.id} datas={sensor} place={_default} room={room} rooms={rooms}/>
                      )
                      :
                      <div className="d-flex flex-row justify-content-center mt-3">
                        <span className="text-secondary">Aucun capteur</span>
                      </div>
                  }
                </div>
              </div>
            )
            :
            <div className="d-flex flex-row justify-content-center mt-3">
              <span className="text-secondary">Aucune piece</span>
            </div>
          }
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une piece</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="mainWidgetInput" className="form-label">Capteur à afficher</label>
          <Select props={rooms}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
