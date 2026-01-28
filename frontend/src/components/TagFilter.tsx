import { useNotesContext } from "../context/NotesContext";

const TagFilter = () => {
  const { allCategories, selectedCategory, setSelectedCategory } =
    useNotesContext();

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
    </div>
  );
};

export default TagFilter;
