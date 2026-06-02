// import {Container5, Container6, Container7} from '../components/Containers.tsx';
// import Navbar from "../components/navbar.tsx";
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
            <div className="h-[100vh] w-full">
                <div className="flex flex-col gap-4 px-4 md:px-6 py-4 md:py-6 w-full h-[calc(118vh-6rem)] overflow-auto bg-[#F9F9FF]">

                    <div className="flex flex-row justify-between gap-2 pb-4">
                        <h1 className="text-1xl md:text-2xl lg:text-5xl  font-bold text-[#000000]">Overview</h1>
                    </div>

                    <div className="flex flex-col gap-10 h-full">
                        <div className="flex flex-col md:flex-row gap-10">
                            <Container1 usersData={usersData} dailyLogData={dailyLogData}/>
                        </div>

                        <div className="w-[100%] h-fit">
                            <Container2 dailyLogData={dailyLogData} />
                        </div>

                        <div className="w-[100%] h-fit flex flex-row justify-between gap-10">
                            <div className="flex flex-row w-[100%] gap-10">
                                <Container3 dailyLogData={dailyLogData} />
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