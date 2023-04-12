import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const ComponentsRanked = (props) => {
  // const [rankData, setRankData] = useState({});
  const [rankTimes, setRankTimes] = useState([]);
  const data = {
    labels: ['12:1719.41', '+00:02.19', '+00:01.41', '+00:01.54', '+08:20.14'],
    datasets: [
      {
        label: 'Components Ranked by Render Time',
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
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
          // 'rgb(255, 99, 132)',
          // 'rgb(255, 159, 64)',
          // 'rgb(255, 205, 86)',
          // 'rgb(75, 192, 192)',
          // 'rgb(54, 162, 235)',
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
        data: [0.3, 0.1, 0.55, 0.6, 0.7, 0.4],
        fill: false,
      },
    ],
  };

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
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    // console.log('RenderDurationMS: ', props.renderDurationMS);
    // const { renderDurationMS } = props;
    // for (let i = 0; i < renderEventList.length; i++) {
    //   rankTimes.push(renderEventList[i].renderDurationMS);
    // console.log('RankTimes: ', rankTimes);
    // }
  }, [props]);
  return (
    <div id='comp-ranked'>
      <p>Components Ranked by Render Time</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComponentsRanked;
