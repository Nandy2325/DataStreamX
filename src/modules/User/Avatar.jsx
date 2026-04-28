import React, { useState, useEffect } from "react";
import "./Avatar.css";

export default function Avatar({ onClose, onSelect, onNameChange, currentName }) {
  const [style, setStyle] = useState("adventurer");
  const [selected, setSelected] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [name, setName] = useState(currentName || "Nanthini");

  useEffect(() => {
    const saved = localStorage.getItem("selectedAvatar");
    if (saved) setSelected(saved);
  }, []);

  const handleRandomize = () => {
    setIsRolling(true);
    const audio = new Audio("/audio/dice-roll.mp3"); 
    audio.play().catch(() => {});

    setTimeout(() => {
      const randomSeed = Math.random().toString(36).substring(7);
      const src = `https://api.dicebear.com/7.x/${style}/svg?seed=${name}-${randomSeed}`;
      setSelected(src);
      setIsRolling(false);
    }, 2000);
  };

  const handleConfirm = () => {
    if (selected) {
      localStorage.setItem("selectedAvatar", selected);
      onSelect(selected);
      onNameChange(name); // Sends new name to Dashboard
      setTimeout(() => onClose(), 100);
    }
  };

  return (
    <div className="avatar-container">
      <h2 className="avatar-title">🎮 Customize Profile</h2>

      <div className="style-selector">
        <label>Display Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%", padding: "10px", marginTop: "5px",
            background: "#1a1a1a", border: "1px solid #9b5de5",
            color: "#fff", borderRadius: "8px"
          }}
        />
      </div>

      <div className="style-selector" style={{ marginTop: "15px" }}>
        <label>Avatar Style:</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="adventurer">Adventurer</option>
          <option value="pixel-art">Pixel Art</option>
          <option value="bottts">Robots</option>
          <option value="lorelei">Lorelei</option>
          <option value="micah">Micah</option>
          <option value="avataaars">Modern</option>
        </select>
      </div>

      <div className="randomize">
        <button onClick={handleRandomize} disabled={isRolling}>
          🎲 Roll Dice for {name}
        </button>
      </div>

      {isRolling && <div className="dice-animation">🎲 <p>Generating...</p></div>}

      {selected && !isRolling && (
        <div className="avatar-preview">
          <img src={selected} alt="Preview" className="avatar-option selected" />
        </div>
      )}

      <div className="actions">
        <button className="confirm-btn" onClick={handleConfirm} disabled={!selected || isRolling}>✅ Save Changes</button>
        <button className="close-btn" onClick={onClose}>✖ Cancel</button>
      </div>
    </div>
  );
}