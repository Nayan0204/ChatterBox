import toast from "react-hot-toast";
import { useAuth } from "../context/User";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [auth, setAuth] = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/api/login", {
        email,
        password,
      })

      toast.success("Login successful");
      setAuth({
        user: res.data.user,
        token: res.data.token,
      })

      console.log("login with user passed " , res.data.user);

      localStorage.setItem("auth", JSON.stringify({
        user: res.data.user,
        token: res.data.token,
      }));
      navigate("/page/main");
      

    } catch (error) {
      console.log("Login error", error);
      toast.error(error.response?.data?.error || "Login failed. Please try again.");
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
    
    <div className="hidden md:flex flex-col w-1/2 text-gray-200 px-10">
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Welcome to ChatterBox.
      </h1>
      <p className="text-lg text-gray-300 mb-4">
        Your go-to platform for seamless communication and meaningful connections.
      </p>
      <p className="text-gray-400">
        Don't have an account?{" "}
        <a 
          href="/register" 
          className="text-indigo-400 hover:text-indigo-300 underline">
          Sign Up
        </a>
      </p>
    </div>

    <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
        Sign In
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);

}
