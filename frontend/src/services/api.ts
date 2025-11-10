import axios from "axios";

const API = "http://localhost:8080/api/notes";

type NoteData = { title: string; content: string };

export const getActiveNotes = () =>
  axios.get(`${API}/active`).then((r) => r.data);
export const getArchivedNotes = () =>
  axios.get(`${API}/archived`).then((r) => r.data);
export const createNote = (note: NoteData) =>
  axios.post(API, note).then((r) => r.data);
export const updateNote = (id: number, note: NoteData) =>
  axios.put(`${API}/${id}`, note).then((r) => r.data);
export const deleteNote = (id: number) => axios.delete(`${API}/${id}`);
export const archiveNote = (id: number) => axios.put(`${API}/${id}/archive`);
export const unarchiveNote = (id: number) =>
  axios.put(`${API}/${id}/unarchive`);
