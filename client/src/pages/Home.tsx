import {Container1, Container2, Container3, Container4} from '../components/Containers.tsx';
import Navbar from "./navbar.tsx";
import {useEffect, useState} from "react";



const Home = () => {

    const [usersData, setUsersData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:8080/Users");
                if (!response.ok) throw new Error("Failed to fetch database");

                const jsonData = await response.json();
                setUsersData(jsonData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;

    return(
        <>
        <div className="px-4 md:px-6 py-8 md:py-12 bg-[#111827]">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#FFFFFF]">Hackathon Dashboard</h1>
                    <p className="text-md font-normal text-[#AAAFB8]">Track participant progress and overall insight</p>
                </div>

                <Navbar />
            </div>


            <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-col md:flex-row gap-6">
                    <Container1 usersData={usersData}/>
                </div>


                <div className="flex flex-col gap-6 lg:flex-row w-[100%] justify-between my-6">
                    <Container2 usersData={usersData}/>
                    <Container3 usersData={usersData}/>
                </div>

                <div className="flex flex-col lg:flex-row flex-wrap gap-4 min-h-[35rem] my-2 lg:my-4">
                    <Container4/>
                </div>
            </div>


        </div>
        </>
    )
}

export default Home;