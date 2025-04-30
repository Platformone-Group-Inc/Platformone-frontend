"use client";

import NewFrameworkCard from "./new-framework-card";

const MyFrameworksList = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <NewFrameworkCard added key={i} />
      ))}
    </div>
  );
};

export default MyFrameworksList;
