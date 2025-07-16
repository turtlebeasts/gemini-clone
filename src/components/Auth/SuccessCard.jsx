import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuccessCard = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate("/dashboard");
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-700 text-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-4">
            <FaCheck className="text-white text-xl" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Logged in successfully!</h2>
        <p className="text-center mt-2 text-sm text-gray-300">
          Redirecting in <span className="font-bold text-white">{count}</span>
          ...
        </p>
      </div>
    </div>
  );
};

export default SuccessCard;
