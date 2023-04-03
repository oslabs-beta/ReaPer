import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function RenderEvents() {
  const data = {
    labels: ['12:1719.41', '+00:02.19', '+00:01.41', '+00:01.54', '+08:20.14'],
    datasets: [
      {
        label: 'Render Events',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
        data: [0.3, 0.1, 0.55, 0.6, 0.7, 0.4],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Render Events and Duration',
      fontSize: 20,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxis: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div id='render-events'>
      <Bar data={data} options={options} />
    </div>
  );
}

export default RenderEvents;
