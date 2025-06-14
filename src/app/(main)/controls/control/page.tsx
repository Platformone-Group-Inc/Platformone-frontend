"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/ui/shell";
import ControlsTable from "./_components/controls-table";

import { useQuery } from "@tanstack/react-query";
import { getControlByControlFamiliesQueryFn } from "@/services/operations/Control";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DataTablePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const controlFamilyId = searchParams.get("id");

  const rowperPage = searchParams.get("perPage");
  console.log(rowperPage);
  const {
    data: controlByControlFamilies,
    isLoading: controlByControlFamiliesLoading,
  } = useQuery({
    queryKey: ["controlByControlFamilies", controlFamilyId],
    queryFn: () =>
      getControlByControlFamiliesQueryFn(
        controlFamilyId,
        null,
        false,
        1,
        rowperPage ? parseInt(rowperPage) : 10
      ),
  });

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 300);
  //   return () => clearTimeout(timer);
  // }, []);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <Shell className="p-4 gap-2">
      {controlByControlFamiliesLoading ? (
        <DataTableSkeleton
          columnCount={10}
          filterCount={0}
          cellWidths={[
            "10rem",
            "30rem",
            "10rem",
            "10rem",
            "6rem",
            "6rem",
            "6rem",
          ]}
          shrinkZero
        />
      ) : (
        <>
          <div className="flex items-center backdrop-blur justify-between py-4 px-6 sticky top-0 z-10 border-b">
            <div>
              <h1 className="font-semibold text-lg">
                FedRAMP Moderate (800-53 Rev. 5)
              </h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/controls">
                      All Controls
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      FedRAMP Moderate (800-53 Rev. 5)
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* <Button
                    variant={"outline"}
                    onClick={() => setView((s) => (s === "grid" ? "table" : "grid"))}
                    className="p-1"
                  >
                    <span
                      className={cn(
                        "p-2 rounded-md aspect-square ",
                        view === "grid" && "bg-primary text-primary-100"
                      )}
                    >
                      <Grid3X3Icon size={18} />
                    </span>
                    <span
                      className={cn(
                        "p-2 rounded-md aspect-square ",
                        view === "table" && "bg-primary text-primary-100"
                      )}
                    >
                      <Rows3Icon size={18} />
                    </span>
                  </Button> */}
          </div>
          <ControlsTable
            controlByControlFamilies={controlByControlFamilies}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Shell>
  );
};

export default DataTablePage;
