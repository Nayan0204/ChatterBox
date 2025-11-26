import { useState, useEffect } from "react";
import ChatPage from "../components/chat";
import Contacts from "../components/contacts";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useAuth } from "../context/User";

export default function Main() {
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    async function loadContacts() {
      if (!auth?.token) return;

      const res = await axios.get("http://localhost:5000/chat/contacts", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setContacts(res.data);
    }
    loadContacts();
  }, [auth?.token]);

  return (
   <div className="h-screen w-screen bg-gray-950 text-gray-200 flex">

  {/* Left Icon Menu */}
  <div className="w-16 bg-gray-900 border-r border-[#1f2230]">
    <NavBar />
  </div>

  {/* Contacts Sidebar */}
  <div className="w-1/4 min-w-[250px] 
      bg-gray-900 border-r border-[#1f2230]">
    <Contacts
      contacts={contacts}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
    />
  </div>

  {/* Chat Section */}
  <div className="flex-1 bg-[#0f1117]">
    <ChatPage selectedUser={selectedUser} />
  </div>

</div>

  );
}

