import { SearchIcon } from "lucide-react";

const HeaderSearch = () => {
  return (
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
  );
};

export default HeaderSearch;
