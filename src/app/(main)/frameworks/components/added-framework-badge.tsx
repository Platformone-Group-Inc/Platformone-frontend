import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";

const AddedFrameworkBadge = () => {
  return (
    <Badge
      variant={"success"}
      className="text-xs gap-2 hover:bg-[#ECFDF3] hover:text-secondary bg-[#ECFDF3] text-secondary px-2 py-1 rounded-full border border-[#12B76A]"
    >
      <span className="bg-[#12B76A]  p-1 rounded-full text-white">
        <CheckIcon size={16} className="bg-[#027A48] rounded-full p-1" />
      </span>
      Added in frameworks
    </Badge>
  );
};

export default AddedFrameworkBadge;
