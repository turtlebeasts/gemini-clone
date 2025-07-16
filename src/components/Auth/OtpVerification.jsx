import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function OtpVerificationPage({ onSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = val;
    setOtp(updatedOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      onSubmit(true);
    } else {
      alert("❌ Invalid OTP");
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-900 flex items-center justify-center px-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Enter the 6-digit OTP
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6"
        >
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="w-10 h-12 text-center text-xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition"
          >
            Verify OTP
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
