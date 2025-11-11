import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import * as api from "../services/api";
import type { Note } from "../types/Note";
import type { Category } from "../types/Category";

interface NotesContextType {
  activeNotes: Note[];
  archivedNotes: Note[];
  allCategories: Category[];
  loading: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: number) => Promise<void>;
  handleArchive: (note: Note) => Promise<void>;
  handleUnarchive: (note: Note) => Promise<void>;
  handleSaveNote: (
    noteToEdit: Note | null,
    data: {
      title: string;
      content: string;
      categories: Record<string, boolean>;
    }
  ) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const reloadActiveNotes = useCallback(async () => {
    setLoading(true);
    try {
      const notes =
        selectedCategory && selectedCategory !== "ALL"
          ? await api.getNotesByCategory(selectedCategory)
          : await api.getActiveNotes();
      setActiveNotes(notes);
    } catch (error) {
      console.error("Failed to fetch active notes", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    reloadActiveNotes();
  }, [reloadActiveNotes]);

  useEffect(() => {
    const loadStaticData = async () => {
      try {
        const [archived, categories] = await Promise.all([
          api.getArchivedNotes(),
          api.getAllCategories(),
        ]);
        setArchivedNotes(archived);
        setAllCategories(categories);
        console.log(archived);
      } catch (error) {
        console.error("Failed to load static data", error);
      }
    };
    loadStaticData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.deleteNote(id);
      setActiveNotes((prev) => prev.filter((n) => n.id !== id));
      setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const handleArchive = async (note: Note) => {
    try {
      await api.archiveNote(note.id);
      setActiveNotes((prev) => prev.filter((n) => n.id !== note.id));
      setArchivedNotes((prev) => [...prev, note]);
    } catch (error) {
      console.error("Failed to archive note", error);
    }
  };

  const handleUnarchive = async (note: Note) => {
    try {
      await api.unarchiveNote(note.id);
      setArchivedNotes((prev) => prev.filter((n) => n.id !== note.id));
      setActiveNotes((prev) => [...prev, note]);
    } catch (error) {
      console.error("Failed to unarchive note", error);
    }
  };

  const handleSaveNote = async (
    noteToEdit: Note | null,
    data: {
      title: string;
      content: string;
      categories: Record<string, boolean>;
    }
  ) => {
    const selectedCategoryIds = new Set(
      Object.keys(data.categories || {})
        .filter((id) => data.categories[id])
        .map(Number)
    );

    if (noteToEdit) {
      await api.updateNote(noteToEdit.id, data);
      const originalCategoryIds = new Set(
        noteToEdit.categories.map((c) => c.id)
      );
      const promises: Promise<any>[] = [];
      selectedCategoryIds.forEach((id) => {
        if (!originalCategoryIds.has(id))
          promises.push(api.addCategoryToNote(noteToEdit.id, id));
      });
      originalCategoryIds.forEach((id) => {
        if (!selectedCategoryIds.has(id))
          promises.push(api.removeCategoryFromNote(noteToEdit.id, id));
      });
      if (promises.length > 0) await Promise.all(promises);
    } else {
      const newNote = await api.createNote(data);
      if (newNote && newNote.id && selectedCategoryIds.size > 0) {
        const promises = Array.from(selectedCategoryIds).map((catId) =>
          api.addCategoryToNote(newNote.id, catId)
        );
        await Promise.all(promises);
      }
    }
    await reloadActiveNotes();
  };

  const value = {
    activeNotes,
    archivedNotes,
    allCategories,
    loading,
    selectedCategory,
    setSelectedCategory,
    handleDelete,
    handleArchive,
    handleUnarchive,
    handleSaveNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
