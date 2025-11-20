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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const res = await axios.post("http://localhost:5000/auth/api/login", {
        email,
        password,
       })

        toast.success("Login successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/main");

    } catch (error) {
      console.log("Login error", error);
      toast.error( error.response?.data?.error || "Login failed. Please try again.");
    } 
  }

  return (
    <div>
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}> 
          <div>
            <label>Email:</label>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          </div>

          <div>
            <label>Password:</label>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type = "submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
