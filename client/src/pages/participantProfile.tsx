import {Link, useParams} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaRegUserCircle } from "react-icons/fa";

const ParticipantProfile = () => {

    const {id} = useParams();

    return (
        <div className="flex flex-col h-[100vh] w-full bg-[#111827] text-[#FFFFFF] p-4">
            <h1>Participant Profile</h1>
            <p>User ID: {id}</p>

            <div className="flex flex-row justify-between">

                <div className="bg-[#1F2937] w-[20vw] h-[20rem] flex flex-col items-center justify-center rounded-xl border-2 border-[#282E38]">
                    {/*<div className="relative bg-red-500 size-[10rem]">*/}
                    {/*    <AccountCircleIcon className="w-[10rem] h-[8rem]" />*/}
                    {/*    <p className="size-[1rem] bg-yellow-400 absolute"></p>*/}
                    {/*</div>*/}

                    <div className="relative bg-transparent size-[10rem] flex items-center justify-center">
                        <FaRegUserCircle className="w-[7rem] h-[7rem]" />
                        <p className="absolute bottom-7 right-8 w-5 h-5 bg-green-400 rounded-full border-3 border-[#161C22]"></p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-semibold">Chibuike Anyiam</h2>
                        <p className="text-sm text-[#AAAFB8]">Discord {id}</p>
                        <p className="text-sm text-[#AAAFB8]">Github github.ike005.com</p>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className="h-[20rem] w-[60vw] bg-transparent flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-semibold">Progress & Reflections</h2>
                        <p className="text-[#0D59F2] font-semibold">View All</p>
                    </div>

                    <div>
                        <div className="flex w-full h-[14rem] bg-[#374152] rounded-lg border-4 border-[#282E38]">
                            <div className="bg-"></div>

                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}


export default ParticipantProfile;