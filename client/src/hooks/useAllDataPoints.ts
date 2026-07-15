import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./socket";

export function useAllDataPoints() {
    const { user_id } = useParams();
    const [usersData, setUsersData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user_id) return;

        const handleUserInfo = (data: any) => {
            console.log("Received user data:", data);
            setUsersData(data);
            setLoading(false);
        };

        const handleUserUpdate = (updatedUser: any) => {
            if (updatedUser.user_id == user_id) {
                setUsersData((prev: any) => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        profile_info: updatedUser,
                    };
                });
            }
        };

        socket.on("user_info", handleUserInfo);
        socket.on("user_updated", handleUserUpdate);

        socket.emit("get_a_unique_user_data", user_id);

        return () => {
            socket.off("user_info", handleUserInfo);
            socket.off("user_updated", handleUserUpdate);
        };
    }, [user_id]);

    // console.log("usersData:", usersData);

    return {
        usersData,
        loading,
    };
}