import { EditableInput } from "@/components/ui/editable-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InfoSystemForm = () => {
  return (
    <form className="space-y-4 max-w-[550px]">
      <EditableInput name="name" placeholder="Name" />
      <EditableInput name="id" placeholder="ID" />
      <EditableInput name="phone" placeholder="Organization Phone" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Operational Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="operational">Operational</SelectItem>
          <SelectItem value="under-development">Under Development</SelectItem>
          <SelectItem value="under-modification">Under Modification</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Major Application</SelectItem>
          <SelectItem value="2">General Support System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Scope" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            Enterprise - Entire company&apos;s network
          </SelectItem>
          <SelectItem value="1">Contracts - Contract based SSP</SelectItem>
          <SelectItem value="2">General Support System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Environment of Enterprise" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            Enterprise - Entire company&apos;s network
          </SelectItem>
          <SelectItem value="1">
            Standalone or Small Office/Home Office
          </SelectItem>
          <SelectItem value="2">Managed or Enterprise</SelectItem>
          <SelectItem value="3">Custom</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
};

export default InfoSystemForm;
