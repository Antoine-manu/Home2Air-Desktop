import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchRoute} from "../../Utils/auth";

export default function Notifications() {
  const [notificationRecent, setNotificationRecent] = useState([]);
  const [notificationPassed, setNotificationPassed] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );

  const getNotifRecent = async () => {
    const notif = await fetchRoute(
      "notifications/find-recent",
      "post",
      {
        user_id: uid,
      },
      token
    );
    setNotificationRecent(notif)
  };

  const getNotifPassed = async () => {
    const notif = await fetchRoute(
      "notifications/find-passed",
      "post",
      {
        user_id: uid
      },
      token
    );
    setNotificationPassed(notif);
  };

  const updateNotifData = async (id) => {
    try {
      const response = await fetchRoute(
        `notifications/update/${id}`,
        'post',
        {
          read: true,
        },
        token
      );
      if (response) {
        getNotifRecent()
        getNotifPassed()
      }
    } catch (error) {
      console.error('erroor ' , error);
    }
  };

  useEffect(() => {
    getNotifRecent()
    getNotifPassed()
  }, [])

  useEffect(() => {
    console.log('here' + notificationRecent)
  }, [notificationRecent])

    return(
      <div>
        <Tabs defaultActiveKey="tab1" id="my-tabs">
          <Tab eventKey="tab1" className="text-dark" title="Recentes">
            {notificationRecent.length>0 ?
              notificationRecent.map(notif =>
                <div key={notif.id} className="notif">
                  <span className="notif_message ms-3">{notif.title}</span>
                  <a className="notif_close d-flex flex-row justify-content-center" onClick={() => updateNotifData(notif.id)}><FontAwesomeIcon className="text-danger" icon="fa-xmark"/></a>
                </div>
              )
              :
              <div className="d-flex flex-row justify-content-center mt-3">
                <span className="text-secondary">Aucune notification récente</span>
              </div>
            }

          </Tab>
          <Tab eventKey="tab2" className="text-dark" title="Historique">
            {notificationPassed.length>0 ?
              notificationPassed.map(notif =>
                <div key={notif.id} className="notif passed">
                  <span className="notif_message ms-3">{notif.title}</span>
                </div>
              )
              :
              <div className="d-flex flex-row justify-content-center mt-3">
                <span className="text-secondary">Aucune notification dans l'historique</span>
              </div>
            }
          </Tab>
          <Tab eventKey="tab3" className="text-dark" title="Personnalisés">
            <div className="d-flex flex-row justify-content-center mt-3">
              <span className="text-secondary">Aucune notification personnalisés</span>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
}
