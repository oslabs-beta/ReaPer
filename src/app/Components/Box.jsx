import React, {Component} from 'react';

const Box = (props) => {
    return (
      <button className='box' id={props.id} onClick={props.handleClick}>
        {props.content}
      </button>
    );
  };
  
  export default Box;