import {useEffect, useState} from "react";
import {socket} from "./socket.ts";

export function useAllUsersReport() {
    const [reportData, setReportData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleReportData = (data: any[]) => {
            setReportData(data);
            setLoading(false);
        };

        socket.on("all_users_report_data", handleReportData);
        socket.emit("get_all_users_report_data");

        return () => {
            socket.off("all_users_report_data", handleReportData);
        };
    }, []);

    return {reportData, loading};
}
