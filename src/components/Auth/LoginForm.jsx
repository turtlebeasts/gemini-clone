import { motion } from "framer-motion";
import CountrySelect from "./CountrySelect";
import { Link } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../../store/authStore";

const schema = z.object({
  phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
});

export default function LoginForm({ setSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const setUser = useAuthStore((state) => state.setUser);
  const onSubmit = (data) => {
    setUser({ name: "Alex", ...data });
    setSubmit(true);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-semibold text-center mb-6 text-black">
        Login with OTP
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Phone Number
          </label>
          <div className="flex">
            <CountrySelect />
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-2/3 px-4 py-2 border border-l-0 border-gray-400 rounded-r-md focus:outline-none focus:ring-2 focus:ring-zinc-900"
              {...register("phone")}
            />
          </div>
          <p className="text-red-500">{errors.phone?.message}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className={`w-full py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition`}
        >
          Send OTP
        </motion.button>
      </form>
      <h1 className="mt-6 text-center">
        Don't have an account?{" "}
        <Link className="text-blue-500 cursor-pointer" to="/sign-up">
          Sign Up
        </Link>
      </h1>
    </div>
  );
}
