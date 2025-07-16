import { FiMenu, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const TopBar = ({ isCollapsed, onToggleSidebar }) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleSearchButtonClick = () => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      onToggleSidebar();
    }
    navigate("/dashboard/search");
  };

  return (
    <div className="flex items-center justify-between p-4 z-10">
      <button
        onClick={onToggleSidebar}
        className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md"
      >
        <FiMenu size={16} />
      </button>

      {!isCollapsed && (
        <h2 className="font-semibold text-lg truncate">
          {user?.name ? `Welcome, ${user.name}` : "Welcome"}
        </h2>
      )}

      {!isCollapsed && (
        <button
          onClick={handleSearchButtonClick}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md"
        >
          <FiSearch size={16} />
        </button>
      )}
    </div>
  );
};

export default TopBar;
