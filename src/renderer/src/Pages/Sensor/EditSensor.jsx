import {Button, Modal} from "react-bootstrap";
import Select from "../../Components/Select";
import React, {useState} from "react";
import { fetchRoute } from '../../Utils/auth';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function EditSensor(props) {
  const sensor = props.sensor;
  const [showModal, setShowModal] = useState(false);
  const [room, setRoom] = useState(sensor.room);
  const [sensorName, setSensorName] = useState(props.name);
  const parameters = JSON.parse(sensor.parameters);
  const [temperature, setTemperature] = useState(parameters.temperature);
  const [notif, setNotif] = useState(parameters.notifications);
  const [advanced, setAdvanced] = useState(parameters.advanced);
  const [rooms, setRooms] = useState(props.rooms);
  const token = localStorage.getItem('token');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  };

  const updateSensorData = async () => {
    const parameters = {
      notifications: notif,
      advanced: advanced,
      temperature: temperature
    };

    const sensorData = {
      name: sensorName,
      room_id: room,
      parameters: JSON.stringify(parameters),
      updatedAt: getCurrentDate(),
      active: true
    };
    const response = await fetchRoute(
      `sensor/update/${sensor.id}`,
      'post',
      sensorData,
      token
    );

    if(response){
      console.log('sensor mis a jour', response)
      props.submit(props.place)
      handleCloseModal()
    }
  };

  return(
    <>
      <a className="" onClick={handleShowModal}><FontAwesomeIcon icon="fa-solid fa-gear"/></a>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le capteur {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="settingsLabel">Informations</span>
          <div className="row">
            <div className="col-12 mt-2 form-group">
              <label htmlFor="name" className="form-label">Nom</label>
              <input type="text" className="form-control" id="name" defaultValue={sensorName} onChange={(e) => {setSensorName(e.target.value);}}/>
            </div>
            <div className="col-12 mt-2 form-group">
              <label htmlFor="room" className="form-label">Pièce</label>
              <select type="email" className="form-select" id="room" onChange={(value) => {setRoom(Number(value.target.value));}} defaultValue={room}>
                {rooms.length > 0 ?
                  rooms.map(room =>
                    <option key={room.id} defaultValue={room.id} selected={room.id == sensor.id ? true : false}>{room.name}</option>
                  ) :
                    <option defaultValue="null" disabled selected >Ajoutez une pièce pour continuer</option>
                }
              </select>
            </div>
          </div>
          <hr className="mt-4"/>
          <span className="mt-3 settingsLabel">Parametres generaux</span>
          <div className="col-12 mt-2 form-group">
            <label htmlFor="degres" className="form-label">Température</label>
            <select type="email" className="form-select" id="degres">
              <option value="celcus">Celcius</option>
              <option value="farenheit">Farenheit</option>
            </select>
          </div>
          <div className="col-12 mt-4 ms-1 form-check">
            <input
              type='checkbox'
              className='form-check-input'
              id='advanced'
              readOnly
              value={advanced}
              onChange={(value) => {setAdvanced(value.target.checked)}}
            />
            <label htmlFor="advanced" className="form-check-label">Paramètres avancés du capteur</label>
          </div>
          <hr className="mt-4"/>
          <span className="mt-3 settingsLabel">Notifications</span>
          <div className="col-12 mt-2 ms-1 form-check">
            <input
              type='checkbox'
              className='form-check-input'
              id='notifications'
              readOnly
            />
            <label htmlFor="notifications" className="form-check-label">Activer les notifications de ce capteur</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={updateSensorData}>
            Mettre a jour
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
