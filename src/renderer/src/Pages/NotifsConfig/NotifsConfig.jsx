import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import CreateConfig from './CreateConfig';
import EditConfig from './EditConfig';

export default function NotificationsConfig() {
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState([]);
  const [configCreate, setConfigCreate] = useState(false);
  const [configEdit, setConfigEdit] = useState(false);
  const [data, setData] = useState('');
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getUserConfig = async () => {
    const response = await fetchRoute(
      'notifications-config/find-user-config',
      'POST',
      { user_id: uid },
      token
    );
    console.log(response);
    setConfig(response);
  };

  function translateDataTypesAlt(data) {
    switch (data) {
      case 'humidity':
        setData('Humidité');
        break;
      case 'pressure':
        setData('Pression');
        break;
      case 'temperature':
        setData('Température');
        break;
      case 'oxidised':
        setData('Oxydant');
        break;
      case 'reduced':
        setData('Réducteur');
        break;
      case 'particules0':
        setData('Particules 1.0PM');
        break;
      case 'particules1':
        setData('Particules 2.5PM');
        break;
      case 'particules2':
        setData('Particules 10PM');
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getUserConfig();
  }, [configEdit, configCreate]);

  useEffect(() => {
    getUserConfig();
    // config.map((item, index) => {
    //   translateDataTypesReverse(item.data);
    // });
  }, []);

  return (
    <>
      <div>
        <a
          className="btn btn-outline-primary"
          onClick={() => {
            handleShowModal();
            getUserConfig();
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </a>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Vos configurations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateConfig configCreate={setConfigCreate} />
            <a onClick={getUserConfig}>
              <FontAwesomeIcon icon="fa-solid fa-rotate-right" />
            </a>

            <div>
              {config.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.title} | {item.percent} | {item.message} |{' '}
                    {translateDataTypesAlt(item.data)} | {item.createdAt}
                    <EditConfig configEdit={setConfigEdit} item={item} />
                  </p>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
