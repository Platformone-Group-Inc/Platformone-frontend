"use client";

import { SearchIcon } from "lucide-react";

const MappingsContent = () => {
  return (
    <div className="space-y-6 divide-y">
      {["Framework Objectives", "Questions", "Risks"].map((i) => (
        <div key={i} className="space-y-2 py-3">
          <p className="text-sm font-semibold">{i}</p>
          <div className="flex items-center gap-4 border border-primary/10 focus-within:border-primary px-6 py-3 w-96 rounded-full transition-all">
            <label htmlFor="search">
              <SearchIcon className="" />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search for control, policies, etc."
              className="bg-transparent outline-none font-medium w-full text-sm"
            />
          </div>

          <button className="w-full p-2 text-sm bg-primary/10 font-semibold">
            None
          </button>
        </div>
      ))}
    </div>
  );
};

export default MappingsContent;
