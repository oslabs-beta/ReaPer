// import React, {Component} from 'react';
import React, { useState } from 'react';

// Import our child components
import Box from './Box.jsx';

function Board(props) {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState(0);
  // console.log(board, turn);

  // At start fill the state board property with - for all space of the board. Upon
  //  pressing Reset Game button will also call this function and reset the board
  function resetBoard() {
    // Creates a 3x3 board with each having a value of -, denoting that no turn 
    //  has been taken on any of the spaces with a -
    setBoard([
      '-', '-', '-',
      '-', '-', '-',
      '-', '-', '-'
    ]);
  }

  // Whenever this is called it will change the turn from the current player based on turn value
  //  0: player 1 (X)
  //  1: player 2 (O)
  function changeTurn() {
    // Get the current player who just took their turn in prevTurn
    setTurn((prevTurn) => {
      // If it was player 1
      if (prevTurn === 0) {
        // Switch to player 2
        // console.log('its now player 2\'s turn');
        return 1;
      } else {
        // Otherwise switch back to player 1
        // console.log('its now player 1\'s turn');
        return 0;
      }
    });
  }

  function handleClick(event) {
    // console.log(`Clicked on box: ${event.target.id}`);
    // Get our ID directly from the element that's calling this function (button in Box component)
    const currID = event.target.id;
    let content = board[currID];
    // console.log(content);

    // Add the capability to do two players locally and automatically decide what symbol you're placing
    //  based on your order of play. 
    // Check to see if our content is a '-' and if we're player 1
    if (content === '-' && turn === 0) {
      content = 'X';
      changeTurn();
    }
    // Check to see if our content is a '-' and if we're player 2
    else if (content === '-' && turn === 1) {
      content = 'O';
      changeTurn();
    }

    const playerName = turn === 0 ? 'Player 1' : 'Player 2';
    props.sendMsgToBG(`${playerName} just clicked ${content}`);

    setBoard(() => {
      // Create a copy of our array, so that we are not directly mutating state
      const copyArr = board.slice();
      // Modify the arr at the index of currID of the box that was clicked;
      //  so that we can change it's symbol
      copyArr[currID] = content;
      // Set the state of our board with our updated copyArr
      return copyArr;
    });
  }

  React.useEffect(() => {
    // Initialize the board with it's starting values
    if (board.length === 0) {
      resetBoard();
    }
    console.log('Component updated');
  });

  // Create a boxes array for use in the return statement. Will hold an array of
  //  9 Box components which will be used to create our game board.
  const boxes = [];
  for (let i = 0; i <= 8; i++) {
    // console.log(board[i]);
    // Add a Box component into our boxes array
    //  key: Only initialized so the console doesn't constantly scream at us right now
    //  id: Used to identify it's place within the board array in our state. 
    //  content: Used to create the symbol currently displayed within the box on the board
    //  handleClick: Used to pass the handleClick function down the Box component for the button 
    //    onClick action.
    boxes.push(<Box key={i} id={i} content={board[i]} handleClick={handleClick} />);
  }

  return (
    <div className="board">
      <div className="row">
        {boxes.slice(0, 3)}
      </div>
      <div className="row">
        {boxes.slice(3, 6)}
      </div>
      <div className="row">
        {boxes.slice(6)}
      </div>
      <button className='reset-game' onClick={resetBoard}>Reset Game</button>
    </div>
  );
}

export default Board;