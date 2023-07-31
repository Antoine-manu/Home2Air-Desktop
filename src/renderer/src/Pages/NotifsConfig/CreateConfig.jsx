import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import { Button, Modal } from 'react-bootstrap';

export default function CreateConfig(props) {
  const configCreate = props.configCreate;
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState();
  const [data, setData] = useState();
  const [percent, setPercent] = useState();
  const [message, setMessage] = useState();
  
  const handleShowModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  function translateDataTypes(data) {
    switch (data) {
      case '0':
        return 'humidity';
        break;
      case '1':
        return 'pressure';
        break;
      case '2':
        return 'temperature';
        break;
      case '3':
        return 'oxidised';
        break;
      case '4':
        return 'reduced';
        break;
      case '5':
        return 'particules0';
        break;
      case '6':
        return 'particules1';
        break;
      case '7':
        return 'particules2';
        break;
      default:
        break;
    }
  }

  const createConfig = async () => {
    const user_id = uid;
    const jsonData = {
      title: title,
      data: translateDataTypes(data),
      user_id: user_id,
      message: message
    };
    console.log('jsonData', jsonData);
    const response = await fetchRoute('notifications-config/create', 'POST', jsonData, token);
    if (response) {
      handleCloseModal();
      configCreate(true);
      console.log('succès');
    }
  };

  return (
    <>
      <div>
        <a className="btn btn-outline-primary" onClick={handleShowModal}>
          Créer une nouvelle configuration
        </a>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Créer un capteur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Titre"
              className="form-control"
              onKeyUp={(value) => {
                setTitle(value.target.value);
              }}
            />
            <select
              name="data"
              id="data-select"
              className="form-select mt-4"
              onChange={(value) => {
                setData(value.target.value);
              }}
            >
              <option value="0">humidité</option> {/* humidity */}
              <option value="1">pression</option> {/* pressure */}
              <option value="2">température</option> {/* temperature */}
              <option value="3">gaz oxydant</option> {/* oxidised */}
              <option value="4">gaz réduit</option> {/* reduced */}
              <option value="5">particules fines 1.0</option> {/* particules0 */}
              <option value="6">particules fines 2.5PM</option> {/*particules1 */}
              <option value="7">particules fines 10PM</option> {/* particules2 */}
            </select>
            <input
              type="text"
              placeholder="Message"
              className="form-control"
              onKeyUp={(value) => {
                setMessage(value.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
            <Button variant="primary" onClick={createConfig}>
              Créer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
