/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
// import { StyleSheet } from 'react-native';
import { fetchRoute } from '../../Utils/auth';
import { NavLink } from 'react-router-dom';

export default function CreateSensor() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [notifications, setNotifications] = useState('');
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('userId');
  // const mode = userContext.theme;

  const getAllRooms = async () => {
    // const tk = ;
    const r = await fetchRoute('room/find-all', 'post', {}, token);
    setRooms(r);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const createSensor = async () => {
    const createdBy = `${uid}`;
    // const room_id = room.value;
    const parameters = {
      notifications: notifications,
      advanced: false,
      temperature: temperature
    };
    const jsonData = {
      name: name,
      room_id: room,
      parameters: parameters,
      createdBy: createdBy
    };
    const response = await fetchRoute('sensor/create', 'POST', jsonData, token);
    if (response) {
      // navigation.navigate('Home');
      console.log('succès');
    }
  };

  // const pickerItems = rooms.map((r) => {
  //   return { label: `${r.name}`, value: `${r.id}` };
  // });
  // const styles = StyleSheet.create({
  //   content: {
  //     width: '90%',
  //     alignSelf: 'center',
  //     flex: 1
  //   },
  //   input: {
  //     width: '100%',
  //     margin: 0
  //   },
  //   inputGroup: {
  //     alignItems: 'flex-start',
  //     width: '100%',
  //     marginTop: 24
  //   },
  //   label: {
  //     marginBottom: -10
  //   },
  //   bottom: {
  //     backgroundColor: color[mode].background,
  //     zIndex: 10,
  //     width: '100%',
  //     height: '15%',
  //     marginTop: 'auto',
  //     bottom: 0,
  //     // position: "fixed",
  //     alignItems: 'center',
  //     justifyContent: 'flex-start'
  //   },
  //   btn: {
  //     width: 250,
  //     alignItems: 'center'
  //   },
  //   hidden: {
  //     display: 'none'
  //   }
  // });
  return (
    <div>
      <NavLink to="/">Retour</NavLink>
      <h2>Ajouter un capteur</h2>
      <input
        type="text"
        placeholder="Nom"
        onKeyUp={(value) => {
          setName(value.target.value);
        }}
      />
      <label htmlFor="pet-select">Choose a pet:</label>
      <select
        name="pets"
        id="pet-select"
        onClick={(value) => {
          setRoom(Number(value.target.value));
        }}
      >
        <option value="">--Please choose an option--</option>
        {rooms.map((room, i) => {
          return (
            <option key={i} value={room.id}>
              {room.name}
            </option>
          );
        })}
      </select>
      <div>
        <label htmlFor="notifications">Activer les notifications:</label>
        <input
          type="checkbox"
          id="notifications"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
      </div>
      <select
        name="temperature"
        id="temperature-select"
        onClick={(value) => {
          setTemperature(value.target.value);
        }}
      >
        <option value="">--Please choose an option--</option>
        <option value="celsius">Celsius</option>
        <option value="fahrenheit">Fahrenheit</option>
      </select>
      <button onClick={createSensor}>Valider</button>
    </div>
  );
}
