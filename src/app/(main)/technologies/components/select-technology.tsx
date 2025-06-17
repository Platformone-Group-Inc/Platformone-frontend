import { Technology } from "@/services/operations/Technology";
import SelectTechnologyItem from "./select-technology-item";

interface Props {
  technology: Technology;
}

const SelectTechnology: React.FC<Props> = ({ technology }) => {
  return (
    <div className="space-y-4">
      {technology.items.map((item, index) => (
        <SelectTechnologyItem key={index} item={item} slug={technology.slug} />
      ))}
    </div>
  );
};

export default SelectTechnology;
