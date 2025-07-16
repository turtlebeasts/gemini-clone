import { useState } from "react";
import TopBar from "./TopBar";
import NewConversationButton from "./NewConversation";
import ConversationList from "./ConversationList";
import useConversationStore from "../../store/conversationStore";
import useAuthStore from "../../store/authStore";
import { PiNotePencilBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [forceCollapsed, setForceCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { conversations, addConversation, deleteConversation } =
    useConversationStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleHamburgerClick = () => {
    const newState = !forceCollapsed;
    setForceCollapsed(newState);
    setIsCollapsed(newState);
  };

  const handleMouseEnter = () => {
    if (forceCollapsed) setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (forceCollapsed) setIsCollapsed(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`absolute sm:relative flex flex-col justify-between h-screen ${
        isCollapsed ? "w-[80px] " : "w-[350px] bg-zinc-800"
      } bg-none md:bg-zinc-800 transition-all duration-300 overflow-hidden z-50`}
      onMouseEnter={
        window.matchMedia("(min-width: 639px)").matches && handleMouseEnter
      }
      onMouseLeave={
        window.matchMedia("(min-width: 639px)").matches && handleMouseLeave
      }
    >
      <div>
        <TopBar
          isCollapsed={isCollapsed}
          onToggleSidebar={handleHamburgerClick}
        />

        {!isCollapsed ? (
          <div className="p-4">
            <NewConversationButton
              onAdd={addConversation}
              onToggleSidebar={handleHamburgerClick}
            />
          </div>
        ) : (
          <div className="p-6">
            <PiNotePencilBold className="text-gray-500" />
          </div>
        )}

        {!isCollapsed && (
          <ConversationList
            conversations={conversations}
            onDelete={deleteConversation}
            onToggleSidebar={handleHamburgerClick}
          />
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <FiLogOut size={18} />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
