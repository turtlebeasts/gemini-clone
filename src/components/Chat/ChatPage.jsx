import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useChatStore from "../../store/chatStore";
import ChatMessagesList from "./ChatMessageList";
import MessageInput from "./MessageInput";

const ChatPage = () => {
  const { chatId } = useParams();
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const chatHistory = messages[chatId] || [];

  const handleSend = ({ text, image }) => {
    addMessage(chatId, {
      text,
      image,
      sender: "user",
      timestamp: new Date().toISOString(),
    });

    setTimeout(() => {
      addMessage(chatId, {
        text: "This is a simulated Gemini response 🤖",
        sender: "bot",
        timestamp: new Date().toISOString(),
      });
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory.length, chatId]);

  return (
    <div className="flex flex-col h-full px-4 md:px-56 pb-10">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <ChatMessagesList messages={chatHistory} />
        <div ref={messagesEndRef} />
      </div>
      <MessageInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
