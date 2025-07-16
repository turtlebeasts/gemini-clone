import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountrySelect from "../../components/Auth/CountrySelect";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore";
import { useState } from "react";
import SuccessCard from "../../components/Auth/SuccessCard";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
});

export default function SignupPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data) => {
    setLoggedIn(true);
    setUser(data);
  };

  if (loggedIn) return <SuccessCard />;
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="Your name"
              {...register("name")}
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Phone Number
            </label>
            <div className="flex">
              <CountrySelect />
              <input
                type="tel"
                className="w-2/3 px-4 py-2 border border-l-0 border-gray-400 rounded-r-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="Enter phone number"
                {...register("phone")}
              />
            </div>
            <p className="text-red-500">{errors.phone?.message}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition"
          >
            Sign Up
          </motion.button>
        </form>

        <h1 className="mt-6 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 cursor-pointer" to="/">
            Log In
          </Link>
        </h1>
      </div>
    </div>
  );
}
