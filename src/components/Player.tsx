import { useState } from "react";

interface PlayerProps {
  initialName: string;
  symbol: "X" | "O";
  isActive?: boolean;
  onChangeName: (symbol: "X" | "O", newName: string) => void;
}

function Player({ initialName, symbol, isActive, onChangeName }: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
    
    if(isEditing){
    onChangeName(symbol,playerName);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName: React.ReactElement = (
    <span className="player-name">{playerName}</span>
  );

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        defaultValue={playerName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="Player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Submit" : "Edit"}</button>
    </li>
  );
}

export default Player;
