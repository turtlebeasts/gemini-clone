import { motion } from "framer-motion";
import useAuthStore from "../../store/authStore";

const WelcomePage = () => {
  const user = useAuthStore((state) => state.user);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex items-center justify-center h-full text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-400">
          Welcome to Gemini Clone
        </h1>
        <p className="text-zinc-400 text-lg">
          {greeting}, {user?.name} 👋
        </p>
        <p className="text-zinc-500 mt-2 text-sm">
          Select a conversation or start a new one to begin chatting with your
          AI assistant.
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
