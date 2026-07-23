import { useEffect, useState } from "react";
import { socket } from "./socket.ts";

export function useBrainstormingIdeas() {
    const [usersBrainstormingIdeas, setUsersBrainstormingIdeas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUsers = (users: any[]) => {
            setUsersBrainstormingIdeas(users);
            setLoading(false);
        };

        const handleUserUpdate = (updatedUser: any) => {
            setUsersBrainstormingIdeas((prev) => {
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

        socket.on("brainstorming_ideas", handleUsers);
        socket.on("brainstorming_updated", handleUserUpdate);

        socket.emit("get_all_users_info_with_brainstorming_ideas");

        return () => {
            socket.off("brainstorming_ideas", handleUsers);
            socket.off("brainstorming_updated", handleUserUpdate);
        };
    }, []);

    return { usersBrainstormingIdeas, loading };
}
