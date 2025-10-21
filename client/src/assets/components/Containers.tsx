import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
// import BlockIcon from '@mui/icons-material/Block';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Box from '@mui/material/Box';
import {LineChart} from '@mui/x-charts/LineChart';
import {BarChart} from '@mui/x-charts/BarChart';
import {Gauge, gaugeClasses} from '@mui/x-charts/Gauge';
import DummyData from "./dummyData.ts";
// import {LoremIpsum} from "react-lorem-ipsum";
import axios from "axios";
import {type ElementType, useEffect, useState} from "react";


type firstContainer = {
    icon : ElementType;
    sectionName : string;
    numberOfPeople : number | string;
}

const FirstContainer : firstContainer[] =[
    {
        icon: PeopleAltSharpIcon,
        sectionName: "Total Participants",
        numberOfPeople: 30,
    },
    {
        icon: PeopleAltSharpIcon,
        sectionName: "Active Participants",
        numberOfPeople: "20",
    },
    {
        icon: AddReactionIcon,
        sectionName: "Average Participants Feel",
        numberOfPeople: "😊",
    },
]

const Container1 = () => {
    return (
        <>
            {FirstContainer.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-between border-[1.5px] border-gray-200 bg-white w-full h-full rounded-2xl gap-4 p-6 hover:shadow-lg"
                >
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <h3 className="text-gray-600 font-semibold text-sm">{item.sectionName}</h3>
                            <h1 className="text-3xl font-bold">{item.numberOfPeople}</h1>
                        </div>

                        <div className="bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center border border-gray-50 shadow-sm">
                            <item.icon fontSize="medium" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};


const Container2 = () => {
    return(
        <>
            <div className="flex flex-col border-[1.5px] border-gray-200 bg-white rounded-2xl p-4 gap-4 my-4">
                <h3 className="text-base font-semibold">Select Participant to Track</h3>
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                    <div className="flex justify-center items-center w-full md:max-w-1/3  gap-2">
                        <Stack spacing={3} sx={{ width: '100%' }}>
                            <Autocomplete
                                options={DummyData}
                                getOptionLabel={(option) => option.label}
                                renderValue={(value, getItemProps) => (
                                    <Chip label={value.label} {...getItemProps()} />
                                )}
                                renderInput={(params) => <TextField {...params} label="Participants" InputLabelProps={{
                                    sx: { fontSize: "1rem" }
                                }} />}
                            />
                        </Stack>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600">Search by name or email to view individual metrics</p>
                    </div>
                </div>
            </div>
        </>
    )
}


const margin = { right: 24 };

type secondContainer = {
    title: string;
    usage: number;
    barChartData: {
        label: string[];
        data: number[];
    };
    lineChartData: {
        label: string[];
        dailyCheckInData: number[];
        dailyMotivationData: number[];
    }
}

const SecondContainer : secondContainer[] = [
    {
        title: "Hackathon Usage",
        usage: 65,
        barChartData: {
            label: ["M", "T", "W", "TH", "F", "ST", "S"],
            data: [2400, 1398, 9800, 3908, 4800, 3800, 4300]
        },
        lineChartData: {
            label: ["M", "T", "W", "TH", "F", "ST", "S"],
            dailyCheckInData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            dailyMotivationData: [2400, 1398, 9800, 3908, 4800, 3800, 4300]
        }

    },
    {
        title: "Participant Usage",
        usage: 20,
        barChartData: {
            label: ["M", "T", "W", "TH", "F", "ST", "S"],
            data: [200, 1398, 9800, 3908, 4800, 6800, 4300]
        },
        lineChartData: {
            label: ["M", "T", "W", "TH", "F", "ST", "S"],
            dailyCheckInData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            dailyMotivationData: [2400, 1398, 9800, 3908, 4800, 3800, 4300]
        }

    },

]

const Container3 = () => {
    return(
        <>
            {SecondContainer.map((item, index) => (
                <div key={index} className="flex flex-col border-[1.5px] border-gray-200 justify-between bg-white w-full flex-1 rounded-2xl gap-4">
                    <div className="flex justify-start items-center px-4 py-2 gap-2 rounded-t-2xl ">
                        <div className="bg-white rounded-full size-[55px] flex justify-center items-center border border-gray-50 shadow-sm">
                            <DataUsageIcon sx={{fontSize: "2rem"}}/>
                        </div>
                        <h2 className="font-semibold text-2xl">{item.title}</h2>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center h-full w-[100%] gap-2 p-4">
                        <div className="flex flex-col items-center h-full w-[100%] md:w-1/2">
                            <div className="h-[100%] md:h-[45%] w-[60%] md:w-[100%]">
                                <Box sx={{ width: '100%', height: '100%' }}>
                                    <Gauge
                                        value={item.usage}
                                        startAngle={-110}
                                        endAngle={110}
                                        text={({ value }) => `${value}%`}
                                        sx={{[`& .${gaugeClasses.valueText}`]: {
                                                fontSize: 40,
                                                fontWeight: 'bold'

                                            },
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: '#52b202'
                                            },


                                        }}
                                    />
                                </Box>
                            </div>
                            <div className="h-[100%] md:h-[45%] w-[100%]">
                                <Box sx={{ width: '100%', height: '100%' }}>
                                    <BarChart
                                        series={[
                                            { data: item.barChartData.data, label: 'Check-Ins', id: 'pvId' }
                                        ]}
                                        xAxis={[{ data: item.barChartData.label }]}
                                        yAxis={[{ width: 0, disableLine: true, disableTicks: true}]}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className="w-[100%] md:w-1/2 h-[100%] md:h-[45%] flex flex-col justify-center items-center">

                            <Box sx={{ width: '100%', height: "100%" }}>
                                <LineChart
                                    series={[
                                        { data: item.lineChartData.dailyCheckInData, label: 'Motivation' },
                                        { data: item.lineChartData.dailyMotivationData, label: 'Check-in' },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: item.lineChartData.label }]}
                                    yAxis={[{ width: 50 }]}
                                    margin={margin}
                                />
                            </Box>
                        </div>

                    </div>

                </div>
            ))}
        </>
    )
}

type fourthContainer = {
    title: string;
    icon: ElementType;
    description: string[];

}

const FourthContainer : fourthContainer[] = [
    {
        title: "Reflection",
        icon: EmojiObjectsIcon,
        description: ["The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights.","The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights."],
    },
    {
        title: "Update",
        icon: EmojiObjectsIcon,
        description: ["The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights.","The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights."],
    },
    {
        title: "Reflection",
        icon: EmojiObjectsIcon,
        description: ["The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights.","The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights."],
    }
]

const Container4 = () => {

    const [array, setArray] = useState([])
    const fetchApi = async () => {

        try{
            const response = await axios.get("http://127.0.0.1:5050/api/users")
            setArray(response.data.users[0]);
        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchApi()
    }, []);

    return(
        <>
            <div className="bg-white border-[1.5px] border-gray-200 p-6 flex flex-col gap-4 rounded-2xl">
                <div className="rounded-2xl">
                    <h2><strong>Name:</strong> {array}</h2>
                    <h2><strong>Discord UserName:</strong> N/A</h2>
                    <h2><strong>Github Repo:</strong> <a href="https://github.com/ike005">github.com/ike005</a></h2>
                    <h2>Todays Feeling: 😁</h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
                    {FourthContainer.map((item, index) => (
                            <div key={index} className="w-[100%] bg-[#F4DFE4] rounded-2xl p-6">
                                <div className="flex flex-row items-center gap-4">
                                    <div className="bg-[#FAF0F2] rounded-full size-[40px] flex justify-center items-center border border-gray-50 shadow-sm">
                                        <item.icon sx={{fontSize: "1.5rem"}}/>
                                    </div>
                                    <h2 className="text-2xl font-semibold">{item.title}</h2>
                                </div>

                                <div className="flex flex-col gap-4 mt-4">
                                    {item.description.map((item, index) => (
                                        <div key={index} className="bg-[#FAF0F2] p-4 rounded-2xl">
                                            <h3>{index + 1}</h3>
                                            <p className="text-gray-600 text-sm md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )

}

export {Container1, Container2, Container3, Container4};