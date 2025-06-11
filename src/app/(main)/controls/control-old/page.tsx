// import { Button } from "@/components/ui/button";
import DemoDataTable from "./demo-data-table";

const DataTable = () => {
  return (
    <div className="p-4">
      {/* <div className="border rounded-xl shadow w-[200px] p-1.5 space-y-1.5">
        <Button
          variant={"secondary"}
          className=" text-base h-auto px-2 py-2.5 rounded-md w-full font-medium transition-all"
        >
          Dashboard
        </Button>
        <Button
          variant={"transparent"}
          className=" text-base h-auto px-2 py-2.5 rounded-md w-full font-medium transition-all"
        >
          Dashboard
        </Button>
      </div> */}
      <DemoDataTable />
    </div>
  );
};

export default DataTable;
