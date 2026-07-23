
import { io, Socket } from "socket.io-client";

const baseUrl = import.meta.env.VITE_API_URL;

export const socket: Socket = io(baseUrl, {
    autoConnect: true,
    transports: ["polling", "websocket"],
    path: "/socket.io",
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