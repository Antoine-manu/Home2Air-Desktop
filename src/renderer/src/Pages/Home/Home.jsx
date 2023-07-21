/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import SmallCaptor from '../../Components/SmallCaptor';
import {NavLink } from 'react-router-dom';

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [uid, setUid] = useState(
    localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
  );
  const [_default, setDefault] = useState([]);

  useEffect(() => {
    getPlacesList();
  }, []);

  const searchRooms = async (place_id) => {
    const r = await fetchRoute('room/find-by-place', 'post', { place: place_id }, token);
    setRooms(r);
    return r;
  };

  const getPlacesList = async () => {
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
      setDefault(places[0]);
      const place_id = placeList[0].id;
      await searchRooms(place_id);
    }
  };

  return (
    <>
      <div>
        <h1>Accueil</h1>
        <div>
          {places.map((place, i) => {
            return (
              <>
                <h2 key={i}>{place.name}</h2>
                {rooms.map((room, j) => {
                  return (
                    <>
                      <h3 key={j}>{room.name}</h3>
                      {room.Sensor.map((sensor, k) => {
                        return <SmallCaptor key={k} datas={{ ...sensor, place, room }} />;
                      })}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
        <NavLink to="/sensor/create">Créer un capteur</NavLink>
      </div>
    </>
  );
}
