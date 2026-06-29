import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import AuthContext from "../provider/authContext.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ব্যাকএন্ড স্কিমা অনুযায়ী name, email, phone, password পাঠানো হচ্ছে
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });

      // রেজিস্ট্রেশন সফল হলে সরাসরি লগইন স্টেট সিঙ্ক করা
      login(res.data.user, res.data.token);

      toast.success("Account Created Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-[#fafafa] px-4 py-8">
      <div className="w-full max-w-sm premium-card p-8 bg-white">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800">
            Create Account
          </h2>
          <p className="text-neutral-500 text-xs mt-1">
            Join us to explore and order delicious meals
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-neutral-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Abdullah Al Noman"
              className="w-full p-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all placeholder:text-neutral-400"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all placeholder:text-neutral-400"
              required
            />
          </div>

          {/* 💡 ফোন নাম্বার ইনপুট ফিল্ড (স্কিমা রেডি) */}
          <div>
            <label className="block text-neutral-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01700000000"
              className="w-full p-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all placeholder:text-neutral-400"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all placeholder:text-neutral-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-2.5 text-sm font-bold shadow-xs active:scale-[0.99] transition-transform"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-xs text-center text-neutral-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-neutral-800 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
