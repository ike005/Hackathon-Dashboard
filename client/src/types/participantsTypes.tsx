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

export interface secondContainer {
    lineChartData: {
        label: string[];
        dailyCheckInData: number[];
        dailyCodeCommits: number[];
        dailyCodeCommits2: number[];
    };
}