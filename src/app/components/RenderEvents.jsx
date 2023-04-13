import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { render } from 'react-dom';

function RenderEvents(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Render Events',
        backgroundColor: [
          'rgb(231, 250, 254, 0.5)',
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
      y: {
        beginAtZero: true,
      },
    },
    onClick: (e, chartElement) => {
      if (chartElement.length > 0) {
        const { setFlowDisplayTree, nodesAndEdges, setComponentsRankedDisplay,  componentRenderTimes} = props;
        // Get the index of what bar was clicked on
        const dataIndex = chartElement[0].index;
        // Update the ComponentsRanked chart based on what bar was clicked
        setComponentsRankedDisplay(componentRenderTimes[dataIndex]);
        // Update the flow tree chart to display based on what bar was clicked
        setFlowDisplayTree(nodesAndEdges[dataIndex]);
      }
    },
  };

  useEffect(() => {
    createDataForChart();
  }, [props]);

  const createDataForChart = () => {
    const { renderTimes } = props;

    // Create the labels for the length of renderTimes array
    const labels = [];
    for (let i = 0; i < renderTimes.length; i++) {
      labels.push(`Render Event ${i + 1}`);
    }

    const newChartData = {
      ...chartData,
      labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: renderTimes,
        },
      ],
    };

    setChartData(newChartData);
  };

  return (
    <div id='render-events'>
      <p>Render Events and Duration (ms)</p>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RenderEvents;
