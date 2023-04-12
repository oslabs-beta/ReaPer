import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import createTree from '../test';

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

  function traverse(node, counts, durations) {
    if (!node) {
      return;
    }

    // node.renderDurationMS
    const { componentName, renderDurationMS, children } = node;

    // Update counts and durations for current component
    counts[componentName] = (counts[componentName] || 0) + 1;
    durations[componentName] =
      (durations[componentName] || 0) + renderDurationMS;

    // Recursively traverse children
    if (children && children.length > 0) {
      for (const child of children) {
        traverse(child, counts, durations);
      }
    }
  }

  const counts = {};
  const durations = {};

  traverse(createTree.root, counts, durations);

  // Output componentName, number of occurrences, and average renderDurationMS
  for (const [componentName, count] of Object.entries(counts)) {
    const avgDuration = durations[componentName] / count;
    console.log(
      `${componentName}: ${count} occurrences, average renderDurationMS: ${avgDuration}`
    );
  }

  const componentData = Object.entries(counts).map(([componentName, count]) => {
    const avgDuration = durations[componentName] / count;
    return {
      label: componentName,
      renderedCount: count,
      averageTimeRendered: avgDuration,
    };
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
        {/* <tfoot>
          <tr>
            <td className='component-table-footer'>Total</td>
            <td className='component-table-footer'>--</td>
            <td className='component-table-footer'>--</td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export default RenderedComponents;
