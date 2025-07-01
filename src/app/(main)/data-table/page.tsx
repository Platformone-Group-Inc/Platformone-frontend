// "use client";

// import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
// import { Shell } from "@/components/ui/shell";
// import ControlsTable from "./_components/controls-table";
// import { useEffect, useState } from "react";

// const DataTablePage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Shell className="p-4 gap-2">
//       {loading ? (
//         <DataTableSkeleton
//           columnCount={10}
//           filterCount={0}
//           cellWidths={[
//             "10rem",
//             "30rem",
//             "10rem",
//             "10rem",
//             "6rem",
//             "6rem",
//             "6rem",
//           ]}
//           shrinkZero
//         />
//       ) : (
//         <ControlsTable />
//       )}
//     </Shell>
//   );
// };

// export default DataTablePage;

const NewDataTable = () => {
  return <div>New Data Table Will be added</div>;
};

export default NewDataTable;
