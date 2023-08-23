import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Circular from '../Components/CircularProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from "react-router-dom";
import {fetchRoute} from "../Utils/auth";
import {useEffect, useState} from "react";
import EditSensor from "../Pages/Sensor/EditSensor"

export default function SmallCaptor({ datas, place, room, rooms, submit }) {
  let sensor = []
  const [name, setName] = useState(datas.name);
  const [data, setData] = useState([]);
  const [sensorUpdate, setSensorUpdate] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );
  const fetchProbeDatas = async () => {
    const response = await fetchRoute(
      "probe/",
      "post",
      { address: '192.168.1.1' },
      token
    );
    if(response){
      setData(response)
    }
  }

  function updateSensor() {
    submit(true)
  }

  useEffect(() => {
    fetchProbeDatas();
  }, []);
  useEffect(() => {
    console.log(sensorUpdate)
    if(sensorUpdate != null){
      updateSensor()
    }
  }, [sensorUpdate]);
  return (
    <>
      <div className='captorcard me-4 mt-2'>
        <div className='captorcard__left'>
          {data[0] != null ?
          <Circular percent={Math.round(data[2][2])}/>
            : ''}
        </div>
        <div className='captorcard__right'>
          <div className='captorcard__right__titles'>
            <p className='captorcard__right__titles__title'>{name}</p>
            <EditSensor submit={setSensorUpdate} sensor={datas} place={place.id} rooms={rooms} setName={setName} name={name}/>
          </div>
          <div className='captorcard__right__button'>
            <NavLink to={'/sensor/' + datas.id} props={sensor} className='btn btn-primary'>Voir</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

SmallCaptor.propTypes = {
  datas: PropTypes.object.isRequired
};
