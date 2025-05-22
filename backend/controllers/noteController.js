const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.user.id; // From authMiddleware

  try {
    const newNote = await Note.create({ title, content, user_id });
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating note" });
  }
};

exports.getNotes = async (req, res) => {
  const user_id = req.user.id; // From authMiddleware

  try {
    const notes = await Note.findByUserId(user_id);
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching notes" });
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const note = await Note.findByIdAndUserId(id, user_id);
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or you do not have access" });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching note" });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const user_id = req.user.id;

  try {
    const updatedNote = await Note.update({ id, title, content, user_id });
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or you do not have access" });
    }
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating note" });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const deletedNote = await Note.delete(id, user_id);
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or you do not have access" });
    }
    res.json({ message: "Note removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting note" });
  }
};
