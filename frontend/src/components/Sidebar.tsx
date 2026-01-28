import { useNotesContext } from "../context/NotesContext";
import type { Note } from "../types/Note";
import CategoryPill from "./CategoryPill";
import TagFilter from "./TagFilter";

type SidebarProps = {
  setOpenNote: React.Dispatch<React.SetStateAction<Note | null>>;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ setOpenNote, setIsCreating }: SidebarProps) => {
  const { loading, activeNotes, archivedNotes } = useNotesContext();

  return (
    <aside className="bg-neutral-100 w-1/3 border-r border-neutral-200 p-6 md:p-8 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Note</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-3 py-1.5 text-sm rounded-md bg-black text-white hover:bg-neutral-800 transition-colors"
        >
          + New
        </button>
      </div>

      <TagFilter />

      <div className="overflow-y-auto flex-1">
        {loading ? (
          <p className="text-neutral-400 text-sm">Loading notes...</p>
        ) : (
          <>
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
                Active
              </h2>
              <ul className="space-y-2">
                {activeNotes.map((n) => (
                  <li
                    key={n.id}
                    className="p-3 rounded-lg border border-transparent hover:border-neutral-200 hover:bg-neutral-100 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setOpenNote(n)}
                  >
                    <span className="font-medium truncate mr-5">{n.title}</span>
                    <div className="flex gap-1 fjustify-end">
                      {n.categories.map((c) => (
                        <CategoryPill
                          key={c.id}
                          name={c.name}
                          color={c.color}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
                Archived
              </h2>
              <ul className="space-y-2">
                {archivedNotes.map((n) => (
                  <li
                    key={n.id}
                    className="p-3 rounded-lg border border-transparent hover:border-neutral-200 hover:bg-neutral-100 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setOpenNote(n)}
                  >
                    <span className="font-medium truncate mr-5">{n.title}</span>
                    <div className="flex gap-1 justify-end">
                      {n.categories.map((c) => (
                        <CategoryPill
                          key={c.id}
                          name={c.name}
                          color={c.color}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
