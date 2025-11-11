interface CategoryPillProps {
  name: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ name }) => {
  const getColor = () => {
    switch (name.toLowerCase()) {
      case "work":
        return "#BBCB50";
      case "personal":
        return "#D49BAE";
      case "ideas":
        return "#678CEC";
      default:
        return "";
    }
  };

  const color = getColor();

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
