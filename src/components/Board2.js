import React, { useState, useEffect } from "react";
import Cell2 from "./Cell2";

function Board2({ numRows, numCols, numMines, isGameOver, onGameOver }) {
  const [board, setBoard] = useState([]);
  const [revealedCells, setRevealedCells] = useState(new Set());

  useEffect(() => {
    const newBoard = initializeBoard(numRows, numCols, numMines);
    setBoard(newBoard);
  }, [numRows, numCols, numMines]);

  function initializeBoard(numRows, numCols, numMines) {
    // Initialize an empty board with no mines
    const board = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill({ isMine: false, isRevealed: false }));

    // Place mines randomly on the board
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numCols);
      if (!board[randomRow][randomCol].isMine) {
        board[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }
    }

    return board;
  }

  function revealCell(row, col, isMine) {
    if (isMine) {
      onGameOver();
    } else {
      const newRevealedCells = new Set(revealedCells);
      newRevealedCells.add(`${row}-${col}`);
      setRevealedCells(newRevealedCells);
    }
  }

  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplaateRows: `repeat(${numRows},70px)`,
        gridTemplaateColumns: `repeat(${numCols},70px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell2
            key={colIndex}
            row={rowIndex}
            col={colIndex}
            isMine={cell.isMine}
            isRevealed={revealedCells.has(`${rowIndex}-${colIndex}`)}
            isGameOver={isGameOver}
            onCellClick={revealCell}
          />
        ))
      )}
    </div>
  );
}

export default Board2;
