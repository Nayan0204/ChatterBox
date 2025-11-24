import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserProfileModal({ onClose }) {
    const [auth , setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
     
      setAuth({
        ...auth,
        user: null,
        token:''
      })
       localStorage.removeItem("auth");
       toast.success("Logged out successfully");
      navigate("/")
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 w-80 z-50">
        <button
          onClick={onClose}
          className="absolute left-3 top-3 text-gray-400 hover:text-gray-200"
        >
          <FaArrowLeft />
        </button>

        <h2 className="text-xl font-semibold text-gray-100 text-center mb-6">
          User Settings
          {auth.user.name}
        </h2>

        <div className="flex flex-col gap-3">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-200">
            Edit Profile
          </button>

          <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-200">
            Change Bio
          </button>

          <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
