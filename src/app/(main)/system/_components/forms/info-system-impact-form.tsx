import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InfoSystemImpactForm = () => {
  return (
    <form className="space-y-4 max-w-[550px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Impact on Confidentiality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Impact on Integrity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Impact on Availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
};

export default InfoSystemImpactForm;
