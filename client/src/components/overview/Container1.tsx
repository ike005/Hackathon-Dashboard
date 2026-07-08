import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import type {Container1Props} from "../../types/overviewTypes.ts";

import {averageUserFeeling, feelingPercentage} from "../../utils/feelingLogic.ts";
import gettingActiveUsers from "../../utils/gettingActiveUsers.ts";
import {trackActiveUsers} from "../../utils/analytics.ts";



function Container1 ({usersData, dailyLogData}: Container1Props) {

    const {totalParticipants} = gettingActiveUsers(usersData);
    const currentActiveUsers = trackActiveUsers({ dailyLogData });
    const {averageFeeling } = averageUserFeeling(dailyLogData ?? []);
    feelingPercentage(dailyLogData ?? []);

    const FirstContainer = [
        {
            icon: PeopleAltSharpIcon,
            sectionName: "Total Users",
            numberOfPeople: ` ${totalParticipants}`,
            bgColor: "#E6F1FD",
        },
        {
            icon: PeopleAltSharpIcon,
            sectionName: "Active Users",
            numberOfPeople: `${currentActiveUsers.currentlyActiveUsers}`,
            bgColor: "#EDEEFC",
        },
        {
            icon: AddReactionIcon,
            sectionName: "Average User Feeling",
            numberOfPeople: ` ${averageFeeling}`,
            bgColor: "#E6F1FD",
        },
        {
            icon: AddReactionIcon,
            sectionName: "Checkin Percentage",
            numberOfPeople: ` ${(currentActiveUsers.currentlyActiveUsers / totalParticipants * 100).toFixed(1)}%`,
            bgColor: "#EDEEFC",
        },
    ]

    return (
        <>
            {FirstContainer.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-between w-full min-h-[7rem] rounded-2xl md:rounded-3xl gap-3 md:gap-4 p-4 md:p-6 hover:shadow-lg"
                    style={{backgroundColor: item.bgColor}}
                >
                    <div className="flex items-center w-full gap-3 md:gap-4">
                        <div className="flex flex-col items-start w-full gap-1 md:gap-2">
                            <h3 className="text-[#000000] font-light text-sm md:text-md">{item.sectionName}</h3>
                            <div className="flex flex-row justify-between w-full items-center">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#000000]">{item.numberOfPeople}</h1>
                                <item.icon fontSize="medium" className="text-[#9CA3AF]"/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Container1;