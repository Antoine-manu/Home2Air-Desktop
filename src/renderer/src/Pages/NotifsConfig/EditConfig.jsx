import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CreateConfig(props) {
  const configEdit = props.editConfig;
  const config = props.item;
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(config.title);
  const [data, setData] = useState(translateDataTypes(config.data));
  const [percent, setPercent] = useState();
  const [message, setMessage] = useState(config.message);
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function translateDataTypesReverse(data) {
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

  function translateDataTypes(data) {
    switch (data) {
      case 'humidity':
        return '0';
        break;
      case 'pressure':
        return '1';
        break;
      case 'temperature':
        return '2';
        break;
      case 'oxidised':
        return '3';
        break;
      case 'reduced':
        return '4';
        break;
      case 'particules0':
        return '5';
        break;
      case 'particules1':
        return '6';
        break;
      case 'particules2':
        return '7';
        break;
      default:
        break;
    }
  }

  const editConfig = async () => {
    const user_id = uid;
    const jsonData = {
      title: title,
      data: translateDataTypesReverse(data),
      user_id: user_id,
      message: message
    };
    console.log('jsonData', jsonData);
    const response = await fetchRoute(
      `notifications-config/update/${config.id}`,
      'POST',
      jsonData,
      token
    );
    if (response) {
      handleCloseModal();
      configEdit(true);
      console.log('succès');
    }
  };

  const deleteConfig = async () => {
    const id = config.id;

    const response = await fetchRoute(`notifications-config/delete`, 'POST', { id: id }, token);
    if (response) {
      console.log('succès');
      configEdit(true);
    }
  };

  return (
    <>
      <div>
        <a
          className="btn btn-outline-primary"
          onClick={() => {
            handleShowModal();
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-edit" />
        </a>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier la configuration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Titre"
              className="form-control"
              onKeyUp={(value) => {
                setTitle(value.target.value);
              }}
              defaultValue={config.title}
            />
            <select
              name="data"
              id="data-select"
              className="form-select mt-4"
              onChange={(value) => {
                setData(value.target.value);
              }}
              defaultValue={data}
            >
              <option value="0">humidité {/* humidity */}</option>
              <option value="1">pression {/* pressure */}</option>
              <option value="2">température {/* temperature */}</option>
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
              defaultValue={message}
              onKeyUp={(value) => {
                setMessage(value.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
            <Button variant="primary" onClick={editConfig}>
              Modifier
            </Button>
            <Button variant="primary" onClick={deleteConfig}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
