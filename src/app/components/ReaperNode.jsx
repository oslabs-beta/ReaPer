import React from 'react';
import { Handle, Position } from 'reactflow';

const ReaperStateProps = (props) => {
  let componentStateArr = [];
  const componentPropsArr = [];

  if (props !== undefined && Object.hasOwn(props, 'data')) {
    if (props.data.componentState === null) {
      componentStateArr.push(<li>null</li>);
    } else if (Object.keys(props.data.componentState).length === 0) {
      // componentState is an empty obj
      componentStateArr.push('none');
    } else {
      for (const [key, val] of Object.entries(props.data.componentState)) {
        componentPropsArr.push(
          <li>{key}: {JSON.stringify(val)}</li>
        );
      }
    }

    for (const [key, val] of Object.entries(props.data.componentProps)) {
      componentPropsArr.push(
        <li>{key}: {val.toString()}</li>
      );
    }
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
