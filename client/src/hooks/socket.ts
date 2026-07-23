
import { io, Socket } from "socket.io-client";

const baseUrl = import.meta.env.VITE_API_URL;

export const socket: Socket = io(baseUrl, {
    autoConnect: true,
    // The deployed Render service responds to Socket.IO polling but does not
    // complete its WebSocket upgrade. Keeping this polling-only avoids a
    // failed upgrade disconnecting the dashboard while retaining real-time
    // Socket.IO events.
    transports: ["polling"],
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
