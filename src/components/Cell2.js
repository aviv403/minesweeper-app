import React, { useState, useEffect } from 'react';
import { borderRadiusStyle } from '../helper';

function Cell2({ row, col, isMine, isRevealed, isGameOver, onCellClick }) {
  const [isFlagged, setIsFlagged] = useState(false);

  useEffect(() => {
    if (isGameOver && isMine) {
      // Handle game over logic here
      console.log('Game Over');
    }
  }, [isGameOver, isMine]);

  function handleCellClick() {
    if (isRevealed || isFlagged || isGameOver) return;

    if (isMine) {
      onCellClick(row, col, true);
    } else {
      onCellClick(row, col, false);
    }
  }

  function toggleFlag() {
    if (!isRevealed && !isGameOver) {
      setIsFlagged(!isFlagged);
    }
  }

  const cellStyles = {
    // Define your inline styles here
    backgroundColor: isRevealed ? 'lightgray' : 'gray',
    color: isMine ? 'red' : 'black',
    textDecoration: isFlagged ? 'line-through' : 'none',
  };

  return (
    <div
      className="cell"
      onClick={handleCellClick}
      onContextMenu={toggleFlag}
      style={{ width: "50px", height: "50px", border: "1px solid black" }}
    >
      {isRevealed ? (isMine ? 'M' : '') : isFlagged ? '🚩' : ''}
    </div>
  );
}

export default Cell2;
