import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const ComponentsRanked = (props) => {
  const [rankTimes, setRankTimes] = useState({
    labels: [],
    datasets: [
      {
        label: 'Components Ranked by Render Time',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 77, 166, 0.2)',
          'rgba(51, 204, 51, 0.2)',
          'rgba(255, 128, 0, 0.2)',
          'rgba(92, 184, 92, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(153, 102, 255)',
          'rgb(255, 77, 166)',
          'rgb(51, 204, 51)',
          'rgb(255, 128, 0)',
          'rgb(92, 184, 92)',
        ],
        borderWidth: 1,
        data: [],
        fill: false,
      },
    ],
  });

  const options = {
    indexAxis: 'y',
    title: {
      display: true,
      text: 'Components Ranked by Render Time',
      fontSize: 20,
    },
    legend: {
      display: false,
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const { componentsRankedDisplay } = props;
    setRankTimes(createDataForChart(componentsRankedDisplay));
  }, [props]);

  const createDataForChart = (renderTimes) => {
    const labels = [];
    const data = [];
    // console.log('ComponentsRanked: renderTimes ', renderTimes);

    for (const [componentName, renderTime] of Object.entries(renderTimes)) {
      labels.push(componentName);
      data.push(renderTime);
    }

    const newChartData = {
      ...rankTimes,
      labels,
      datasets: [
        {
          ...rankTimes.datasets[0],
          data,
        },
      ],
    };

    // console.log('ComponentsRanked: newChartData ', newChartData);
    return newChartData;
  };

  return (
    <div id='comp-ranked'>
      <p>Components Ranked by Render Time</p>
      <Bar data={rankTimes} options={options} />
    </div>
  );
};

export default ComponentsRanked;
