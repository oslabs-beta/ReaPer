import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

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
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // node.renderDurationMS
  const totalRendered = data.datasets[0].data.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const componentData = data.labels.map((label, index) => {
    const renderedCount = data.datasets[0].data[index];
    const averageTimeRendered = Math.floor(Math.random() * 100); // replace with actual data
    return { label, renderedCount, averageTimeRendered };
  });

  return (
    <div id='render-comp'>
      <p>Rendered Components</p>
      {/* <Line data={data} options={options} /> */}
      <table id='component-table'>
        <thead>
          <tr>
            <th className='component-table-header'>Component</th>
            <th className='component-table-header'>Number of Times Rendered</th>
            <th className='component-table-header'>Average Time Rendered</th>
          </tr>
        </thead>
        <tbody>
          {componentData.map(
            ({ label, renderedCount, averageTimeRendered }) => (
              <tr className='component-table-row' key={label}>
                <td className='component-table-data'>{label}</td>
                <td className='component-table-data'>
                  <FontAwesomeIcon
                    icon={faPuzzlePiece}
                    className='puzzle-icon'
                  />
                  {renderedCount}
                </td>
                <td className='component-table-data'>{averageTimeRendered}</td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className='component-table-footer'>Total</td>
            <td className='component-table-footer'>{totalRendered}</td>
            <td className='component-table-footer'>--</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default RenderedComponents;
