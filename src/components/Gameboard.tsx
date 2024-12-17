import { useState } from "react";

interface GameboardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  board: (string | null)[][];
}

export default function Gameboard({ onSelectSquare, board }: GameboardProps) {
  const gameBoard = board;
  // const[gameBoard,setGameBoard]=useState(initialGameboard);

  // function handleSelectSquare(rowIndex: number, colIndex: number) {
  //     setGameBoard((prevGameBoard) => {
  //         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //         return updatedGameBoard;
  //         }
  //     );
  //     onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
