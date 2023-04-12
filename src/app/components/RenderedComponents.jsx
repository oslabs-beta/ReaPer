import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

function RenderedComponents() {
  const data = {
    labels: [
      'App',
      'MainContainer',
      'TotalsDisplay',
      'MarketsContainer',
      'MarketCreator',
      'Market',
    ],
    datasets: [
      {
        label: 'Rendered Components',
        data: [5, 10, 15, 12, 17, 10],
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
