import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { PlusIcon } from "lucide-react";

export const AddUserModal = () => {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4">
          <DialogHeader className="flex flex-row items-start gap-3">
            <DialogTitle className="text-xl font-semibold">
              Create Risk
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-5">
            {[
              "Email",
              "Full Name",
              "Job Title",
              "Department",
              "User Roles",
              "Signin preference",
            ].map((i) => (
              <Input key={i} placeholder={i} type="text" required />
            ))}
            <div className="flex items-center justify-end">
              <Button type="button">Invite</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
