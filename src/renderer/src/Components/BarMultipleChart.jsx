import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {fetchRoute} from "../Utils/auth";

const MyLineChart = (props) => {
  const [firstDatas, setFirstDatas] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [secondDatas, setSecondDatas] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [thirdDatas, setThirdDatas] = useState([0, 0, 0, 0, 0, 0, 0]);
  const token = localStorage.getItem('token');

  const fetchProbeDatas = async (address, submit) => {
    const response = await fetchRoute('probe/', 'post', { address: address }, token);
    const array = [];
    if(response != null){
      const datas = Object.entries(response[0])
      datas.map(day => {
        array.push(day[1]);
      })
      submit(array)
    }
  }

  const data = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Source 1',
        data: firstDatas,
        backgroundColor: '#F2B82F',
        borderColor: '#F2B82F',
        borderWidth: 1,
      },
      {
        label: 'Source 2',
        data: secondDatas,
        backgroundColor: '#E54E4E',
        borderColor: '#E54E4E',
        borderWidth: 1,
      },
      {
        label: 'Source 3',
        data: thirdDatas,
        backgroundColor: '#036DDF',
        borderColor: '#036DDF',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const style = {
    select : {
      color : "white",
      width: "30%"
    },
    parent : {
      height: "100%",
    },
    buttons : {
      width: "70%"
    }
  }

  return (
    <div style={style.parent}>
      <div className="ms-4 d-flex flex-row justify-content-between align-items-center">
        <span>Comparatif d'AQI</span>
        <div className="flex-row d-flex" style={style.buttons}>
          <select className="btn btn-warning me-2 col-3" id="firstBar" style={style.select} onChange={(e) => {fetchProbeDatas(e.target.value, setFirstDatas)}}>
            <option disabled selected={true} value={null}>Capteur</option>
            {props.rooms.map(room =>
              <optgroup label={room.name} key={'selectRoom' + room.id}>
                {room.Sensor.map(sensor =>
                  <option key={'selectSensor' + sensor.id} value={sensor.address}>{sensor.name}</option>
                )}
              </optgroup>
            )}
          </select>
          <select className="btn btn-danger me-2 col-3" style={style.select} id="secondBar" onChange={(e) => {fetchProbeDatas(e.target.value, setSecondDatas)}}>
            <option disabled selected={true} value={null}>Capteur</option>
            {props.rooms.map(room =>
              <optgroup label={room.name} key={'selectRoom' + room.id}>
                {room.Sensor.map(sensor =>
                  <option key={'selectSensor' + sensor.id} value={sensor.address}>{sensor.name}</option>
                )}
              </optgroup>
            )}
          </select>
          <select className="btn btn-primary col-3" style={style.select} id="thirdBar" onChange={(e) => {fetchProbeDatas(e.target.value, setThirdDatas)}}>
            <option disabled selected={true} value={null}>Capteur</option>
            {props.rooms.map(room =>
              <optgroup label={room.name} key={'selectRoom' + room.id}>
                {room.Sensor.map(sensor =>
                  <option key={'selectSensor' + sensor.id} value={sensor.address}>{sensor.name}</option>
                )}
              </optgroup>
            )}
          </select>
        </div>
      </div>
      <div className="barChart d-flex flex-column pb-4 p-2">
        <Bar data={data} options={options}/>
      </div>
    </div>
  );
};

export default MyLineChart;
