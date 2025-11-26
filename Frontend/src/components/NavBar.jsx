import { useState } from "react";
import { FaBell, FaCog, FaSearch, FaUsers } from "react-icons/fa";
import UserProfile from "./userProfile";
import { useAuth } from "../context/User";
import SearchContacts from "../pages/search";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-row md:flex-col items-center md:items-center bg-gray-900 text-gray-100 w-full md:w-16 p-2 border-b pt-5 md:border-b-0 md:border-r border-gray-800 space-y-8">

            <div className="relative">
                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="text-3xl hover:text-indigo-400 transition-colors duration-200"
                >
                    {auth?.user?.profilePic && auth.user.profilePic.trim() !== "" ?
                        <img src={auth.user.profilePic} className="w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer" /> :
                        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" className="w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer" />
                    }
                </button>
                {profileOpen && (
                    <UserProfile onClose={() => setProfileOpen(false)} />
                )}
            </div>

            <div className="mt-4">
                <button onClick={() => {navigate('/page/search')}} className="text-2xl hover:text-indigo-400 transition-colors duration-200">
                    <FaSearch />
                </button>
            </div>

             <div className="mt-4">
                <button className="text-2xl hover:text-indigo-400 transition-colors duration-200">
                    <FaUsers />
                </button>
            </div>

            <div className="relative mt-4">
                <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="text-2xl hover:text-indigo-400 transition-colors duration-200"
                >
                    <FaBell />
                </button>
                {notificationsOpen && (
                    <div className="absolute left-16 top-0 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 z-50">
                        <p className="text-gray-300 font-semibold mb-2">Friend Requests</p>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-700 rounded">
                                <span>Nayan Chaurasia</span>
                                <button className="text-indigo-400 px-2 py-0.5 rounded hover:bg-gray-700">Accept</button>
                            </div>
                            <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-700 rounded">
                                <span>John Doe</span>
                                <button className="text-indigo-400 px-2 py-0.5 rounded hover:bg-gray-700">Accept</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="mt-4">
                <button className="text-2xl hover:text-indigo-400 transition-colors duration-200">
                    <FaCog />
                </button>
            </div>


           

        </div>
    );
}
