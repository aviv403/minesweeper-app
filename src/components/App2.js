import React, { useState } from 'react';
import Board2 from './Board2';

export const numRows = 10;
export const numCols = 10;
export const numMines = 10;

function App2() {
  const [isGameOver, setIsGameOver] = useState(false);

  function handleGameOver() {
    setIsGameOver(true);
  }

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Board2
        numRows={numRows}
        numCols={numCols}
        numMines={numMines}
        isGameOver={isGameOver}
        onGameOver={handleGameOver}
      />
    </div>
  );
}

export default App2;
