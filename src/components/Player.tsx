import { useState } from "react";

interface PlayerProps {
  initialName: string;
  symbol: string;
}

function Player({ initialName, symbol }: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
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
    <li>
      <span className="Player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Submit" : "Edit"}</button>
    </li>
  );
}

export default Player;
