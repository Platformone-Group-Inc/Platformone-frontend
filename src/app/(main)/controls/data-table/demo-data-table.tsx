/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
// // import { Badge } from "@/components/ui/badge";

// const DemoDataTable = () => {
//   return (
//     <>
//       {Array.from({ length: 3 }).map((_, i) => (
//         <div key={i}>hello</div>
//       ))}
//     </>
//   );
// };

// export default DemoDataTable;

// /*
// control
// control name
// owner
// status
// evidence
// control family
// action item
// priority
// action
// */

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Adjust the import path based on your project structure
import DemoTableActionDropDown from "./demo-table-action-drop-down";

interface Data {
  control: string;
  controlName: string;

  owner: string;
  image: string;
  // status: 'string';
  implemented: boolean;
  evidence: string;
  controlFamily: string;
  actionItem: string;
  priority: "high" | "med" | "low";
  action: string;
}

// Sample data for demonstration purposes
const data: Data[] = [
  {
    control: "1",
    controlName: "Policy and Procedures",
    owner: "John Doe",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
    // status: "Active",
    implemented: false,
    evidence: "Audit logs",
    controlFamily: "Security",
    actionItem: "Review access rights",
    priority: "high",
    action: "Edit",
  },
  {
    control: "2",
    controlName: "Account Management",
    owner: "Jane Smith",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
    // status: "Pending",
    implemented: true,

    evidence: "Backup schedule",
    controlFamily: "Operations",
    actionItem: "Confirm backup process",
    priority: "med",
    action: "View",
  },
  // Add more rows as needed...
];

const DemoDataTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Control</TableHead>
            <TableHead>Control Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Evidence</TableHead>
            <TableHead>Control Family</TableHead>
            <TableHead>Action Item</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="py-60 bg-background">
              <TableCell className="py-7">{row.control}</TableCell>
              <TableCell className="text-primary-600 font-medium">
                {row.controlName}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="size-8 rounded-full aspect-square object-cover "
                    src={row.image}
                    width={32}
                    height={32}
                    alt={row.owner}
                  />

                  <div className="text-secondary-500 text-sm truncate">
                    {row.owner}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  size={"sm"}
                  variant={row.implemented ? "success" : "error"}
                >
                  {row.implemented ? "Implemented" : "Not Implemented"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge size={"sm"} variant={"error"} withDot>
                  {row.evidence}
                </Badge>
              </TableCell>
              <TableCell>{row.controlFamily}</TableCell>
              <TableCell>{row.actionItem}</TableCell>
              <TableCell>
                <Badge
                  size={"sm"}
                  variant={
                    (row.priority === "high" && "error") ||
                    (row.priority === "med" && "success") ||
                    (row.priority === "low" && "warn") ||
                    "default"
                  }
                >
                  {row.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <DemoTableActionDropDown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DemoDataTable;
