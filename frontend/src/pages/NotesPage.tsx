import { useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import NoteForm from "../components/NoteForm";
import CategoryPill from "../components/CategoryPill";
import type { Note } from "../types/Note";
import Sidebar from "../components/Sidebar";

export default function NotesPage() {
  const { handleDelete, handleArchive, handleUnarchive } = useNotesContext();

  // Local UI state for managing modals and selections
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [openNote, setOpenNote] = useState<Note | null>(null);

  const handleCloseForm = () => {
    setEditingNote(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col md:flex-row transition-all">
      <Sidebar setOpenNote={setOpenNote} setIsCreating={setIsCreating} />
      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {(isCreating || editingNote) && (
          <div className="max-w-xl mx-auto">
            <NoteForm noteToEdit={editingNote} onClose={handleCloseForm} />
          </div>
        )}

        {!isCreating && !editingNote && (
          <div className="max-w-2xl mx-auto">
            {openNote ? (
              <div>
                <h2 className="text-3xl font-semibold mb-4">
                  {openNote.title}
                </h2>
                <div className="flex gap-2 mb-6 flex-wrap">
                  {openNote.categories.map((c) => (
                    <CategoryPill key={c.id} name={c.name} />
                  ))}
                </div>
                <p className="text-neutral-700 whitespace-pre-line">
                  {openNote.content}
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setEditingNote(openNote)}
                    className="px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 text-sm"
                  >
                    Edit
                  </button>
                  {openNote.archived ? (
                    <button
                      onClick={() => handleUnarchive(openNote)}
                      className="px-4 py-2 rounded-md bg-neutral-800 text-white text-sm"
                    >
                      Unarchive
                    </button>
                  ) : (
                    <button
                      onClick={() => handleArchive(openNote)}
                      className="px-4 py-2 rounded-md bg-neutral-800 text-white text-sm"
                    >
                      Archive
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(openNote.id)}
                    className="px-4 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-neutral-400 italic text-center mt-12">
                Select a note to view or edit it.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
