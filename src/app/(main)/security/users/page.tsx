// import { Button } from "@/components/ui/button";

// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { InfoCircle } from "iconsax-react";

import UsersTab from "./components/users-tab";
import { AddUserModal } from "./components/modals/add-user-modal";

const SecurityUsers = () => {
  return (
    <div className="flex gap-4 bg-primary-100">
      <div className="flex-grow p-4 rounded-2xl bg-white">
        <div className="space-y-1 pb-6 flex items-center justify-between ">
          <h1 className="font-semibold text-xl inline-flex gap-1 items-center">
            Security Group
            {/* <Badge className="ml-3.5">2 Control Set</Badge> */}
            <InfoCircle className="stroke-secondary size-4" />
          </h1>

          <AddUserModal />
        </div>
        <UsersTab />
      </div>
    </div>
  );
};

export default SecurityUsers;
