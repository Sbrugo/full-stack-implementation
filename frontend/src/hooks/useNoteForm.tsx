import { useState } from "react";
import { useNotesContext } from "../context/NotesContext";

export const useNoteForm = () => {
  const { createNewNote } = useNotesContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await createNewNote({ title, content });
    setTitle("");
    setContent("");
  };
  return {
    title,
    content,
    setTitle,
    setContent,
    handleSubmit,
  };
};
