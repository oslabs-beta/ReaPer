import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { render } from 'react-dom';

function RenderEvents(props) {
  const [clickedBarData, setClickedBarData] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Render Events',
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
        data: [],
      },
    ],
  });

  const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
  ];
  const borderColor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
  ];

  // const data = {
  //   labels: ['12:1719.41', '+00:02.19', '+00:01.41', '+00:01.54', '+08:20.14', 'render event 1', 'render event 2', 'render event 3'],
  //   datasets: [
  //     {
  //       label: 'Render Events',
  //       backgroundColor: [
  //         // 'rgba(255, 99, 132, 0.2)',
  //         // 'rgba(255, 159, 64, 0.2)',
  //         // 'rgba(255, 205, 86, 0.2)',
  //         // 'rgba(75, 192, 192, 0.2)',
  //         // 'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 77, 166, 0.2)',
  //         'rgba(51, 204, 51, 0.2)',
  //         'rgba(255, 128, 0, 0.2)',
  //         'rgba(92, 184, 92, 0.2)',
  //       ],
  //       borderColor: [
  //         // 'rgb(255, 99, 132)',
  //         // 'rgb(255, 159, 64)',
  //         // 'rgb(255, 205, 86)',
  //         // 'rgb(75, 192, 192)',
  //         // 'rgb(54, 162, 235)',
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 159, 64)',
  //         'rgb(75, 192, 192)',
  //         'rgb(255, 205, 86)',
  //         'rgb(153, 102, 255)',
  //         'rgb(255, 77, 166)',
  //         'rgb(51, 204, 51)',
  //         'rgb(255, 128, 0)',
  //         'rgb(92, 184, 92)',
  //       ],
  //       borderWidth: 1,
  //       data: [0.3, 0.1, 0.55, 0.6, 0.7, 0.4, 0.2, 0.3, 0.213],
  //     },
  //   ],
  // };

  useEffect(() => {
    console.log('RenderEvents: These are our renderTimes,', props.renderTimes);
    const { renderTimes } = props;
    setChartData(createDataForChart(renderTimes));
  }, [props]);

  const createDataForChart = (renderTimes) => {
    // Create the labels for the length of renderTimes array
    const labels = [];
    const data = {};
    for (let i = 0; i < renderTimes.length; i++) {
      labels.push(`Render Event ${i + 1}`);
    }

    data.labels = labels;
    data.datasets[0].data = renderTimes;

    return data;
  };


  // Hard code colors and cycle through it
  // Only thing that needs to be updated is data
  // labels will just be render event 1, render event 2, ...
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
    onClick: (e, chartElement) => {
      if (chartElement.length > 0) {
        const datasetIndex = chartElement[0].datasetIndex;
        const dataIndex = chartElement[0].index;
        const dataPoint = data.datasets[datasetIndex].data[dataIndex];
        console.log(dataPoint);
        setClickedBarData(dataPoint);
      }
    },
  };

  return (
    <div id='render-events'>
      <p>Render Events and Duration</p>
      <Bar data={chartData} options={options} />
      {/* <Bar /> */}
    </div>
  );
}

export default RenderEvents;
