import { Button } from "@/components/ui/button";
import { HomeIcon, PanelLeft } from "lucide-react";

const Page = () => {
  return (
    <div>
      <Button variant={"info"} size={"icon"}>
        <HomeIcon />
      </Button>

      <Button
        // variant="transparent"
        size="icon"
        //   className={cn("h-9 w-9 px-0 py-0 p-0", className)}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
};

export default Page;
