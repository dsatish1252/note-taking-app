import axios from "axios";
import authHeader from "../utils/authHeader"; // Utility to get token

const API_URL = "/api/notes";

const getNotes = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createNote = (title, content) => {
  return axios.post(API_URL, { title, content }, { headers: authHeader() });
};

const getNoteById = (id) => {
  return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

const updateNote = (id, title, content) => {
  return axios.put(
    `${API_URL}/${id}`,
    { title, content },
    { headers: authHeader() }
  );
};

const deleteNote = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const noteService = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};

export default noteService;
