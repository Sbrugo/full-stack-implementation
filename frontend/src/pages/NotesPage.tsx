import React, { useEffect, useState } from "react";
import {
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  updateNote, // Import updateNote
} from "../services/api";
import NoteForm from "../components/NoteForm";

type Note = { id: number; title: string; content?: string };

export default function NotesPage() {
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const [active, archived] = await Promise.all([
        getActiveNotes(),
        getArchivedNotes(),
      ]);
      setActiveNotes(active);
      setArchivedNotes(archived);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSave = () => {
    loadNotes();
  };

  const handleCloseForm = () => {
    setEditingNote(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setActiveNotes((prev) => prev.filter((n) => n.id !== id));
      setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const handleArchive = async (note: Note) => {
    try {
      await archiveNote(note.id);
      setActiveNotes((prev) => prev.filter((n) => n.id !== note.id));
      setArchivedNotes((prev) => [...prev, note]);
    } catch (error) {
      console.error("Failed to archive note", error);
    }
  };

  const handleUnarchive = async (note: Note) => {
    try {
      await unarchiveNote(note.id);
      setArchivedNotes((prev) => prev.filter((n) => n.id !== note.id));
      setActiveNotes((prev) => [...prev, note]);
    } catch (error) {
      console.error("Failed to unarchive note", error);
    }
  };

  return (
    <div>
      <h1>Notas</h1>
      <button onClick={() => setIsCreating(true)}>Crear Nota</button>

      {(isCreating || editingNote) && (
        <NoteForm
          noteToEdit={editingNote}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}

      {loading ? (
        <p>Cargando notas...</p>
      ) : (
        <>
          <section>
            <h2>Activas</h2>
            <ul>
              {activeNotes.map((n) => (
                <li key={n.id}>
                  <strong>{n.title}</strong>
                  <p>{n.content}</p>
                  <button onClick={() => setEditingNote(n)}>Editar</button>
                  <button onClick={() => handleArchive(n)}>Archivar</button>
                  <button onClick={() => handleDelete(n.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Archivadas</h2>
            <ul>
              {archivedNotes.map((n) => (
                <li key={n.id}>
                  <strong>{n.title}</strong>
                  <p>{n.content}</p>
                  <button onClick={() => handleUnarchive(n)}>
                    Desarchivar
                  </button>
                  <button onClick={() => handleDelete(n.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
