interface CategoryPillProps {
  name: string;
  color: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ name, color }) => {
  // const getColor = () => {
  //   switch (name.toLowerCase()) {
  //     case "work":
  //       return "#BBCB50";
  //     case "personal":
  //       return "oklch(90.2% 0.063 306.703)";
  //     case "ideas":
  //       return "#678CEC";
  //     default:
  //       return "";
  //   }
  // };

  // const color = getColor();

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
