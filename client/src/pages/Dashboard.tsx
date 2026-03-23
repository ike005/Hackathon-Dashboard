// import {Container5, Container6, Container7} from '../components/Containers.tsx';
// import Navbar from "../components/navbar.tsx";
import {useUsers} from "../hooks/useUsers.ts";

import Container1 from "../components/overview/Container1.tsx"
import Container2 from "../components/overview/Container2.tsx"
import Container3 from "../components/overview/Container3.tsx"
import Container4 from "../components/overview/Container4.tsx"


const Dashboard = () => {

    const {usersData} = useUsers();

    return(
        <>
            <div className="flex flex-col gap-4 px-4 md:px-6 py-4 md:py-6 h-[150vh] w-full bg-[#111827] overflow-auto">

                <div className="flex flex-row justify-between gap-2 pb-4">
                    <h1 className="text-1xl md:text-2xl font-bold text-[#FFFFFF]">Overview</h1>
                    <select name="fruits" id="fruits" className="text-[#FFFFFF]">
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="cherry">Cherry</option>
                    </select>
                </div>

                <div className="flex flex-col gap-10 h-full">
                    <div className="flex flex-col md:flex-row gap-10">
                        <Container1 usersData={usersData}/>
                    </div>




                    {/*<div className="flex flex-col gap-6 lg:flex-row w-[100%] justify-between my-6">*/}
                    {/*    <Container2 usersData={usersData}/>*/}
                    {/*    /!*<Container3 usersData={usersData}/>*!/*/}
                    {/*    <div className="flex flex-col w-[100%] lg:w-[40%] gap-4">*/}
                    {/*        <Container3 usersData={usersData}/>*/}
                    {/*        <Container4 usersData={usersData}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="w-[100%] h-[30rem]">
                        <Container2 />
                    </div>

                    <div className="w-[100%] h-fit flex flex-row justify-between">
                        <Container3 usersData={usersData} />
                        <Container4 />
                    </div>

                    <div className="w-[100%] h-[30rem]">
                        {/*<Container9 />*/}
                    </div>
                </div>


            </div>
        </>
    )
}

export default Dashboard;