import {useUsers} from "../hooks/useUsers.ts";
import {useDailyLog} from "../hooks/useDailyLog.ts";

import Container1 from "../components/overview/Container1.tsx"
import Container2 from "../components/overview/Container2.tsx"
import Container3 from "../components/overview/Container3.tsx"
import Container4 from "../components/overview/Container4.tsx"


const Dashboard = () => {
    const {usersData} = useUsers();
    const { usersDailyLogData: dailyLogData } = useDailyLog();

    return(
        <>
            <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen w-full">
                <div className="flex flex-col gap-4 px-3 sm:px-4 md:px-6 py-4 md:py-6 w-full min-h-[calc(100vh-3.5rem)] lg:min-h-[calc(100vh)] overflow-auto bg-[#F9F9FF]">

                    <div className="flex flex-row justify-between gap-2 pb-2 md:pb-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#000000]">Overview</h1>
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 h-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
                            <Container1 usersData={usersData} dailyLogData={dailyLogData}/>
                        </div>

                        <div className="w-full h-fit">
                            <Container2 dailyLogData={dailyLogData} />
                        </div>

                        <div className="w-full h-fit flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10">
                            <div className="w-full lg:w-1/2 min-w-0">
                                <Container3 dailyLogData={dailyLogData} />
                            </div>
                            <div className="w-full lg:w-1/2 min-w-0">
                                <Container4 dailyLogData={dailyLogData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;