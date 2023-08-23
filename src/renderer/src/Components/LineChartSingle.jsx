import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MyLineChart = ({data}) => {
  let label = [];
  let values = [];
  const entries = Object.entries(data);
  entries.map((item, index) => (
      label.push(item[0]),
      values.push(item[1])
    ))
  const dataChart = {
    labels: label,
    datasets: [
      {
        data: values,
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
      <Line data={dataChart} options={options} />
  );
};

export default MyLineChart;
