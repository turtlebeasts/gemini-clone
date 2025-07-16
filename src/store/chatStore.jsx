// store/chatStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChatStore = create(
  persist(
    (set, get) => ({
      messages: {},

      addMessage: (conversationId, message) => {
        const currentMessages = get().messages[conversationId] || [];
        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: [...currentMessages, message],
          },
        }));
      },

      getMessagesByConversation: (conversationId) => {
        return get().messages[conversationId] || [];
      },
    }),
    {
      name: "chat-session",
      storage: {
        getItem: (name) => JSON.parse(sessionStorage.getItem(name)),
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export default useChatStore;
