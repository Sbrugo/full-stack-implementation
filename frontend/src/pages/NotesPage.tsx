import { useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import NoteForm from "../components/NoteForm";
import CategoryPill from "../components/CategoryPill";
import type { Note } from "../types/Note";

export default function NotesPage() {
  const {
    activeNotes,
    archivedNotes,
    allCategories,
    loading,
    handleDelete,
    handleArchive,
    handleUnarchive,
    selectedCategory,
    setSelectedCategory,
  } = useNotesContext();

  // Local UI state for managing modals and selections
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [openNote, setOpenNote] = useState<Note | null>(null);

  const handleCloseForm = () => {
    setEditingNote(null);
    setIsCreating(false);
  };

  return (
    <div className="w-full">
      <h1 className="font-bold mb-6 tracking-tight leading-snug">Notes</h1>
      <button onClick={() => setIsCreating(true)}>Create note</button>

      {/* NoteForm only needs to know which note to edit (if any) and how to close itself */}
      {(isCreating || editingNote) && (
        <NoteForm noteToEdit={editingNote} onClose={handleCloseForm} />
      )}

      <div className="w-full flex gap-10 mt-10">
        <div id="sidenav" className="w-1/3 text-left">
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
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
        <div className="w-2/3 text-left">
          {openNote ? (
            <>
              <h2 className="font-bold text-2xl">{openNote.title}</h2>
              <div className="flex my-4">
                {openNote.categories.map((c) => (
                  <span key={c.id}>
                    <CategoryPill name={c.name}></CategoryPill>
                  </span>
                ))}
              </div>
              <p>{openNote.content}</p>

              <div className="mt-6 flex gap-2">
                <button onClick={() => setEditingNote(openNote)}>Edit</button>
                <button onClick={() => handleArchive(openNote)}>Archive</button>
                <button onClick={() => handleDelete(openNote.id)}>Trash</button>
              </div>
            </>
          ) : (
            <p>Select a note to see its details here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
