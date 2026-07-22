export interface Container1Props {
    usersData?: any | any[]
}

export interface ProfileInfo {
    profile_info?: {
        name?: string;
        github_link?: string;
        user_id?: string;
        username?: string;
        email?: string;
        gender?: string;
        age?: string;
    },

    user_interests?: string[],
    user_possible_project_impact?: string[],
    user_reason_for_interests?: string,
    user_techstack?: string[],
    user_techstack_interests?: string[],
    user_tools_utilized?: string[],
}

export interface UserReportProfile {
    user_id?: string | number;
    name?: string;
    username?: string;
    email?: string;
    age?: string | number;
    gender?: string;
    github_link?: string;
}

export interface UserDailyLog {
    _id?: string;
    user_id?: string | number;
    log_date?: string;
    day?: string | number;
    user_tasks?: any;
    user_feeling?: any;
    user_text_feeling?: string;
}

export interface UserBrainstormingSession {
    _id?: string;
    user_id?: string | number;
    log_date?: string;
    user_interests?: any;
    user_possible_project_impact?: any;
    user_reason_for_interests?: string;
    user_techstack?: any;
    user_techstack_interests?: any;
    user_tools_utilized?: any;
}

export interface UserReport {
    user: UserReportProfile;
    dailyLogs: UserDailyLog[];
    brainstormingSessions: UserBrainstormingSession[];
}

export interface ReportMetrics {
    participants: number;
    loggedParticipants: number;
    dailyLogs: number;
    brainstormingSessions: number;
    totalTasks: number;
}

export interface secondContainer {
    lineChartData: {
        label: string[];
        dailyCheckInData: number[];
        dailyCodeCommits: number[];
        dailyCodeCommits2: number[];
    };
}