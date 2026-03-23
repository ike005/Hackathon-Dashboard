import {Container1, Container2, Container3, Container4, Container5} from '../components/Containers.tsx';
// import Navbar from "../components/navbar.tsx";
import {useUsers} from "../hooks/useUsers.ts";


const Dashboard = () => {

    const {usersData} = useUsers();

    return(
        <>
        <div className="px-4 md:px-6 py-4 md:py-6 h-[100vh] w-full bg-[#111827] overflow-auto">
            <div className="flex flex-col gap-2 pb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-[#FFFFFF]">Hackathon Dashboard</h1>
                <p className="text-md font-normal text-[#AAAFB8]">Track participant progress and overall insight</p>
            </div>
            <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-col md:flex-row gap-6">
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

                <div className="flex flex-col lg:flex-row flex-wrap gap-4 min-h-[35rem] my-2 lg:my-4">
                    <Container5 usersData={usersData}/>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row w-[100%] justify-between my-6">
                    {/*<Container2 usersData={usersData}/>*/}
                    {/*<Container3 usersData={usersData}/>*/}
                    <div className="flex flex-col w-[100%] lg:w-[40%] gap-4">
                        <Container4 usersData={usersData}/>
                    </div>
                </div>
            </div>


        </div>
        </>
    )
}

export default Dashboard;