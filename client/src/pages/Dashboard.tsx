import {Container1, Container2, Container3, Container4, Container5} from '../components/Containers.tsx';
// import Navbar from "../components/navbar.tsx";
import {useUsers} from "../hooks/useUsers.ts";


const Dashboard = () => {

    const {usersData, loading} = useUsers();

    // if (loading) return <p>Loading dashboard...</p>;

    return(
        <>
        <div className="px-4 md:px-6 py-8 md:py-12 h-[100%] bg-[#111827]">
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
                    <Container2 usersData={usersData}/>
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