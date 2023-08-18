import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ComponentsRanked = (props) => {
  const [rankTimes, setRankTimes] = useState({
    labels: [],
    datasets: [
      {
        label: 'Components Ranked by Render Time',
        backgroundColor: [
          'rgb(231, 250, 254, 0.8)',
          'rgb(122, 180, 192, 0.5)',
          'rgb(253, 242, 255, 0.5)',
          'rgb(179, 165, 200, 0.5)',
          'rgb(142, 114, 140, 0.5)',
          'rgb(127, 81, 97, 0.5)',
          'rgb(106, 111, 158, 0.5)',
          'rgb(65, 130, 175, 0.5)',
          'rgb(0, 147, 174, 0.5)',
          'rgb(0, 162, 156, 0.5)',
        ],
        borderColor: [
          'rgb(192, 252, 247)',
          'rgb(122, 180, 192)',
          'rgb(253, 242, 255)',
          'rgb(179, 165, 200)',
          'rgb(142, 114, 140)',
          'rgb(127, 81, 97)',
          'rgb(106, 111, 158)',
          'rgb(65, 130, 175)',
          'rgb(0, 147, 174)',
          'rgb(0, 162, 156)',
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
    createDataForChart();
  }, [props]);

  const createDataForChart = () => {
    const { componentsRankedDisplay } = props;
    const labels = [];
    const data = [];

    for (const [componentName, componentRenderTimes] of Object.entries(componentsRankedDisplay)) {
      labels.push(componentName);
      data.push(componentRenderTimes);
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

    setRankTimes(newChartData);
  };

  return (
    <div id='comp-ranked'>
      <p>Components Ranked by Render Time</p>
      <Bar data={rankTimes} options={options} />
    </div>
  );
};

export default ComponentsRanked;
