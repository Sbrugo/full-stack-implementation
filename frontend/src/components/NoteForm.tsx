import { useForm } from "react-hook-form";
import {
  createNote,
  updateNote,
  addCategoryToNote,
  removeCategoryFromNote,
} from "../services/api";
import { useEffect } from "react";
import type { Note } from "../types/Note";
import type { Category } from "../types/Category";
import type { NoteFormData } from "../types/NoteFormData";

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
      const existingCategoryIds = new Set(
        noteToEdit.categories.map((c) => c.id)
      );
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
    console.log(data);

    const selectedCategoryIds = new Set(
      Object.keys(data.categories || {})
        .filter((id) => data.categories[id])
        .map(Number)
    );

    if (noteToEdit) {
      await updateNote(noteToEdit.id, {
        title: data.title,
        content: data.content,
      });

      const originalCategoryIds = new Set(
        noteToEdit.categories.map((c) => c.id)
      );
      const promises: Promise<any>[] = [];

      selectedCategoryIds.forEach((id) => {
        if (!originalCategoryIds.has(id)) {
          promises.push(addCategoryToNote(noteToEdit.id, id));
        }
      });

      originalCategoryIds.forEach((id) => {
        if (!selectedCategoryIds.has(id)) {
          promises.push(removeCategoryFromNote(noteToEdit.id, id));
        }
      });

      if (promises.length > 0) {
        await Promise.all(promises);
      }
    } else {
      const newNote = await createNote({
        title: data.title,
        content: data.content,
      });

      if (newNote && newNote.id && selectedCategoryIds.size > 0) {
        const promises = Array.from(selectedCategoryIds).map((catId) =>
          addCategoryToNote(newNote.id, catId)
        );
        await Promise.all(promises);
      }
    }

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
        width: "100%",
      }}
    >
      <div className="bg-white p-6 border rounded-xl w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <h2 className="text-black font-bold text-xl mb-8">
            {noteToEdit ? "Edit Note" : "Create Note"}
          </h2>
          <input
            {...register("title")}
            placeholder="Title"
            required
            className="h-[60px] bg-transparent pl-4 mb-4 text-gray-400"
          />
          <textarea
            {...register("content")}
            placeholder="Content"
            className="h-[120px] bg-transparent pl-4 text-gray-400"
          />
          <fieldset>
            <legend>Categories</legend>
            {allCategories.map((cat) => (
              <div key={cat.id} className="text-left">
                <input
                  type="checkbox"
                  {...register(`categories.${cat.id}`)}
                  id={`cat-${cat.id}`}
                />
                <label htmlFor={`cat-${cat.id}`} className="text-gray-400 ml-2">
                  {cat.name}
                </label>
              </div>
            ))}
          </fieldset>
          <div className="flex gap-2 mt-8">
            <button type="submit">{noteToEdit ? "Save" : "Create"}</button>
            <button
              type="button"
              onClick={onClose}
              className="bg-transparent border-1 border-gray text-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
