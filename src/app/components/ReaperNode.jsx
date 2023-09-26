import React from 'react';
import { Handle, Position } from 'reactflow';

const ReaperStateProps = (props) => {
  const componentStateArr = [];
  const componentPropsArr = [];

  const setData = (targetArr, propsInfo) => {
    if (propsInfo === null) {
      targetArr.push(<li>null</li>);
    } else if (Object.keys(propsInfo).length === 0) {
      // Empty object
      targetArr.push('none');
    } else {
      for (const [key, val] of Object.entries(propsInfo)) {
        targetArr.push(
          <li>
            {key}
            :
            {' '}
            {JSON.stringify(val)}
          </li>,
        );
      }
    }
  };

  if (props !== undefined && Object.hasOwn(props, 'data')) {
    setData(componentStateArr, props.data.componentState);
    setData(componentPropsArr, props.data.componentProps);
  }

  return (
    <div className="reaperNodeDetails">
      <div className="reaperNodeState">
        <span className="detailsLbl">State: </span>
        <ul className="reaperNodeProps">
          {componentStateArr}
        </ul>
      </div>
      <span className="detailsLbl">Props: </span>
      <ul className="reaperNodeProps">
        {componentPropsArr}
      </ul>
    </div>
  );
};

const ReaperNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="reaperNodeLbl">
        <label htmlFor="text">{data.label}</label>
      </div>
      <ReaperStateProps data={data} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ReaperNode;
