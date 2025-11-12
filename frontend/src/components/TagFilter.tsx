import { useState } from "react";
import { useNotesContext } from "../context/NotesContext";

const TagFilter = () => {
  const {
    allCategories,
    selectedCategory,
    setSelectedCategory,
    handleAddCategory,
  } = useNotesContext();
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (newCategory.trim() !== "") {
      handleAddCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="category-filter"
        className="text-sm font-medium text-neutral-500 mb-2 block"
      >
        Filter by category
      </label>
      <div className="flex gap-4 items-center">
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 bg-white"
        >
          <option value="ALL">All</option>
          {allCategories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex justify-between items-center">
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

export default TagFilter;
