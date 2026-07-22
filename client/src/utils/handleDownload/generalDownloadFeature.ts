import type {ReportMetrics, UserReport} from "../../types/participantsTypes.tsx";

export function DataArrangement(
    brainstormingData: unknown,
    dailyLogData: unknown,
    userProfile: unknown
) {
    return {
        brainstormingData,
        dailyLogData,
        userProfile,
    };
}

export function normalizeUserId(userId: any) {
    if (userId === null || userId === undefined) {
        return "";
    }

    return String(userId).trim();
}

export function toTextList(value: any) {
    if (Array.isArray(value)) {
        const results = [];

        for (let i = 0; i < value.length; i++) {
            const item = String(value[i]).trim();
            if (item) {
                results.push(item);
            }
        }

        return results;
    }

    if (typeof value === "string" && value.trim()) {
        return [value.trim()];
    }

    if (typeof value === "number") {
        return [String(value)];
    }

    return [];
}

export function displayValue(value: any, fallback = "Not recorded") {
    const values = toTextList(value);
    return values.length > 0 ? values.join(", ") : fallback;
}

export function formatReportDate(dateValue?: string) {
    if (!dateValue) {
        return "Date not recorded";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function sortByLogDate(items: any[]) {
    return [...items].sort((first, second) => {
        return new Date(second.log_date).getTime() - new Date(first.log_date).getTime();
    });
}

export function buildReportFromServerData(reportData: any[]): UserReport[] {
    const reportUsers: UserReport[] = [];

    for (let i = 0; i < reportData.length; i++) {
        const item = reportData[i];

        reportUsers.push({
            user: item.profile_info || {},
            dailyLogs: sortByLogDate(item.daily_log || []),
            brainstormingSessions: sortByLogDate(item.brainstorming_ideas || []),
        });
    }

    return reportUsers;
}

export function buildReportMetricsFromServerData(reportData: any[]): ReportMetrics {
    const loggedUsers = new Set<string>();
    let dailyLogs = 0;
    let brainstormingSessions = 0;
    let totalTasks = 0;

    for (let i = 0; i < reportData.length; i++) {
        const item = reportData[i];
        const logs = item.daily_log || [];
        const ideas = item.brainstorming_ideas || [];

        if (logs.length > 0) {
            loggedUsers.add(normalizeUserId(item.profile_info?.user_id));
        }

        dailyLogs += logs.length;
        brainstormingSessions += ideas.length;

        for (let j = 0; j < logs.length; j++) {
            totalTasks += toTextList(logs[j].user_tasks).length;
        }
    }

    return {
        participants: reportData.length,
        loggedParticipants: loggedUsers.size,
        dailyLogs,
        brainstormingSessions,
        totalTasks,
    };
}
