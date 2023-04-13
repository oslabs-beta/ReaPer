import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import createTree from '../test';

function RenderedComponents(props) {
  console.log('renderedComp Props: ', props);
  const [label, setLabel] = useState([]);
  const [renderCount, setRenderCount] = useState([]);
  const [averageRenderDuration, setAverageRenderDuration] = useState([]);

  // const data = {
  //   label: [
  //     'App',
  //     'MainContainer',
  //     'TotalsDisplay',
  //     'MarketsContainer',
  //     'MarketCreator',
  //     'Market',
  //   ],
  //   datasets: [
  //     {
  //       label: 'Rendered Components',
  //       data: [5, 10, 15, 12, 17, 10],
  //       fill: false,
  //       borderColor: 'rgb(255, 205, 86)',
  //       tension: 0.1,
  //     },
  //   ],
  // };

  // const [componentData, setComponentData] = useState({
  //   label: [],
  //   datasets: [
  //     {
  //       label: 'Rendered Components',
  //       data: [],
  //       fill: false,
  //       borderColor: 'rgb(255, 205, 86)',
  //       tension: 0.1,
  //     },
  //   ],
  // });
  // const options = {
  //   title: {
  //     display: true,
  //     text: 'Rendered Components Over Time',
  //     fontSize: 20,
  //   },
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  // function traverse(node, counts, durations) {
  //   if (!node) {
  //     return;
  //   }

  //   // node.renderDurationMS
  //   const { componentName, renderDurationMS, children } = node;

  //   // Update counts and durations for current component
  //   counts[componentName] = (counts[componentName] || 0) + 1;
  //   durations[componentName] =
  //     (durations[componentName] || 0) + renderDurationMS;

  //   // Recursively traverse children
  //   if (children && children.length > 0) {
  //     for (const child of children) {
  //       traverse(child, counts, durations);
  //     }
  //   }
  // }

  // const counts = {};
  // const durations = {};

  // traverse(createTree.root, counts, durations);

  // // Output componentName, number of occurrences, and average renderDurationMS
  // for (const [componentName, count] of Object.entries(counts)) {
  //   const avgDuration = durations[componentName] / count;
  //   console.log(
  //     `${componentName}: ${count} occurrences, average renderDurationMS: ${avgDuration}`
  //   );
  // }

  // const componentData = Object.entries(counts).map(([componentName, count]) => {
  //   const avgDuration = durations[componentName] / count;
  //   return {
  //     label: componentName,
  //     renderedCount: count,
  //     averageTimeRendered: avgDuration,
  //   };
  // });

  // useEffect(() => {
  //   const data = props.componentRenderData.map(
  //     ([componentName, renderedCount, averageTimeRendered]) => {
  //       return {
  //         label: componentName,
  //         renderedCount,
  //         averageTimeRendered,
  //       };
  //     }
  //   );

  //   setComponentData({
  //     label: data.map((d) => d.label),
  //     datasets: [
  //       {
  //         label: 'Rendered Components',
  //         data: data.map((d) => d.renderedCount),
  //         fill: false,
  //         borderColor: 'rgb(255, 205, 86)',
  //         tension: 0.1,
  //       },
  //     ],
  //   });
  // }, [props.componentRenderData]);

  useEffect(() => {
    const componentRenderData = props.componentRenderData;
    const label = [];
    const renderCount = [];
    const averageTimeRendered = [];

    for (let i = 0; i < componentRenderData.length; i++) {
      const renderDataArray = componentRenderData[i];
      for (let j = 1; j < renderDataArray.length; j++) {
        const renderData = renderDataArray[j];
        label.push(renderData.label);
        renderCount.push(renderData.renderedCount);
        averageTimeRendered.push(renderData.averageTimeRendered);
      }
    }

    // Use the extracted data as needed
    console.log('label: ', label);
    console.log('renderCount: ', renderCount);
    console.log('averageTimeRendered: ', averageTimeRendered);
    setLabel(label);
    setRenderCount(renderCount);
    setAverageRenderDuration(averageTimeRendered);
  }, [props]);
  return (
    <div id='render-comp'>
      <p>Rendered Components</p>
      {/* <Line data={componentData} options={options} /> */}
      <table id='component-table'>
        <thead>
          <tr>
            <th className='component-table-header'>Component</th>
            <th className='component-table-header'>Number of Times Rendered</th>
            <th className='component-table-header'>
              Average Time Rendered in MS
            </th>
          </tr>
        </thead>
        <tbody>
          {label.map((item, index) => (
            <tr className='component-table-row' key={item}>
              <td className='component-table-data'>{item}</td>
              <td className='component-table-data'>
                <FontAwesomeIcon icon={faPuzzlePiece} className='puzzle-icon' />
                {renderCount[index]}
              </td>
              <td className='component-table-data'>
                {averageRenderDuration[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenderedComponents;
