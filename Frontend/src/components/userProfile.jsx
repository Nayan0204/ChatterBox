import { FaArrowLeft, FaPen } from "react-icons/fa";
import { useAuth } from "../context/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function UserProfileModal({ onClose }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(auth.user)

  // const handlePic = async () => {
  //   const res = await axios.put("http://localhost:5000/user/updateprofile" ,{

  //   } )
  // }
 
  const handleLogout = () => {

    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/")
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 w-96 z-50">
        <button
          onClick={onClose}
          className="absolute left-3 top-3 text-gray-400 hover:text-gray-200"
        >
          <FaArrowLeft />
        </button>

        <div className=" mt-4 flex justify-center items-end">
          <div className="relative">
            <img
              src={auth?.user?.profilePic?.trim() || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              className="w-28 h-28 rounded-full object-cover border border-gray-700 shadow-lg"
            />

            <button
              className=" absolute -bottom-3 -right-3 w-8 h-8 flex items-center justify-center text-gray-400 text-sm hover:text-gray-200 "
              onClick={handlePic}
            >
              <FaPen size={14} />
            </button>
          </div>


        </div>

        <h2 className="text-2xl font-semibold text-gray-100 text-center mt-3 mb-5">
          {auth?.user?.name}
        </h2>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full py-2 border-y my-2">
            <div className=" border-gray-700/50 ">
              <p className="text-gray-400 text-sm mb-1">Bio</p>
              <p className="text-gray-200 text-base leading-relaxed">
                {auth?.user?.bio || "No bio added yet."}
              </p>
            </div>
            <button className=" pr-4 text-gray-400 text-sm hover:text-gray-200 " onClick={handleBio}>
              <FaPen />
            </button>
          </div>


          <button className="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg text-gray-200">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-gray-800 rounded-lg text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

}
