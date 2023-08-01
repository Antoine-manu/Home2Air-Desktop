/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import SmallCaptor from '../../Components/SmallCaptor';
import { NavLink } from 'react-router-dom';
import Captor from '../../Components/SmallCaptor';
import Create from '../Sensor/CreateSensor';
import { Dropdown } from 'react-bootstrap';

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [sensorCreate, setSensorCreate] = useState(false);
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');
  const [_default, setDefault] = useState([]);

  useEffect(() => {
    getPlacesList();
  }, []);

  useEffect(() => {
    searchRooms();
  }, [_default, sensorCreate]);

  const searchRooms = async () => {
    const r = await fetchRoute('room/find-by-place', 'post', { place: _default.id }, token);
    setRooms(r);
    return r;
  };

  const getPlacesList = async () => {
    console.log(token);
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
                {places.map((place) =>
                  place.id != _default.id ? (
                    <Dropdown.Item key={place.id} onClick={() => setDefault(place)}>
                      {place.name}
                    </Dropdown.Item>
                  ) : (
                    ''
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Create sensorCreate={setSensorCreate} />
        </div>
        <input className="form-control mt-3" type="text" placeholder="Chercher un capteur" />

        <div>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div className="mt-4 mb-3">
                <span>{room.name}</span>
                <div className="d-flex flex-row align-items-center flex-wrap">
                  {room.Sensor.length > 0 ? (
                    room.Sensor.map((sensor) => (
                      <Captor key={sensor.id} datas={sensor} place={_default} room={room} />
                    ))
                  ) : (
                    <div className="d-flex flex-row justify-content-center mt-3">
                      <span className="text-secondary">Aucun capteur</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex flex-row justify-content-center mt-3">
              <span className="text-secondary">Aucune piece</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
