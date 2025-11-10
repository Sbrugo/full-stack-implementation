import { useForm } from "react-hook-form";
import {
  createNote,
  updateNote,
  addCategoryToNote,
  removeCategoryFromNote,
} from "../services/api";
import { useEffect } from "react";

type Category = { id: number; name: string };
type Note = {
  id: number;
  title: string;
  content?: string;
  categories: Category[];
};

type NoteFormData = {
  title: string;
  content: string;
  // We'll handle categories as an object of booleans for react-hook-form
  categories: Record<string, boolean>;
};

type NoteFormProps = {
  onSave: () => void;
  noteToEdit?: Note | null;
  onClose: () => void;
  allCategories: Category[];
};

export default function NoteForm({
  onSave,
  noteToEdit,
  onClose,
  allCategories,
}: NoteFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<NoteFormData>();

  useEffect(() => {
    if (noteToEdit) {
      setValue("title", noteToEdit.title);
      setValue("content", noteToEdit.content || "");
      // Set the checkboxes for the categories the note already has
      const existingCategoryIds = new Set(noteToEdit.categories.map((c) => c.id));
      const categoryCheckboxes: Record<string, boolean> = {};
      allCategories.forEach((cat) => {
        categoryCheckboxes[cat.id] = existingCategoryIds.has(cat.id);
      });
      setValue("categories", categoryCheckboxes);
    } else {
      reset({ title: "", content: "" });
    }
  }, [noteToEdit, allCategories, setValue, reset]);

  const onSubmit = async (data: NoteFormData) => {
    // First, save the note title and content
    const savedNote = noteToEdit
      ? await updateNote(noteToEdit.id, data)
      : await createNote(data);

    const noteId = savedNote.id;

    // Then, handle category changes
    const originalCategoryIds = new Set(
      noteToEdit?.categories.map((c) => c.id) || []
    );
    const selectedCategoryIds = new Set(
      Object.keys(data.categories)
        .filter((id) => data.categories[id])
        .map(Number)
    );

    const promises: Promise<any>[] = [];

    // Add new categories
    selectedCategoryIds.forEach((id) => {
      if (!originalCategoryIds.has(id)) {
        promises.push(addCategoryToNote(noteId, id));
      }
    });

    // Remove old categories
    originalCategoryIds.forEach((id) => {
      if (!selectedCategoryIds.has(id)) {
        promises.push(removeCategoryFromNote(noteId, id));
      }
    });

    await Promise.all(promises);

    onSave();
    onClose();
  };

  return (
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

          <fieldset>
            <legend>Categories</legend>
            {allCategories.map((cat) => (
              <div key={cat.id}>
                <input
                  type="checkbox"
                  {...register(`categories.${cat.id}`)}
                  id={`cat-${cat.id}`}
                />
                <label htmlFor={`cat-${cat.id}`}>{cat.name}</label>
              </div>
            ))}
          </fieldset>

          <button type="submit">{noteToEdit ? "Save" : "Create"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
