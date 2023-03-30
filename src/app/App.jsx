import React from 'react';
import MainNav from './components/MainNav';
import ComponentTree from './components/ComponentTree.jsx';
import RenderEvents from './components/RenderEvents';

function App() {
  return (
    <div id='container'>
      <MainNav />
      <div className='render-events'>Rendered Events and Duration</div>
      <div className='render-comp'>Rendered Components</div>
      <div className='comp-ranked'>Components Ranked by Render Time</div>
      <ComponentTree />
    </div>
    // <RenderEvents />
  );
}

export default App;
