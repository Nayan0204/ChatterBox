import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/api/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful");
      navigate("/");

    } catch (error) {
      console.log("Registration error", error);
      toast.error(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">

      {/* LEFT SIDE INFO */}
      <div className="hidden md:flex flex-col w-1/2 text-gray-200 px-10">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to ChatterBox.
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Your go-to platform for seamless communication and meaningful connections.
        </p>
        <p className="text-gray-400">
          Already have an account?{" "}
          <a href="/" className="text-indigo-400 hover:text-indigo-300 underline">
            Sign In
          </a>
        </p>
      </div>

      {/* FORM */}
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white 
            font-semibold rounded-lg transition-all duration-200 shadow-lg"
          >
            Register
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
