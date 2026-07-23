import { useEffect, useState } from "react";
import { socket } from "./socket.ts";

export function useDailyLog() {
    const [usersDailyLogData, setUsersDailyLogData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUsers = (users: any[]) => {
            setUsersDailyLogData(users);
            setLoading(false);
        };

        const handleUserUpdate = (updatedUser: any) => {
            setUsersDailyLogData((prev) => {
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

        socket.on("daily_log", handleUsers);
        socket.on("daily_log_updated", handleUserUpdate);

        socket.emit("get_all_users_daily_log");

        return () => {
            socket.off("daily_log", handleUsers);
            socket.off("daily_log_updated", handleUserUpdate);
        };
    }, []);

    return { usersDailyLogData, loading };
}