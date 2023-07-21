import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const MyLineChart = () => {
  const data = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Source 1',
        data: [50, 60, 70, 55, 80, 75, 65],
        backgroundColor: '#F2B82F',
        borderColor: '#F2B82F',
        borderWidth: 1,
      },
      {
        label: 'Source 2',
        data: [65, 70, 75, 80, 85, 90, 95],
        backgroundColor: '#E54E4E',
        borderColor: '#E54E4E',
        borderWidth: 1,
      },
      {
        label: 'Source 3',
        data: [70, 75, 80, 85, 80, 70, 65],
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
      width: "60%"
    }
  }

  return (
    <div style={style.parent}>
      <div className="ms-4 d-flex flex-row justify-content-between align-items-center">
        <span>Comparatif d'AQI</span>
        <div className="flex-row d-flex" style={style.buttons}>
          <select className="btn btn-warning me-2 col-3" style={style.select} name="firstBar" id="firstBar">
            <option value="">Maison</option>
          </select>
          <select className="btn btn-danger me-2 col-3" style={style.select} name="secondBar" id="secondBar">
            <option value="">Chambre</option>
          </select>
          <select className="btn btn-primary col-3" name="thirdBar" id="thirdBar">
            <option value="">Salon</option>
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
