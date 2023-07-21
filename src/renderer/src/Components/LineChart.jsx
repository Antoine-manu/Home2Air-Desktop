import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MyLineChart = () => {
  const data = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samemdi', 'Dimanche'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        borderColor: '#036DDF',
        borderWidth: 2,
        borderJoinStyle : 'bevel'
      },
    ],
  };

  const options = {
    scales: {
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

  return (
    <div className="lineChart d-flex flex-row justify-content-center align-items-center pb-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default MyLineChart;
