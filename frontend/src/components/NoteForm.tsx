import { useForm } from "react-hook-form";
import { createNote, updateNote } from "../services/api";
import { useEffect } from "react";

type Note = { id: number; title: string; content?: string };

type NoteFormData = {
  title: string;
  content: string;
};

type NoteFormProps = {
  onSave: () => void;
  noteToEdit?: Note | null;
  onClose: () => void;
};

export default function NoteForm({
  onSave,
  noteToEdit,
  onClose,
}: NoteFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<NoteFormData>();

  useEffect(() => {
    if (noteToEdit) {
      setValue("title", noteToEdit.title);
      setValue("content", noteToEdit.content || "");
    } else {
      reset({ title: "", content: "" });
    }
  }, [noteToEdit, setValue, reset]);

  const onSubmit = async (data: NoteFormData) => {
    if (noteToEdit) {
      await updateNote(noteToEdit.id, data);
    } else {
      await createNote(data);
    }
    onSave();
    onClose();
  };

  return (
    // Basic modal structure
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "5px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{noteToEdit ? "Edit Note" : "Create Note"}</h2>
          <input {...register("title")} placeholder="Title" required />
          <textarea {...register("content")} placeholder="Content" />
          <button type="submit">{noteToEdit ? "Save" : "Create"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
