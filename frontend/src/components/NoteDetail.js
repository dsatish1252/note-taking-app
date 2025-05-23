// client/src/components/NoteDetail.js (Create this new file)

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import noteService from "../api/notes";
import "./NoteDetail.css"; // You'll create this CSS file

function NoteDetail() {
  const { id } = useParams(); // Get the note ID from the URL
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await noteService.getNoteById(id);
        setNote(response.data);
      } catch (err) {
        console.error("Failed to fetch note details:", err);
        setError(err.response?.data?.message || "Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]); // Re-fetch if ID changes

  if (loading) {
    return <div className="note-detail-container">Loading note...</div>;
  }

  if (error) {
    return <div className="note-detail-container error-message">{error}</div>;
  }

  if (!note) {
    return <div className="note-detail-container">Note not found.</div>;
  }

  return (
    <div className="note-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Notes
      </button>
      <h2 className="note-detail-title">{note.title}</h2>
      <p className="note-detail-content">{note.content}</p>
      <p className="note-detail-date">
        Created: {new Date(note.created_at).toLocaleString()}
        {note.updated_at && note.created_at !== note.updated_at && (
          <span> | Updated: {new Date(note.updated_at).toLocaleString()}</span>
        )}
      </p>
      {/* You can add edit/delete actions here as well if needed */}
    </div>
  );
}

export default NoteDetail;
