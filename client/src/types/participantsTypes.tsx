export interface Container1Props {
    usersData?: any | any[]
}

export interface ProfileInfo {
    profileData?: {
        name?: string;
        github_link?: string;
        user_id?: string;
        username?: string;
        email?: string;
        gender?: string;
    }
}

export interface secondContainer {
    lineChartData: {
        label: string[];
        dailyCheckInData: number[];
        dailyCodeCommits: number[];
        dailyCodeCommits2: number[];
    };
}