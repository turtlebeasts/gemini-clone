import { create } from "zustand";
import { persist } from "zustand/middleware";

const useConversationStore = create(
  persist(
    (set) => ({
      conversations: [],

      addConversation: (chat) =>
        set((state) => ({
          conversations: [chat, ...state.conversations],
        })),

      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "conversations-storage",
    }
  )
);

export default useConversationStore;
