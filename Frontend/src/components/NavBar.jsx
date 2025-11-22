import { useState } from "react";
import { FaUserCircle, FaBell, FaCog, FaUsers } from "react-icons/fa";

export default function NavBar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex flex-row md:flex-col items-center md:items-center bg-gray-800 text-gray-100 w-full md:w-16 p-2 border-b md:border-b-0 md:border-r border-gray-700">
      
      {/* User Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="text-3xl hover:text-indigo-400 transition-colors duration-200"
        >
          <FaUserCircle />
        </button>
        {profileOpen && (
          <div className="absolute left-16 top-0 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 z-50">
            <button className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
              Edit Profile
            </button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
              Change Bio
            </button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Notifications */}
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

      {/* Settings */}
      <div className="mt-4">
        <button className="text-2xl hover:text-indigo-400 transition-colors duration-200">
          <FaCog />
        </button>
      </div>

      {/* Group Chats */}
      <div className="mt-4">
        <button className="text-2xl hover:text-indigo-400 transition-colors duration-200">
          <FaUsers />
        </button>
      </div>

    </div>
  );
}
