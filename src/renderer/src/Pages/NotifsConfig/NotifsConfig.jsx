import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import CreateConfig from './CreateConfig';
import EditConfig from './EditConfig';

export default function NotificationsConfig() {
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState([]);
  const [configCreate, setConfigCreate] = useState(false);
  const [configEdit, setConfigEdit] = useState(false);

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

  useEffect(() => {
    getUserConfig();
  }, [configEdit, configCreate]);

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
            <div>
              {config.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.title} | {item.percent} | {item.message} | {item.createdAt}
                    <div>
                      <EditConfig configEdit={setConfigEdit} item={item} />
                    </div>
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
