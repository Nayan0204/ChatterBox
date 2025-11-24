

export default function Contacts({ contacts, selectedUser, setSelectedUser }) {
  const profileFallback = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <div className="w-full bg-gray-900 border-r border-gray-700 overflow-y-auto" >

      <h2 className="text-xl text-gray-200 font-semibold p-4 border-b border-gray-700">
        Contacts
      </h2>

      {contacts.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-800 transition
            ${selectedUser?._id === user._id ? "bg-gray-800" : ""}
          `}
        >
          <img
            src={user.profilePic || profileFallback}
            onError={(e) => (e.target.src = profileFallback)}
            className="w-12 h-12 rounded-full object-cover border border-gray-700"
          />

          <div>
            <p className="text-gray-200 font-medium">{user.name}</p>
            <p className="text-gray-400 text-sm">Tap to chat</p>
          </div>
        </div>
      ))}
    </div>
  );
}
