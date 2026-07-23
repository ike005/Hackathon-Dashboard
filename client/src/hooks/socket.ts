
import { io, Socket } from "socket.io-client";

const baseUrl = import.meta.env.VITE_API_URL;

export const socket: Socket = io(baseUrl, {
    autoConnect: true,
    // Start with polling so the client can connect while the server is waking
    // up, then Socket.IO can upgrade to WebSocket when the server supports it.
    transports: ["polling", "websocket"],
    path: "/socket.io",
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1_000,
    reconnectionDelayMax: 5_000,
});

socket.on("connect", () => {
    console.log("✅ Connected");
    console.log(socket.id);
});

socket.on("disconnect", (reason) => {
    console.log("❌ Disconnected:", reason);
});

socket.on("connect_error", (err) => {
    console.log("❌ Connect error:", err);
});

socket.on("error", (err) => {
    console.log("Socket error:", err);
});

socket.on("server_error", (error) => {
    console.error("Server data error:", error.message);
});
