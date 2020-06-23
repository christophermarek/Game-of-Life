import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [boardSize, setSize] = useState(10);
  const [board, setBoard] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        simulationLoop();
      }, 1000);
    } else if (!started) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started]);

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
  }

  function clickCell(x, y){
    updateBoard(x, y);
  }


  //returns count of neighbours to cell
  function countNeighbours(x,y){
    console.log("############");
    let count = 0;
    //find a more efficient way to iterate

    //col1
    //out of first array bounds
    if(x - 1 >= 0){
      if(y - 1 >= 0){
        count = (board[x-1][y-1].active) ? count + 1 : count;
      }
      count = (board[x-1][y].active) ? count + 1 : count;
      if(y + 1 <= boardSize - 1){
        count = (board[x-1][y+1].active) ? count + 1 : count;
      }
    }
    console.log(count);

    //col2
    if(y - 1 >= 0){
      count = (board[x][y-1].active) ? count + 1 : count;
    }
    if(y + 1 <= boardSize - 1){
      count = (board[x][y+1]) ? count + 1 : count;
    }
    /*
    why is count 2???
    for 0,0 count increments at col 2 and 3 when it should only on 3 at [x+1][y]
    */
    console.log(count);
    //col3
    //check second array bounds
    if(x + 1 <= boardSize - 1){
      if(y - 1 >= 0){
        count = (board[x+1][y-1].active) ? count + 1 : count;
      }
      count = (board[x+1][y].active) ? count + 1 : count;
      if(y + 1 <= boardSize - 1){
        count = (board[x+1][y+1].active) ? count + 1 : count;
      }
    }
    console.log(count);
    if(count === 2){
      console.log(x + " : " + y);
    }
    console.log("--------------")
    return count;
  }


  function parseBoard(){
    let count = 0;
    for(let n = 0; n < boardSize; n++){
      for(let m = 0; m < boardSize; m++){
        count = countNeighbours(board[n][m].x, board[n][m].y);
        updateCell(count, board[n][m].x, board[n][m].y);
      }
    }

  }

  function rule1(){
    //1.Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  }
  function rule2(){
    //2.Any live cell with two or three live neighbours lives on to the next generation.
  }
  
  function rule3(){
    //3.Any live cell with more than three live neighbours dies, as if by overpopulation.
  }
  
  function rule4(){
    //4.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  }
  
  function updateCell(numNeighbours, x, y){
    //console.log(numNeighbours);
    rule1();
    rule2();
    rule3();
    rule4();

  }
  
  function simulationLoop(){
    parseBoard();
  }

  function startStimulation(){
    //check if board generated
    setStarted(true);
  }

  function pauseSimulation(){
    setStarted(false);
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
        <>
          <p>Started</p>
          <button onClick={pauseSimulation}>Pause Simulation</button>
        </>
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
