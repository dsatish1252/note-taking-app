import React from "react";
import "./NoteCard.css";

function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        {/* You can add an edit button and logic here */}
        {/* <button onClick={() => onEdit(note.id)}>Edit</button> */}
        <button onClick={() => onDelete(note.id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
