import AiIcon from "../icons/ai-icon";
import HeaderSearch from "./header-search";
import NotificationPopover from "./notification-popover";
import UserDropdownMenu from "./user-dropdown-menu";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full border-b py-4 px-10">
      <HeaderSearch />
      <div className="flex items-center gap-4">
        <button className="bg-primary/10 rounded-2xl p-2.5 hover:bg-primary/20 border border-transparent hover:border-black/10 transition-all">
          <AiIcon />
        </button>
        <NotificationPopover />
        <UserDropdownMenu />
      </div>
    </div>
  );
};

export default Header;
