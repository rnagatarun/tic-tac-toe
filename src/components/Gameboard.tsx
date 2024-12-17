interface GameboardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  board: (string | null)[][];
}

export default function Gameboard({ onSelectSquare, board }: GameboardProps) {
  const gameBoard = board;
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
