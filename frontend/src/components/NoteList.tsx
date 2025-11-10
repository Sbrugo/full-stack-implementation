import { useEffect, useState } from "react";
import { deleteNote, getActiveNotes } from "../services/api";

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const data = await getActiveNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <ul>
      {notes.map((n: any) => (
        <li key={n.id}>
          <strong>{n.title}</strong> - {n.content}
          <button
            onClick={() => {
              deleteNote(n.id);
              fetchNotes();
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
