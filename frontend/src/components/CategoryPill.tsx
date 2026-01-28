interface CategoryPillProps {
  name: string;
  color: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ name, color }) => {
  return (
    <div
      className="h-fit w-fit border rounded-lg border-transparent text-xs text-black"
      style={{
        backgroundColor: color,
        padding: "1.5px 6px",
      }}
    >
      {name}
    </div>
  );
};

export default CategoryPill;
