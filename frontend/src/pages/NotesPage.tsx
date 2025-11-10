import React, { useEffect, useState } from "react";
import {
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getAllCategories,
  getNotesByCategory,
} from "../services/api";
import NoteForm from "../components/NoteForm";

type Category = { id: number; name: string };
type Note = {
  id: number;
  title: string;
  content?: string;
  categories: Category[];
};

export default function NotesPage() {
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Fetch all categories for the filter dropdown
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
    const fetchArchived = async () => {
      try {
        const archived = await getArchivedNotes();
        setArchivedNotes(archived);
      } catch (error) {
        console.error("Failed to fetch archived notes", error);
      }
    };
    fetchArchived();
  }, []);

  useEffect(() => {
    const loadActiveNotes = async () => {
      setLoading(true);
      try {
        const notes =
          selectedCategory && selectedCategory !== "ALL"
            ? await getNotesByCategory(selectedCategory)
            : await getActiveNotes();
        setActiveNotes(notes);
      } catch (error) {
        console.error("Failed to fetch active notes", error);
      } finally {
        setLoading(false);
      }
    };
    loadActiveNotes();
  }, [selectedCategory]);

  const handleSave = () => {
    const reload = async () => {
      const notes =
        selectedCategory && selectedCategory !== "ALL"
          ? await getNotesByCategory(selectedCategory)
          : await getActiveNotes();
      setActiveNotes(notes);
    };
    reload();
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

  const categoryPillStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "2px 8px",
    margin: "2px",
    borderRadius: "12px",
    backgroundColor: "#e0e0e0",
    fontSize: "12px",
  };

  return (
    <div className="bg-black">
      <h1>Notas</h1>
      <button onClick={() => setIsCreating(true)}>Crear Nota</button>

      {(isCreating || editingNote) && (
        <NoteForm
          noteToEdit={editingNote}
          onSave={handleSave}
          onClose={handleCloseForm}
          allCategories={allCategories}
        />
      )}

      <div>
        <label htmlFor="category-filter">Filtrar por categoría: </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="ALL">Todas</option>
          {allCategories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

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
                  <div>
                    {n.categories.map((c) => (
                      <span key={c.id} style={categoryPillStyle}>
                        {c.name}
                      </span>
                    ))}
                  </div>
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
                  <div>
                    {n.categories.map((c) => (
                      <span key={c.id} style={categoryPillStyle}>
                        {c.name}
                      </span>
                    ))}
                  </div>
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
