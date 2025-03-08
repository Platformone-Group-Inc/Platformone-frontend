"use client";

import { Badge } from "@/components/ui/badge";

const DemoDataTable = () => {
  return (
    <div>
      <Badge variant={"success"}>hello</Badge>
      <Badge className="bg-success/30 text-success">hello</Badge>
      <Badge>hello</Badge>
      <Badge>hello</Badge>
      <Badge>hello</Badge>
      <Badge>hello</Badge>
    </div>
  );
};

export default DemoDataTable;
