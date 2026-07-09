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

export interface Container2Props {
    dailyLogData: any[]
}
