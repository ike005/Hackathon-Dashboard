import {Link} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaRegUserCircle } from "react-icons/fa";
import {User, SquareTerminal} from "lucide-react"
import {useAllDataPoints} from "../hooks/useAllDataPoints.ts";


import StepperContainer from "../components/participantprofile/StepperContainer.tsx";

const ParticipantProfile = () => {

    const {usersData} = useAllDataPoints();

    return (
        <div className="flex flex-col h-[100vh] w-full bg-[#F9F9FF] overflow-auto">

            <div className=" p-6">

                <div className=" flex flex-row gap-10">

                    <div className="border-2 border-[#000000] rounded-lg size-[8rem] flex justify-center items-center">
                        <User className="text-[#000000] size-16"/>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex flex-row gap-4 justify-between items-center">
                            <h1 className="text-4xl font-bold tracking-wide">{usersData?.profile_info?.name}</h1>
                            <div className="bg-[#87F2E4] px-4 rounded-2xl text-[#000000] font-semibold text-xl">ACTIVE</div>
                        </div>

                        <p className="flex flex-row items-center">
                            <SquareTerminal className="mr-1 size-6 text-[#000000] font-semibold" strokeWidth={2.5}/>
                            <Link to={"/"} className="text-base">https://github.com/ike005</Link>
                        </p>

                        <div className="flex flex-row gap-4 items-center">

                            <p> <span className="text-[#135BEC] font-semibold">2/2</span> Checkins</p>

                            <p>😁 todays feeling</p>

                        </div>
                    </div>

                </div>

                <div></div>

            </div>

            <div className="flex flex-row w-full p-6" >
                <div className="flex flex-col gap-10 w-[70%] h-[calc(100vh-6rem)] overflow-auto">
                    <StepperContainer/>
                </div>

                <div className="flex flex-col gap-10 w-[30%] bg-green-500 h-[100%]">

                </div>
            </div>


        </div>
    );
}
// C9C6D9

export default ParticipantProfile;