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
        <div className="flex flex-col h-[100vh] w-full bg-[#F9F9FF] overflow-auto">

            <div className="flex flex-row p-6 justify-between items-center">

                <div className=" flex flex-row gap-10">

                    <div className="border-2 border-[#000000] rounded-lg size-[8rem] flex justify-center items-center">
                        <User className="text-[#000000] size-16"/>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex flex-row gap-4 justify-between items-center">
                            <h1 className="text-4xl font-bold tracking-wide">{usersData?.profile_info?.name}</h1>
                            {/*<div className="bg-[#87F2E4] px-4 rounded-2xl text-[#000000] font-semibold text-xl">ACTIVE</div>*/}
                        </div>

                        <p className="flex flex-row items-center">
                            <SquareTerminal className="mr-1 size-6 text-[#000000] font-semibold" strokeWidth={2.5}/>
                            <a href={usersData?.profile_info?.github_link} target="_blank" rel="noopener noreferrer" className="text-base">{usersData?.profile_info?.github_link}</a>
                        </p>

                        <div className="flex flex-row gap-4 items-center">

                            <p> <span className="text-[#135BEC] font-semibold">2/2</span> Checkins</p>

                            <p>😁 todays feeling</p>

                        </div>
                    </div>

                </div>

                <div className=" w-fit h-[100%]">
                    <div className="flex flex-col">
                        <p className="text-base"><span className="font-semibold">Discord ID:</span> {usersData?.profile_info?.user_id}</p>
                        <p className="text-base"><span className="font-semibold">Discord Username:</span> {usersData?.profile_info?.username}</p>
                        <p className="text-base"><span className="font-semibold">Email:</span> {usersData?.profile_info?.email}</p>
                        <p className="text-base"><span className="font-semibold">Gender:</span> {usersData?.profile_info?.gender}</p>

                    </div>
                </div>

            </div>

            <div className="flex flex-row w-full p-6 justify-between items-center" >
                <div className="flex flex-col gap-10 w-[62%] h-[calc(100vh-6rem)] overflow-auto">
                    <StepperContainer usersData={usersData}/>
                </div>

                <div className="flex flex-col gap-10 w-[35%] h-[calc(100vh-6rem)] overflow-auto">
                    <IdeaStepperContainer usersData={usersData}/>
                </div>
            </div>


        </div>
    );
}

export default ProfilesPage;