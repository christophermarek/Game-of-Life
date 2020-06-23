import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [boardSize, setSize] = useState(10);
  const [board, setBoard] = useState([]);
  const [started, setStarted] = useState(false);

  //generateBoard from boardSize args
  function generateBoard(e){
    e.preventDefault();
    //add form input for size later
    
    let newBoard = [];
    
    for(let i = 0; i < boardSize; i++){
      let columns = [];
      for(let j = 0; j < boardSize; j++){
        let defaultTile = {
          active:false,
          x: i,
          y: j,
        };
        columns.push(defaultTile);
      }
      newBoard.push(columns);  
    }

    setBoard(board => (newBoard));
  };

  function updateBoard(x, y){
    let newBoard = [...board];
    newBoard[x][y].active = !newBoard[x][y].active;
    setBoard(board => (newBoard));
    console.log(board);
  }

  function clickCell(x, y){
    updateBoard(x, y);
  }

  function startStimulation(){
    //check if board generated
    setStarted(true);
  }
  

  return (
    <div className="App">
      <form onSubmit={generateBoard} >
        <button type="Submit">Generate</button>
      </form>
      {!started ? (
        <>
          <p>Not Started</p>
          <button onClick={startStimulation}>Start Simulation</button>
        </>
      ) : (
        <p>Started</p>
      )}
      <div className="boardContainer">
        {board.map(function (item, i){
          let entry = item.map(function (element, j) {
              return ( 
                  <div 
                    className="cellContainer" 
                    key={j}
                    onClick={() => clickCell(element.x, element.y)}
                    style={{backgroundColor:element.active? "black" : "white"}}
                    ></div>
                  );
          });
          return (
              <div className="row" key={i}>{entry}</div>
          );
        })}
      </div>

      
    </div>
  );
}

export default App;
