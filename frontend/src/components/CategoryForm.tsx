import { useState } from "react";
import { useNotesContext } from "../context/NotesContext";

const CategoryForm = () => {
  const { handleAddCategory } = useNotesContext();
  const [newCategory, setNewCategory] = useState("");
  const [color, setColor] = useState("#CCCCCC");

  const handleAdd = () => {
    if (newCategory.trim() !== "") {
      handleAddCategory({ name: newCategory, color });
      setNewCategory("");
      setColor("#CCCCCC");
    }
  };

  return (
    <div>
      <div className="mt-4">
        <label
          htmlFor="new-category"
          className="text-sm font-medium text-neutral-500 mb-2 block"
        >
          Add new category
        </label>
        <div className="flex gap-2">
          <input
            id="new-category"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 bg-white"
            placeholder="Category name..."
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-10 p-1 border border-neutral-300 rounded-md"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-md bg-neutral-800 text-white text-sm font-semibold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;