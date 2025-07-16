import ChatMessage from "./ChatMessage";

const ChatMessagesList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto py-6 px-2 md:p-6 space-y-6">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatMessagesList;
