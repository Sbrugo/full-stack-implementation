import axios from "axios";

const API_NOTES = "http://localhost:8080/api/notes";
const API_CATEGORIES = "http://localhost:8080/api/categories";

type NoteData = { title: string; content: string };

export const getActiveNotes = () =>
  axios.get(`${API_NOTES}/active`).then((r) => r.data);
export const getArchivedNotes = () =>
  axios.get(`${API_NOTES}/archived`).then((r) => r.data);
export const getNotesByCategory = (categoryName: string) =>
  axios.get(`${API_NOTES}?category=${categoryName}`).then((r) => r.data);
export const createNote = (note: NoteData) =>
  axios.post(API_NOTES, note).then((r) => r.data);
export const updateNote = (id: number, note: NoteData) =>
  axios.put(`${API_NOTES}/${id}`, note).then((r) => r.data);
export const deleteNote = (id: number) => axios.delete(`${API_NOTES}/${id}`);
export const archiveNote = (id: number) => axios.put(`${API_NOTES}/${id}/archive`);
export const unarchiveNote = (id: number) =>
  axios.put(`${API_NOTES}/${id}/unarchive`);

export const getAllCategories = () =>
  axios.get(API_CATEGORIES).then((r) => r.data);
