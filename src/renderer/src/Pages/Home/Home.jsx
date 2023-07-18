import { useState, useEffect } from 'react';
import { fetchRoute } from '../../Utils/auth';
import SmallCaptor from '../../Components/SmallCaptor';
import { createBrowserRouter, createHashRouter, RouterProvider, NavLink } from 'react-router-dom';
import Template from '../Template/Template';
import CreateSensor from '../Sensor/CreateSensor';

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
                <h3 key={i}>{place.name}</h3>
                {rooms.map((room, j) => {
                  console.log(room);
                  return (
                    <>
                      <h5 key={j}>{room.name}</h5>
                      {room.Sensor.map((sensor, k) => {
                        console.log('sensor', sensor);
                        return <SmallCaptor key={k} datas={sensor} />;
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
