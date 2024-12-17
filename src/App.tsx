import { useState } from "react";
import "./App.css";
import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const initialGameboard: (null | "X" | "O")[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: { square: { row: number; col: number }; player: "X" | "O" }[]) {
  let currentPlayer: "X" | "O" = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard: (null | "X" | "O")[][],players:{X:string,O:string}) {
  let winner: string | undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
      break;
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns: { square: { row: number; col: number }; player: "X" | "O" }[]) {
  let gameBoard = [...initialGameboard.map(array => [...array])]; // deep copy of initialGameboard

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}


function App() {
  const [gameTurns, setGameTurns] = useState<{ square: { row: number; col: number }; player: "X" | "O" }[]>([]);
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: "X" | "O", newName: string) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = {
        ...prevPlayers,
        [symbol]: newName,
      };
      return updatedPlayers;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <Gameboard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
