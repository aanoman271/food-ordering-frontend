import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import AuthContext from "../provider/authContext.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      login(res.data.user, res.data.token);

      toast.success("Login Successful!");

      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Credentials");
    }
  };

  const handleDemoLogin = (type) => {
    if (type === "admin") {
      setEmail("admin@gmail.com");
      setPassword("Noman123");
    } else if (type === "customer") {
      setEmail("customer@gmail.com");
      setPassword("Noman123");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#fafafa] px-4">
      <div className="w-full max-w-sm premium-card p-8 bg-white">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800">
            Welcome Back
          </h2>
          <p className="text-neutral-500 text-xs mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            Sign In
          </button>
        </form>

        {/* 🛠️ DEMO LOGIN BUTTONS */}
        <div className="mt-6 pt-6 border-t border-neutral-100 space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 text-center mb-3">
            Quick Demo Login
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-xl hover:bg-neutral-100 hover:border-neutral-300 transition active:scale-[0.98] cursor-pointer"
            >
              🔑 Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("customer")}
              className="px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-xl hover:bg-neutral-100 hover:border-neutral-300 transition active:scale-[0.98] cursor-pointer"
            >
              👤 Customer Demo
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-6 text-xs text-center text-neutral-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-neutral-800 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
