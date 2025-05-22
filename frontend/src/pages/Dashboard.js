import React, { useState, useEffect } from "react";
import noteService from "../api/notes";
import NoteCard from "../components/NoteCard";
import "./Dashboard.css";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await noteService.getNotes();
      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notes");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await noteService.createNote(
        newNoteTitle,
        newNoteContent
      );
      setNotes([response.data, ...notes]); // Add new note to the beginning
      setNewNoteTitle("");
      setNewNoteContent("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
      console.error("Error creating note:", err);
    }
  };

  const handleDeleteNote = async (id) => {
    setError("");
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note");
      console.error("Error deleting note:", err);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading notes...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Your Notes</h1>

      <form onSubmit={handleCreateNote} className="new-note-form">
        <h3>Create New Note</h3>
        <div className="form-group">
          <label htmlFor="newNoteTitle">Title:</label>
          <input
            type="text"
            id="newNoteTitle"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newNoteContent">Content:</label>
          <textarea
            id="newNoteContent"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>You don't have any notes yet. Create one above!</p>
        ) : (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
