import { io } from "socket.io-client";

let socket = null;

export function connectSocket(token) {
  if (!token) return null;

  // Connect only once
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
  }

  return socket;
}

export function getSocket() {
  return socket;
}
