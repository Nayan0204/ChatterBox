import { useEffect, useState } from "react";
import { getSocket } from "../socket";
import axios from "axios";
import { useAuth } from "../context/User";

export default function ChatPage({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [auth] = useAuth();
  const socket = getSocket();

  // Load old chat history
  useEffect(() => {
    if (!selectedUser) return;

    async function loadChat() {
      const res = await axios.get(
        `http://localhost:5000/chat/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setMessages(res.data);
    }

    loadChat();
  }, [selectedUser]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    const handler = (msg) => {
      if (
        msg.from === selectedUser._id ||
        msg.to === selectedUser._id
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive-message", handler);

    return () => {
      socket.off("receive-message", handler);
    };
  }, [socket, selectedUser]);

  // Sending message
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit(
      "send-message",
      { to: selectedUser._id, text },
      (ack) => {
        if (ack.ok) {
          setMessages((prev) => [...prev, ack.message]);
        }
      }
    );

    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-4">

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-xs ${
              msg.from === auth.user._id ? "bg-indigo-600 ml-auto" : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 bg-gray-800 p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-indigo-600 px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
