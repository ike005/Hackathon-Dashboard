import { useEffect, useState } from "react";
import { socket } from "./socket.ts";

export function useUsers() {
    const [usersData, setUsersData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUsers = (users: any[]) => {
            console.log("Initial users:", users);
            setUsersData(users);
            setLoading(false);
        };

        const handleUserUpdate = (updatedUser: any) => {
            setUsersData((prev) => {
                const index = prev.findIndex(
                    (u) => u.user_id === updatedUser.user_id
                );

                if (index === -1) {
                    return [...prev, updatedUser];
                }

                const updated = [...prev];
                updated[index] = updatedUser;
                return updated;
            });
        };

        socket.on("users", handleUsers);
        socket.on("user_updated", handleUserUpdate);

        socket.emit("get_all_users");

        return () => {
            socket.off("users", handleUsers);
            socket.off("user_updated", handleUserUpdate);
        };
    }, []);

    return { usersData, loading };
}