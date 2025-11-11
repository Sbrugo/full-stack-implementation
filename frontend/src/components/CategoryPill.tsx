interface CategoryPillProps {
  name: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ name }) => {
  const getColor = () => {
    switch (name.toLowerCase()) {
      case "work":
        return "#FFA500";
      case "personal":
        return "#B2FFFF";
      case "ideas":
        return "#FFFF00";
      default:
        return "";
    }
  };

  const color = getColor();

  return (
    <div
      className="h-fit w-fit m-2 border rounded-lg border-transparent text-xs text-black"
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
