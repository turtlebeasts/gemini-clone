import { PiNotePencilBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewConversationButton = ({ onAdd, onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const newId = Date.now().toString();
    const newChat = {
      id: newId,
      name: `New Chat ${newId.slice(-3)}`,
      lastMessage: "",
      time: "Just now",
    };

    onAdd(newChat);
    if (window.matchMedia("(max-width: 639px)").matches) {
      onToggleSidebar();
    }
    navigate(`/dashboard/${newId}`);
    toast.success("New conversation created");
  };

  return (
    <button
      onClick={handleCreate}
      className="w-full text-left text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition flex items-center"
    >
      <PiNotePencilBold className="text-gray-500 mr-2" /> New Conversation
    </button>
  );
};

export default NewConversationButton;
