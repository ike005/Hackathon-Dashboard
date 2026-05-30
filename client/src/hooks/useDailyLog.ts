import {useEffect, useState} from "react";

export function useDailyLog() {

    const [usersDailyLogData, setUsersDailyLogData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:8080/api/users/daily_log");
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