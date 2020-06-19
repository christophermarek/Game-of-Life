import React, { useState } from 'react';
import './App.css';

function App() {
  const [boardSize, setSize] = useState(10);
  const [board, setBoard] = useState([]);
  const [started, setStarted] = useState(false);

  //generateBoard from boardSize args
  function generateBoard(e){
    e.preventDefault();
    //add form input for size later
    const defaultTile = {
      active:false,
    };
    let newBoard = [];
    
    for(let i = 0; i < boardSize; i++){
      let columns = [];
      for(let j = 0; j < boardSize; j++){
        columns.push(defaultTile);
      }
      newBoard.push(columns);  
    }

    setBoard(board => (newBoard));
  };

  function clickCell(e){
    
  }

  
  let rows = board.map(function (item, i){
    let entry = item.map(function (element, j) {
        return ( 
            <div 
              className="cellContainer" 
              key={j} 
              onClick={clickCell}
              style={{backgroundColor:element.active? "black" : "white"}}
              ></div>
            );
    });
    return (
        <div className="row" key={i}>{entry}</div>
     );
  });

  return (
    <div className="App">
      <form onSubmit={generateBoard} >
        <button type="Submit">Generate</button>
      </form>
      {started ? (
        <p>Not Started</p>
      ) : (
        <p>Started</p>
      )}
      <div className="boardContainer">
        {rows}
      </div>

      
    </div>
  );
}

export default App;
