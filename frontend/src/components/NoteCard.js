// client/src/components/NoteCard.js

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NoteCard.css";

function NoteCard({ note, onDelete, onEdit }) {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleCardClick = () => {
    // Navigate to a new route for the note detail
    // e.g., /notes/123 for note with ID 123
    navigate(`/notes/${note.id}`);
  };

  return (
    // Make the entire card clickable
    <div className="note-card" onClick={handleCardClick}>
      <h3>{note.title}</h3>
      {/* The content will be truncated by CSS, but available fully on click */}
      <p>{note.content}</p>
      <div className="note-actions">
        {/* If you want to keep the edit button, ensure its click handler stops propagation */}
        {/* <button onClick={(e) => { e.stopPropagation(); onEdit(note.id); }}>Edit</button> */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card's click handler from firing
            onDelete(note.id);
          }}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
