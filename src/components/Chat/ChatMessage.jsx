import { motion } from "framer-motion";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      alert("Clipboard API is not supported on this device or browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert("Failed to copy: " + err.message);
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isUser ? (
        <div className="bg-zinc-700 text-white px-4 py-2 rounded-2xl sm:max-w-[90%] md:max-w-[50%]">
          <div>{message.text}</div>
          <div className="text-xs text-zinc-300 mt-1 text-right">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
          {message.image && (
            <img
              src={message.image}
              alt="Sent"
              className="rounded-md mt-2 max-w-[200px] border border-zinc-700"
            />
          )}
        </div>
      ) : (
        <div className="relative text-white text-sm max-w-[80%] opacity-90 leading-relaxed p-2 pr-8">
          <p className="whitespace-pre-wrap">{message.text}</p>

          {!copied ? (
            <button
              onClick={handleCopy}
              className="p-2 bg-zinc-900/70 rounded-full hover:bg-zinc-700 transition text-zinc-300 hover:text-white z-20 active:scale-95"
              title="Copy to clipboard"
              style={{ touchAction: "manipulation" }}
            >
              <MdContentCopy size={18} />
            </button>
          ) : (
            <div className="text-gray-400">Copied!</div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
