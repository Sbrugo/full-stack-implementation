import { useEffect, useState } from "react";
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
import CategoryPill from "../components/CategoryPill";

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
  const [openNote, setOpenNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setAllCategories(categories);
        console.log(categories);
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

  return (
    <div className="w-full">
      <h1 className="font-bold mb-6 tracking-tight leading-snug">Notes</h1>
      <button onClick={() => setIsCreating(true)}>Create note</button>
      <div className="w-full flex gap-10 mt-10">
        <div id="sidenav" className="w-1/3 text-left">
          {(isCreating || editingNote) && (
            <NoteForm
              noteToEdit={editingNote}
              onSave={handleSave}
              onClose={handleCloseForm}
              allCategories={allCategories}
            />
          )}

          <div>
            <label htmlFor="category-filter">Filter categories: </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="ALL">All</option>
              {allCategories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading notes...</p>
          ) : (
            <>
              <section>
                <h2 className="text-gray-300 font-bold text-xl">Active</h2>
                <ul>
                  {activeNotes.map((n) => (
                    <li
                      key={n.id}
                      className="p-2 cursor-pointer flex items-center"
                      onClick={() => setOpenNote(n)}
                    >
                      <strong className="mr-4">{n.title}</strong>
                      {n.categories.map((c) => (
                        <span key={c.id}>
                          <CategoryPill name={c.name}></CategoryPill>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-gray-300 font-bold text-xl">Archived</h2>
                <ul>
                  {archivedNotes.map((n) => (
                    <li
                      key={n.id}
                      className="p-2 cursor-pointer"
                      onClick={() => setOpenNote(n)}
                    >
                      <strong>{n.title}</strong>
                      {n.categories.map((c) => (
                        <span key={c.id}>
                          <CategoryPill name={c.name}></CategoryPill>
                        </span>
                      ))}
                      <button onClick={() => handleUnarchive(n)}>
                        Unarchive
                      </button>
                      <button onClick={() => handleDelete(n.id)}>Trash</button>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
        <div>
          {openNote ? (
            <>
              <h2>{openNote.title}</h2>
              <p>{openNote.content}</p>
              <div>
                {openNote.categories.map((c) => (
                  <span key={c.id}>
                    <CategoryPill name={c.name}></CategoryPill>
                  </span>
                ))}
              </div>
              <button onClick={() => setEditingNote(openNote)}>Edit</button>
              <button onClick={() => handleArchive(openNote)}>Archive</button>
              <button onClick={() => handleDelete(openNote.id)}>Trash</button>
            </>
          ) : (
            <p>Seleccioná una nota para verla aquí</p>
          )}
        </div>
      </div>
    </div>
  );
}
