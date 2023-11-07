import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BEE_PROBABILITY,
  BEE_ICON,
  BOARD_SIZE,
  countBees,
  initialBoard,
  cloneBoard,
} from "../helper";
import "../index.css";
import Cell from "./Cell";

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isWinner, setIsWinner] = useState(false);
  const isBeeRevealedRef = useRef(false);

  const resetBoard = () => {
    isBeeRevealedRef.current = false;
    isWinner && setIsWinner(false);

    setBoard((oldBoard) => {
      //Clone Board
      const newBoard = cloneBoard(oldBoard);

      //Set Bees
      for (let i = 0; i < BOARD_SIZE; i++) {
        newBoard[i].forEach((cell) => {
          cell.isBee = Math.random() < BEE_PROBABILITY;
          cell.content = cell.isBee ? BEE_ICON : "";
          cell.revealed && (cell.revealed = false);
          cell.isFlagged && (cell.isFlagged = false);
        });
      }

      //Set Cell Content (cell that does not contain a bee)
      for (let i = 0; i < BOARD_SIZE; i++) {
        newBoard[i].forEach((cell, j) => {
          if (!cell.isBee) {
            cell.content = countBees(newBoard, i, j);
          }
        });
      }
      return newBoard;
    });
  };

  const gameOver = () => {
    setBoard((oldBoard) => {
      //Clone Board
      const newBoard = cloneBoard(oldBoard);

      //Reveal who has not already revealed
      newBoard.forEach((rows) => {
        rows.forEach((cell) => {
          if (!cell.revealed) {
            cell.revealed = true;
          }
        });
      });

      return newBoard;
    });
  };

  const handleRevealClick = useCallback(
    (iCell, jCell, rightClick) => {
      setBoard((oldBoard) => {
        //Clone Board
        const newBoard = cloneBoard(oldBoard);

        if (rightClick) {
          //Right Mouse Click
          const oldFlagged = newBoard[iCell][jCell].isFlagged;
          newBoard[iCell][jCell].isFlagged = !oldFlagged;
        } else {
          //Left Mouse Click
          if (oldBoard[iCell][jCell].isBee) {
            //Checks if cell contain a Bee
            isBeeRevealedRef.current = true;
          }

          newBoard[iCell][jCell].revealed = true;
          newBoard[iCell][jCell].isFlagged = false;

          const content = newBoard[iCell][jCell].content;
          if (!content) {
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (
                  iCell + x >= 0 &&
                  iCell + x < BOARD_SIZE &&
                  jCell + y >= 0 &&
                  jCell + y < BOARD_SIZE &&
                  !(x === 0 && y === 0)
                ) {
                  const cell = newBoard[iCell + x][jCell + y];
                  if (!cell.isBee && !cell.revealed) {
                    handleRevealClick(iCell + x, jCell + y);
                  }
                }
              }
            }
          }
        }
        return newBoard;
      });
    },
    [setBoard]
  );

  const checkWinner = () => {
    return board.every((row) =>
      row.every(
        (cell) =>
          (cell.isBee && !cell.revealed && cell.isFlagged) ||
          (!cell.isBee && cell.revealed)
      )
    );
  };

  useEffect(() => {
    const isBeeRevealed = isBeeRevealedRef.current;
    if (isBeeRevealed) {
      isBeeRevealedRef.current = false;
      gameOver();
    }
  }, [isBeeRevealedRef.current]);

  useEffect(() => {
    resetBoard();
  }, []);

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setIsWinner(true);
    }
  }, [board]);

  return (
    <>
      <div
        className="Board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 70px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 60px)`,
        }}
      >
        {board.map((rows, i) =>
          rows.map((cell, j) => (
            <Cell
              key={`key-${i}-${j}`}
              revealed={cell.revealed}
              handleRevealClick={handleRevealClick}
              i={i}
              j={j}
              isBee={cell.isBee}
              content={cell.content}
              isFlagged={cell.isFlagged}
              isWinner={isWinner}
            />
          ))
        )}
      </div>
      <button onClick={resetBoard}>Restart</button>
    </>
  );
};

export default Board;
