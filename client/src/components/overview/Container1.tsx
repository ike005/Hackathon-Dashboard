import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import type {Container1Props} from "../../types/overviewTypes.ts";

import averageFeeling from "../../utils/averageFeeling.ts";
import gettingActiveUsers from "../../utils/gettingActiveUsers.ts";

function Container1 ({usersData}: Container1Props) {

    const {totalActiveParticipants, currentDate, totalParticipants} = gettingActiveUsers(usersData);

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
            numberOfPeople: ` ${totalActiveParticipants(usersData)}`,
            bgColor: "#EDEEFC",
        },
        {
            icon: AddReactionIcon,
            sectionName: "Average User Feeling",
            numberOfPeople: ` ${averageFeeling(usersData, currentDate)}`,
            bgColor: "#E6F1FD",
        },
        {
            icon: AddReactionIcon,
            sectionName: "Total Lines of Code",
            numberOfPeople: '12,000',
            bgColor: "#EDEEFC",
        },
    ]

    return (
        <>
            {FirstContainer.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-between w-full h-full rounded-3xl gap-4 p-6 hover:shadow-lg"
                    style={{backgroundColor: item.bgColor}}
                >
                    <div className="flex items-center w-full gap-4">
                        <div className="flex flex-col items-start w-full gap-2">
                            <h3 className="text-[#000000] font-light text-md">{item.sectionName}</h3>
                            <div className="flex flex-row justify-between w-[100%]">
                                <h1 className="text-3xl font-bold text-[#000000]">{item.numberOfPeople}</h1>
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