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
      },
    ],
  });

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

    console.log('RenderEvents: Updated chartData: ', chartData);
    return newChartData;
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
    onClick: (e, chartElement) => {
      if (chartElement.length > 0) {
        const { setFlowDisplayTree, nodesAndEdges } = props;
        const dataIndex = chartElement[0].index;

        // TODO: This part does not seem to be working, or at least I can't tell, and wasn't able to get react flow tree chart to display extra information.
        // Update the flow tree chart to display based on what bar was clicked
        setFlowDisplayTree(nodesAndEdges[dataIndex]);
      }
    },
  };

  return (
    <div id='render-events'>
      <p>Render Events and Duration</p>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RenderEvents;
