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

  // Load contacts
  useEffect(() => {
    async function loadContacts() {
      if (!auth?.token) return;

      const res = await axios.get("http://localhost:5000/chat/contacts", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setContacts(res.data);
    }

    loadContacts();
  }, [auth?.token]);

  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-100 flex flex-row">

      <div className="w-16 bg-gray-800 border-r border-gray-700">
        <NavBar />
      </div>

      <div className="w-1/4 min-w-[250px] bg-gray-800 border-r border-gray-700">
        <Contacts
          contacts={contacts}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <div className="flex-1">
        <ChatPage selectedUser={selectedUser} />
      </div>
    </div>
  );
}
