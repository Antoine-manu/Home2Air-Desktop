import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchRoute } from '../../Utils/auth';
import { NavLink } from 'react-router-dom';
import CreateConfig from '../NotifsConfig/CreateConfig';
import NotificationsConfig from '../NotifsConfig/NotifsConfig';
import { UserContext } from '../../Context/UserContext';

export default function Notifications() {
  const [notificationRecent, setNotificationRecent] = useState([]);
  const [notificationPassed, setNotificationPassed] = useState([]);
  const [configCreate, setConfigCreate] = useState(false);

  const userContext = useContext(UserContext);

  const getNotifConfig = async function () {
    const notif = await fetchRoute('notifications-config/find-one-');
  };

  const getNotifRecent = async () => {
    const notif = await fetchRoute(
      '/notifications/find-recent',
      'post',
      {
        user_id: userContext.userId
      },
      userContext.token
    );
    setNotificationRecent(notif);
  };

  const getNotifPassed = async () => {
    const notif = await fetchRoute(
      '/notifications/find-passed',
      'post',
      {
        user_id: userContext.userId
      },
      userContext.token
    );
    setNotificationPassed(notif);
  };

  useEffect(() => {
    getNotifPassed;
    getNotifRecent;
  }, []);

  return (
    <div>
      <NotificationsConfig userContext={userContext} />
      <Tabs defaultActiveKey="tab1" id="my-tabs">
        <Tab eventKey="tab1" className="text-dark" title="Recentes">
          {notificationRecent.length > 0 ? (
            notificationRecent.map((notif) => (
              <div className="notif">
                <FontAwesomeIcon icon="fa-solid fa-check" className="notif_icon" />
                <span className="notif_message">notif.title</span>
                <a className="notif_close d-flex flex-row justify-content-center">
                  <FontAwesomeIcon className="text-danger" icon="fa-xmark" />
                </a>
              </div>
            ))
          ) : (
            <div className="d-flex flex-row justify-content-center mt-3">
              <span className="text-secondary">Aucune notification récente</span>
            </div>
          )}
        </Tab>
        <Tab eventKey="tab2" className="text-dark" title="Historique">
          {notificationPassed.length > 0 ? (
            notificationPassed.map((notif) => (
              <div className="notif passed">
                <FontAwesomeIcon icon="fa-solid fa-check" className="notif_icon" />
                <span className="notif_message">notif.title</span>
                <a className="notif_close d-flex flex-row justify-content-center">
                  <FontAwesomeIcon className="text-danger" icon="fa-xmark" />
                </a>
              </div>
            ))
          ) : (
            <div className="d-flex flex-row justify-content-center mt-3">
              <span className="text-secondary">Aucune notification dans l'historique</span>
            </div>
          )}
        </Tab>
        <Tab eventKey="tab3" className="text-dark" title="Personnalisés"></Tab>
      </Tabs>
    </div>
  );
}
