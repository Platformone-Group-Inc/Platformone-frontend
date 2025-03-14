"use client";

import { Button } from "@/components/ui/button";
import AiBuilderDropdown from "./ai-builder-dropdown";

import NewPropertyDropdown from "./new-property-dropdown";
import PropertiesDropdown from "./proverties-dropdown";
import { Link } from "iconsax-react";

const CallToActionButtons = () => {
  return (
    <div className="flex items-center gap-3">
      <PropertiesDropdown />
      <NewPropertyDropdown />
      <Button
        variant={"outline"}
        className="h-auto stroke-secondary-400 px-3 py-2.5"
      >
        <Link className="size-5" />
        Attach
      </Button>
      <AiBuilderDropdown />
    </div>
  );
};

export default CallToActionButtons;
