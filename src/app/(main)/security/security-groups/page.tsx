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
            Users
            {/* <Badge className="ml-3.5">2 Control Set</Badge> */}
            <InfoCircle className="stroke-secondary size-4" />
          </h1>

          <AddUserModal />
        </div>
        <UsersTab />
      </div>

      {/* <div className="bg-white flex-shrink-0 w-[300px] p-4 rounded-2xl shadow space-y-4 divide-y">
        <h2 className="text-lg font-semibold mb-4">Sign in Setting</h2>
        <div className="py-4 space-y-6">
          <div className=" space-y-3 rounded-lg">
            <Label className="text-sm font-semibold">MFA Setting</Label>
            <p className="text-xs">
              Enforce MFA for any users using username & password to login into
              ControlMap login.
            </p>
            <div className="bg-[#F4F4F4] p-3 rounded-md flex items-center gap-2">
              <Checkbox className="size-3.5" />
              <h3 className="text-sm font-semibold">
                Enforce MFA for all users
              </h3>
            </div>
          </div>
          <div className=" space-y-3 rounded-lg">
            <Label className="text-sm font-semibold">
              Configure sign-in option available for Control Map
            </Label>
            <p className="text-xs">
              Enforce MFA for any users using username & password to login into
              ControlMap login.
            </p>
            <div className="bg-[#F4F4F4] p-3 rounded-md flex items-center gap-2">
              <Checkbox defaultChecked className="size-3.5" />
              <div>
                <h3 className="text-sm font-semibold">
                  Enforce sign in with Google
                </h3>
                <p className="text-xs">
                  But I must explain to you how all this mistaken idea of
                  reprobating pleasure and extolling pain arose. To do so, I
                  will give you a complete account of the system, and expound
                  the actual teachings.
                </p>
              </div>
            </div>
            <div className="bg-[#F4F4F4] p-3 rounded-md flex items-center gap-2">
              <Checkbox defaultChecked className="size-3.5" />
              <div>
                <h3 className="text-sm font-semibold">
                  Enforce login with Microsoft
                </h3>
                <p className="text-xs">
                  But I must explain to you how all this mistaken idea of
                  reprobating pleasure and extolling pain arose. To do so, I
                  will give you a complete account of the system, and expound
                  the actual teachings.
                </p>
              </div>
            </div>
            <div className=" space-y-3 rounded-lg">
              <Label className="text-sm font-semibold">MFA Setting</Label>
              <p className="text-xs">
                Enforce MFA for any users using username & password to login
                into ControlMap login.
              </p>
              <div className="bg-[#F4F4F4] p-3 rounded-md flex items-center gap-2">
                <Checkbox defaultChecked className="size-3.5" />
                <h3 className="text-sm font-semibold">
                  Enforce MFA for all users
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end pt-6">
          <Button>Update Settings</Button>
        </div>
      </div> */}
    </div>
  );
};

export default SecurityUsers;
