import {Container1, Container2, Container3, Container4} from '../components/Containers.tsx';



const Home = () => {
    return(
        <>
        <div className="px-4 md:px-6 py-8 md:py-12 bg-[#F5F7F9]">
            <h1 className="text-3xl md:text-4xl font-bold">Hackathon Dashboard</h1>
            <p className="text-md font-normal text-[#AAAFB8]">Track participant progress and overall insight</p>

            <Container2 />

            <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-col md:flex-row gap-6">
                    <Container1 />
                </div>

                <div >
                    {/*className="flex flex-col lg:flex-row gap-6 md:gap-12"*/}
                    <Container4 />
                </div>

                <div className="flex flex-col lg:flex-row flex-wrap gap-4 min-h-[35rem] my-2 lg:my-4">
                    <Container3/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;