import React, { useState, useEffect } from 'react';
// import { Chart as ChartJS } from 'chart.js/auto';
// import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import '../styles/style.scss';

function RenderedComponents(props) {
  const [label, setLabel] = useState([]);
  const [renderCount, setRenderCount] = useState([]);
  const [averageRenderDuration, setAverageRenderDuration] = useState([]);

  useEffect(() => {
    const { componentRenderData } = props;
    
    const newLabel = [];
    const newRenderCount = [];
    const newAverageRenderDuration = [];

    // Destructure our componentRenderData into it's part for use in rendering
    for (const [componentName, componentStats] of Object.entries(componentRenderData)) {
      newLabel.push(componentName);
      newRenderCount.push(componentStats.timesRendered);
      newAverageRenderDuration.push(componentStats.avgRenderDuration)
    }

    setLabel(newLabel);
    setRenderCount(newRenderCount);
    setAverageRenderDuration(newAverageRenderDuration);
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
          {label.map((componentName, index) => (
            <tr className='component-table-row' key={componentName}>
              <td className='component-table-data'>{componentName}</td>
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
