import {User, SquareTerminal} from "lucide-react"
import {useAllDataPoints} from "../hooks/useAllDataPoints.ts";


import StepperContainer from "../components/profilepage/StepperContainer.tsx";
import IdeaStepperContainer from "../components/profilepage/IdeaStepperContainer.tsx";

type ProfileInfo = {
    name?: string;
    github_link?: string;
    user_id?: string;
    username?: string;
    email?: string;
    gender?: string;
};


type UserData = { profile_info?: ProfileInfo };


const ProfilesPage = () => {

    const {usersData} = useAllDataPoints() as { usersData: UserData };

    return (
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)] lg:min-h-screen w-full bg-[#F9F9FF] overflow-auto">

            <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6 xl:justify-between xl:items-start">

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 min-w-0">

                    <div className="border-2 border-[#000000] rounded-lg size-24 sm:size-28 lg:size-[8rem] shrink-0 flex justify-center items-center mx-auto sm:mx-0">
                        <User className="text-[#000000] size-10 sm:size-12 lg:size-16"/>
                    </div>

                    <div className="flex flex-col justify-between gap-3 min-w-0 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-between sm:items-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide break-words">{usersData?.profile_info?.name}</h1>
                        </div>

                        <p className="flex flex-row items-center justify-center sm:justify-start min-w-0">
                            <SquareTerminal className="mr-1 size-5 sm:size-6 text-[#000000] font-semibold shrink-0" strokeWidth={2.5}/>
                            <a href={usersData?.profile_info?.github_link} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base truncate">{usersData?.profile_info?.github_link}</a>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-center justify-center sm:justify-start">

                            <p className="text-sm sm:text-base"> <span className="text-[#135BEC] font-semibold">2/2</span> Checkins</p>

                            <p className="text-sm sm:text-base">😁 todays feeling</p>

                        </div>
                    </div>

                </div>

                <div className="w-full xl:w-fit xl:max-w-md shrink-0">
                    <div className="flex flex-col gap-1 text-sm sm:text-base text-center lg:text-left">
                        <p><span className="font-semibold">Discord ID:</span> {usersData?.profile_info?.user_id}</p>
                        <p><span className="font-semibold">Discord Username:</span> {usersData?.profile_info?.username}</p>
                        <p className="break-all"><span className="font-semibold">Email:</span> {usersData?.profile_info?.email}</p>
                        <p><span className="font-semibold">Gender:</span> {usersData?.profile_info?.gender}</p>

                    </div>
                </div>

            </div>

            <div className="flex flex-col-reverse lg:flex-row w-full p-4 sm:p-6 gap-6 xl:gap-8 xl:justify-between xl:items-start" >
                <div className="flex flex-col gap-6 lg:gap-10 w-full xl:w-[62%] min-w-0 xl:h-[calc(100vh-6rem)] xl:overflow-auto">
                    <div className="flex lg:hidden items-center justify-center bg-amber-400">
                        <h2 className="text-center font-semibold text-lg text-[#135BEC]">Daily Logs</h2>
                    </div>
                    <StepperContainer usersData={usersData}/>
                </div>

                <div className="flex flex-col gap-6 lg:gap-10 w-full xl:w-[35%] min-w-0 xl:h-[calc(100vh-6rem)] xl:overflow-auto">
                    <IdeaStepperContainer usersData={usersData}/>
                </div>
            </div>


        </div>
    );
}

export default ProfilesPage;
