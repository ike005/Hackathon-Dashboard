import {useEffect, useState} from "react";

export function useUsers() {
    const baseUrl = import.meta.env.VITE_API_URL;

    const [usersData, setUsersData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${baseUrl}/api/users`);
                if (!response.ok) throw new Error("Failed to fetch database");

                const jsonData = await response.json();
                setUsersData(jsonData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    console.log(usersData[0]);


    return { usersData, loading} ;
}