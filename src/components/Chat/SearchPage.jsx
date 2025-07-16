import { useState, useEffect } from "react";
import useConversationStore from "../../store/conversationStore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const { conversations } = useConversationStore();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(conversations);

  useEffect(() => {
    const delay = setTimeout(() => {
      const results = conversations.filter((chat) =>
        chat.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, conversations]);

  const handleClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className="p-12 py-20 h-full flex flex-col px-4 md:px-56">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search conversations..."
        className="w-full mb-4 p-2 pl-10 rounded-4xl bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none"
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 scrollbar-thumb-rounded-full space-y-2">
        <AnimatePresence>
          {filtered.length > 0 ? (
            filtered.map((conv) => (
              <motion.div
                key={conv.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleClick(conv.id)}
                className="flex p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800 cursor-pointer justify-between"
              >
                <div className="font-semibold">{conv.name}</div>
                <div className="text-xs text-zinc-600">{conv.time}</div>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-zinc-500 text-center mt-8"
            >
              No conversations found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;
