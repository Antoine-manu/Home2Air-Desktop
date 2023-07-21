/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchRoute } from '../../Utils/auth';

export default function EditSensor() {
  const location = useLocation();
  const { state } = location;
  const uid = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [room, setRoom] = useState({});
  const [params, setParams] = useState({});
  const [rooms, setRooms] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [select, setSelect] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isDeleted, setIsDeleted] = useState(false);
  // const data = [{ value: 'Celsius' }, { value: 'Fahrenheit' }];

  // console.log('temp : ', isEnabled);
  // const toggleSwitch = () => setIsEnabled((isEnabled) => !isEnabled);

  useEffect(() => {
    findSensorData();
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    const r = await fetchRoute('room/find-all', 'post', {}, token);
    setRooms(r);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const findSensorData = async () => {
    try {
      const { id } = state.datas;
      const response = await fetchRoute('sensor/find-one-by-id', 'post', { id }, token);
      if (response) {
        const parameters = JSON.parse(response.parameters);
        const r = await findMonitoredRoom(response.room_id);
        console.log(parameters)
        setName(response.name);
        setRoom(r);
        setSelect(r);
        setParams(parameters);
        setTemperature(parameters.temperature);
        setIsEnabled(parameters.notifications);
        // setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const updateSensorData = async (key, value) => {
    const parameters = {
      notifications: isEnabled,
      advanced: '',
      temperature: temperature
    };
    for (const param in parameters) {
      if (key == param) {
        parameters[key] = value;
      }
    }
    const inputs = {
      name: name,
      room_id: select.id,
      createdBy: uid,
      parameters: JSON.stringify(parameters),
      updatedAt: getCurrentDate(),
      active: true
    };

    for (const input in inputs) {
      if (key == input) {
        inputs[key] = value.value ? value.value : value;
      }
    }

    const response = await fetchRoute(`sensor/update/${state.datas.id}`, 'post', inputs, token);
  };

  const deleteSensor = async () => {
    const inputs = {
      deleted_at: getCurrentDate(),
      active: false
    };
    const response = await fetchRoute(`sensor/update/${state.datas.id}`, 'post', inputs, token);
    if (response) {
      // navigation.navigate("/");
    }
  };

  const findMonitoredRoom = async (id) => {
    const response = await fetchRoute('room/find-one-by-id/', 'post', { id }, token);
    return response;
  };

  return (
    <div>
      <NavLink to="/">Retour</NavLink>
      <h2>Ajouter un capteur</h2>
      <input
        type="text"
        placeholder="Nom"
        defaultValue={name}
        onKeyUp={(value) => {
          setName(value.target.value);
        }}
      />
      <label htmlFor="pet-select">Choose a pet:</label>
      <select
        name="pets"
        id="pet-select"
        onChange={(event) => {
          setSelect(Number(event.target.value));
        }}
      >
        <option value="">--Please choose an option--</option>
        {rooms.map((r, i) => (
          <option key={i} value={r.id} selected={room.id === r.id}>
            {r.name}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="notifications">Activer les notifications:</label>
        <input
          type="checkbox"
          id="notifications"
          checked={isEnabled ? true : false}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
      </div>
      <select
        name="temperature"
        id="temperature-select"
        onChange={(event) => {
          setTemperature(event.target.value);
        }}
      >
        <option value="">--Please choose an option--</option>
        <option selected={params.temperature === 'Celsius' || temperature && temperature == 'Celsius'} value="Celsius">Celsius</option>
        <option selected={params.temperature === 'Fahrenheit' || temperature && temperature == 'Fahrenheit'} value="Fahrenheit">Fahrenheit</option>
      </select>
      <button onClick={updateSensorData}>Mettre à jour</button>
      <button onClick={deleteSensor}>Supprimer</button>
    </div>
  );
}
