import { Label } from "@/components/ui/label";
import SelectUserInput from "../select-user-input";

const SecurityDetailsForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="font-semibold">Information Owner</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">System Owner</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">System Security Officer</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">Management Point Of Contact</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">Technical Point Of Contact</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">Authorizing Official</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">Additional Point Of Contact</Label>
        <SelectUserInput placeholder="Select Employee" />
      </div>
    </div>
  );
};

export default SecurityDetailsForm;
