export interface Container1Props{
    usersData: any[];
    dailyLogData?: any[];
}

export interface secondContainer {
    lineChartData: {
        label: string[];
        dailyCheckInData: number[];
        dailyCodeCommits: number[];
        dailyCodeCommits2: number[];
    };
}

export interface Container7Props {
    data?: any[]
}

export interface Container4SideLabelInfo {
    label: string;
    value: number;
}

export interface ProfileInfo {
    name?: string;
    github_link?: string;
    user_id?: string;
    username?: string;
    email?: string;
    gender?: string;
}
