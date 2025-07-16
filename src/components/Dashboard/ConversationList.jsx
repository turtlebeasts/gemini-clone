import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import useConversationStore from "../../store/conversationStore";

const ConversationList = ({ conversations, onToggleSidebar }) => {
  const navigate = useNavigate();
  const onDelete = useConversationStore((state) => state.deleteConversation);

  const handleClick = (id) => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      onToggleSidebar();
    }
    navigate(`/dashboard/${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id);
    navigate("/dashboard");
    toast.info("Chatroom deleted 🗑️");
  };

  return (
    <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
      <AnimatePresence>
        {conversations.length > 0 ? (
          conversations.map((conv) => (
            <motion.div
              key={conv.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="px-10 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800 transition flex justify-between items-center"
              onClick={() => handleClick(conv.id)}
            >
              <div>
                <div className="font-semibold">{conv.name}</div>
                <div className="text-sm text-zinc-400">{conv.lastMessage}</div>
                <div className="text-xs text-zinc-600">{conv.time}</div>
              </div>
              <button
                onClick={(e) => handleDelete(e, conv.id)}
                className="text-zinc-500 hover:text-red-500 transition"
              >
                <FiTrash2 />
              </button>
            </motion.div>
          ))
        ) : (
          <motion.div
            key="no-chats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-zinc-500 py-8"
          >
            No chats found.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConversationList;
