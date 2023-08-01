import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Circular from '../Components/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { fetchRoute } from '../Utils/auth';
import { useState } from 'react';
import EditSensor from '../Pages/Sensor/EditSensor';

export default function SmallCaptor({ datas, place, room }) {
  let sensor = [];
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');

  const fetchProbeDatas = async () => {
    console.log('url', url);
    const response = await fetchRoute('probe/', 'post', { address: url }, token);
  };
  return (
    <>
      <div className="captorcard me-4 mt-2">
        <div className="captorcard__left">{/*<Circular percent={datas.percent}/>*/}</div>
        <div className="captorcard__right">
          <div className="captorcard__right__titles">
            <p className="captorcard__right__titles__title">{datas.name}</p>
            <a className="" data-bs-toggle="modal" data-bs-target={'#edit' + datas.id}>
              <FontAwesomeIcon icon="fa-solid fa-gear" />
            </a>
          </div>
          <div className="captorcard__right__button">
            <NavLink
              to={'/sensor/' + datas.id}
              props={[sensor, place, room]}
              className="btn btn-primary"
            >
              Voir
            </NavLink>
          </div>
        </div>
      </div>
      <EditSensor sensor={datas} />
    </>
  );
}

SmallCaptor.propTypes = {
  datas: PropTypes.object.isRequired
};
