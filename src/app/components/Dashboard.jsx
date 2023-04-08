import React from 'react';

import ComponentTree from './ComponentTree';
import RenderEvents from './RenderEvents';
import ComponentsRanked from './ComponentsRanked';
import RenderedComponents from './RenderedComponents';

function Dashboard(props) {
  // console.log('Dashboard.jsx, reaperSessionObj: ', props.reaperSessionObj);
  return (
    <div id='content'>
      <div className='row'>
        <div className='column'>
          <div className='graph'>
            <RenderEvents />
          </div>
        </div>
        <div className='column'>
          <div className='graph'>
            <RenderedComponents />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          <div className='graph'>
            <ComponentsRanked />
          </div>
        </div>
        <div className='column'>
          <div className='graph'>
            <ComponentTree />
          </div>
        </div>
      </div>
    </div>
  );
}

// Maybe use state to determine whether or not we have a total of > 1 event
// Create tree in this file
// Then distribute to it's sub portions make up the whole! 
export default Dashboard;
