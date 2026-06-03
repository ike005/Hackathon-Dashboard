import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

export function useAllDataPoints() {
    const baseUrl = import.meta.env.VITE_API_URL;

    const { user_id } = useParams();

    const [usersData, setUsersData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${baseUrl}/api/users/${user_id}`);
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


    return { usersData, loading} ;
}