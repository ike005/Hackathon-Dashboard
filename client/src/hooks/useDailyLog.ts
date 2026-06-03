import {useEffect, useState} from "react";

export function useDailyLog() {
    const baseUrl = import.meta.env.VITE_API_URL;

    const [usersDailyLogData, setUsersDailyLogData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${baseUrl}/api/users/daily_log`);
                console.log(response);
                if (!response.ok) throw new Error("Failed to fetch database");

                const jsonData = await response.json();
                setUsersDailyLogData(jsonData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { usersDailyLogData, loading} ;
}