import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function RenderedComponents() {
  const data = {
    labels: [
      'App',
      'Board',
      'Row1',
      'Row2',
      'Row3',
      'Box1',
      'Box2',
      'Box3',
      'Box4',
      'Box5',
      'Box6',
      'Box7',
      'Box8',
      'Box9',
    ],
    datasets: [
      {
        label: 'Rendered Components',
        data: [10, 8, 8, 7, 6, 9, 6, 5, 5, 3, 3, 2, 1, 1],
        fill: false,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Rendered Components Over Time',
      fontSize: 20,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div id='render-comp'>
      <p>Rendered Components</p>
      <Line data={data} options={options} />
    </div>
  );
}

export default RenderedComponents;
