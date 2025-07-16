import { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

const MessageInput = ({ input, setInput, onSend }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const send = () => {
    if (!input.trim() && !image) return;

    onSend({
      text: input.trim(),
      image: image || null,
    });

    setInput("");
    setImage(null);
  };

  return (
    <div className="p-4 border-2 border-gray-500 gap-2 rounded-4xl">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <textarea
        rows={1}
        placeholder="Ask Gemini"
        className="flex-1 p-2 text-white focus:outline-none w-full bg-transparent resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {image && (
        <div className="mt-2 relative w-40">
          <img
            src={image}
            alt="preview"
            className="rounded-md border border-zinc-700"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-0 right-0 p-1 bg-zinc-800 text-white rounded-full"
          >
            ✕
          </button>
        </div>
      )}

      <div className="w-full flex justify-between items-center mt-3">
        <button
          onClick={handleAddImageClick}
          className="p-4 hover:bg-zinc-800 rounded-full transition-all z-50"
        >
          <IoMdAdd />
        </button>
        <button
          onClick={send}
          className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition-all"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
