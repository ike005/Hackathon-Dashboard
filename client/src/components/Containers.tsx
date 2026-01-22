import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
// import BlockIcon from '@mui/icons-material/Block';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
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
// import DummyData from "./dummyData.ts";
// import {LoremIpsum} from "react-lorem-ipsum";
import {type ElementType, useEffect, useState} from "react";

// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {styled, tableCellClasses} from "@mui/material";

// src/services/api.ts

// export async function apiData() {
//     const response = await fetch("http://127.0.0.1:8080/Users");
//
//     if (!response.ok) {
//         throw new Error("Failed to fetch database");
//     }
//
//     const data = await response.json();
//     return data;
// }
//
// apiData();

function gettingActiveUsers(data: any) {
    const totalParticipants = data.length;
    let currentDay = String(new Date().getDate()).padStart(2, '0');
    let currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    let currentYear = new Date().getFullYear();

    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const totalActiveParticipants = (data: any) => {

        console.log(currentDate);

        let active = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty(currentDate)) {
                active++;
            }
        }
        return active;
    }

    return {totalActiveParticipants, currentDate, totalParticipants};
}

interface Container1Props {
    usersData?: any[]
}

const Container1 = ({usersData}: Container1Props) => {
    // @ts-ignore
    // const totalParticipants = usersData.length;
    // let currentDay = String(new Date().getDate()).padStart(2, '0');
    // let currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    // let currentYear = new Date().getFullYear();
    //
    // const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    //
    // const totalActiveParticipants = (usersData: any) => {
    //
    //     console.log(currentDate);
    //
    //     let active = 0;
    //     for (let i = 0; i < usersData.length; i++) {
    //         if (usersData[i].hasOwnProperty(currentDate)) {
    //             active++;
    //         }
    //     }
    //     return active;
    // }

    const {totalActiveParticipants, currentDate, totalParticipants} = gettingActiveUsers(usersData);

    const averageFeeling = (usersData: any) => {
        const totalListedNumbers = []
        for (let i = 0; i < usersData.length; i++) {
            if (usersData[i].hasOwnProperty(currentDate)) {
                switch (true) {
                    case (usersData[i][currentDate].user_feeling[0] === "Super excited 😁"):
                        totalListedNumbers.push(4);
                        break;
                    case (usersData[i][currentDate].user_feeling[0] === "Good 😊"):
                        totalListedNumbers.push(3);
                        break;
                    case (usersData[i][currentDate].user_feeling[0] === "Okay 😐"):
                        totalListedNumbers.push(2);
                        break;
                    case (usersData[i][currentDate].user_feeling[0] === "Stressed 😞"):
                        totalListedNumbers.push(1);
                        break;
                    default:
                        totalListedNumbers.push(0);
                }
            }
        }

        const totalAddedNumbers = totalListedNumbers.reduce((a, b) => a + b, 0);

        const totalAverage = Math.round(totalAddedNumbers / usersData.length);
        // console.log(totalAverage);
        // console.log(totalListedNumbers);

        let averageUserFeeling = "N/A";
        switch (true) {
            case (totalAverage === 4):
                averageUserFeeling = "😁";
                break;
            case (totalAverage === 3):
                averageUserFeeling = "😊";
                break;
            case (totalAverage === 2):
                averageUserFeeling = "😐";
                break;
            case (totalAverage === 1):
                averageUserFeeling = "😞";
                break;
        }

        return averageUserFeeling;
    }


    const FirstContainer = [
        {
            icon: PeopleAltSharpIcon,
            sectionName: "Total Participants",
            numberOfPeople: ` ${totalParticipants}`,
        },
        {
            icon: PeopleAltSharpIcon,
            sectionName: "Active Participants",
            numberOfPeople: ` ${totalActiveParticipants(usersData)}`,
        },
        {
            icon: AddReactionIcon,
            sectionName: "Average Participants Feel",
            numberOfPeople: ` ${averageFeeling(usersData)}`,
        },
    ]

    return (
        <>
            {FirstContainer.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-between bg-[#1F2937] w-full h-full rounded-2xl gap-4 p-6 hover:shadow-lg"
                >
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <h3 className="text-gray-600 font-semibold text-sm">{item.sectionName}</h3>
                            <h1 className="text-3xl font-bold">{item.numberOfPeople}</h1>
                        </div>

                        <div
                            className="bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center border border-gray-50 shadow-sm">
                            <item.icon fontSize="medium"/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface Container2Props {
    usersData?: any[]
    onViewDetails?: (user: any) => void
}

const Container2 = ({usersData, onViewDetails}: Container2Props) => {

    const usersInfo = (usersData: any) => {
        let currentDay = String(new Date().getDate()).padStart(2, '0');
        let currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
        let currentYear = new Date().getFullYear();

        const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        const results = [];

        for (let i = 0; i < usersData.length; i++) {

            let active = false;
            if (usersData[i].hasOwnProperty(currentDate)) {
                active = true;
            }
            const user = {
                name: usersData[i].user_name,
                githubLink: usersData[i].github_link || 'https://github.com/ike005',
                status: active ? (
                    <span className="bg-green-500 px-4 py-2 rounded-full text-white text-sm">Active</span>
                ) : (
                    <span className="bg-yellow-400 px-4 py-2 rounded-full text-white text-sm">Inactive</span>
                ),
                feeling: usersData[i][currentDate]?.user_feeling?.[0] || "N/A",
                fullData: usersData[i]
            }

            results.push(user);
        }
        return results;
    }

    const rows = usersInfo(usersData);

    return (
        <>
            <div
                // lg:w-[60%]
                className="flex flex-col bg-[#1F2937] w-[100%] lg:w-[60%] min-h-[35vh] max-h-[50vh] overflow-scroll rounded-2xl p-4 gap-4">
                <h3 className="text-base font-semibold text-[#FFFFFF]">Select Participant to Track</h3>
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                    {/*md:max-w-1/3*/}
                    <div className="flex items-center w-full gap-2">
                        <TableContainer component={Paper}>
                            <Table sx={{maxWidth: '100%'}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="left">GitHub Repo</StyledTableCell>
                                        <StyledTableCell align="left">Status</StyledTableCell>
                                        <StyledTableCell align="left">Feeling</StyledTableCell>
                                        <StyledTableCell align="left">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <a href={row.githubLink}>{row.githubLink}</a>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.status}</StyledTableCell>
                                            <StyledTableCell align="left">{row.feeling}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <button
                                                    onClick={() => onViewDetails?.(row.fullData)}
                                                    className="bg-[#82181A] px-4 py-2 rounded-md text-[#FFFFFF] text-md hover:cursor-pointer hover:bg-[#9F1C1E] transition-colors">Details
                                                </button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {/*<div className="flex items-center">*/}
                    {/*    <p className="text-gray-600">Search by name or email to view individual metrics</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    )
}


const Container3 = () => {
    return (
        <>
            <div>
                <div
                    className="flex flex-col justify-between gap-4 md:gap-6 w-[100%] lg:w-[100%] h-[80vh] lg:h-fit bg-[#1F2937] px-8 py-12 rounded-2xl">
                    <h1 className="text-4xl text-[#FFFFFF] font-semibold">Profile</h1>
                </div>
            </div>
        </>
    )
}


type fourthContainer = {
    title: string;
    icon: ElementType;
    description: string[];

}

const FourthContainer: fourthContainer[] = [
    {
        title: "Reflection",
        icon: EmojiObjectsIcon,
        description: ["The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights."],
    },
    {
        title: "Update",
        icon: EmojiObjectsIcon,
        description: ["The team demonstrated excellent collaboration on the authentication module. Communication was clear and everyone contributed valuable insights."],
    }
]

// interface Container3Props {
//     usersData?: any[]
// }
// {userData} : Container3Props

const Container4 = () => {


    return (
        <>

            <div
                className="flex flex-col justify-between gap-2 md:gap-6 w-[100%] lg:w-[100%] h-[80vh] lg:h-fit bg-[#1F2937] px-8 py-12 rounded-2xl">
                <h1 className="text-4xl text-[#FFFFFF] font-semibold">Reflections & Updates</h1>
                <h2 className="text-green-600 bg-green-300 w-fit py-2 px-4 rounded-full font-bold">chibuike005</h2>
                {FourthContainer.map((item, index) => (
                        <div key={index} className="w-[100%] h-full bg-[#2B3544] rounded-2xl p-2 lg:p-4">
                            <div className="flex flex-row items-center gap-4">
                                <div
                                    className="bg-[#FFFFFF] rounded-full size-[40px] flex justify-center items-center shadow-sm">
                                    <item.icon sx={{fontSize: "1.5rem"}}/>
                                </div>
                                <h2 className="text-2xl font-semibold text-[#FFFFFF]">{item.title}</h2>
                            </div>

                            <div className="flex flex-col gap-4 mt-2">
                                {item.description.map((item, index) => (
                                    <div key={index} className="p-4 rounded-2xl">
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
        </>
    )

}



interface Container5Props {
    usersData?: any[]
}

const Container5 = ({usersData}: Container5Props) => {

    const {totalActiveParticipants, totalParticipants} = gettingActiveUsers(usersData);
    console.log(totalActiveParticipants);

    let activeUserPercentage = Math.floor((totalActiveParticipants(usersData) / totalParticipants) * 100);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalParticipants);
        }, 3000);

        return () => clearInterval(interval);
    }, [totalParticipants]);



    const margin = {right: 24};

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
        };
        user?: any;
    }

    const SecondContainer: secondContainer[] = [
        {
            title: "Hackathon Usage",
            usage: activeUserPercentage,
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
            },
            user: "chibuike005"

        },
    ]

    return (
        <>
            {SecondContainer.map((item, index) => (
                <div key={index} className="flex flex-col justify-between bg-[#1F2937] w-full flex-1 rounded-2xl gap-4">
                    <div className="flex justify-start items-center px-4 py-2 gap-2 rounded-t-2xl ">
                        <div
                            className="bg-white rounded-full size-[55px] flex justify-center items-center border border-gray-50 shadow-sm">
                            <DataUsageIcon sx={{fontSize: "2rem"}}/>
                        </div>
                        <h2 className="font-semibold text-2xl">{item.title}</h2>
                        {item.user &&
                            <h2 className="text-green-600 bg-green-300 w-fit py-2 px-4 rounded-full font-bold">{item.user}</h2>
                        }
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center h-full w-[100%] gap-2 p-4">
                        <div className="flex flex-col items-center h-full w-[100%] md:w-1/2">
                            <div className="h-[100%] md:h-[45%] w-[60%] md:w-[100%]">
                                <Box sx={{width: '100%', height: '100%'}}>
                                    <Gauge
                                        value={item.usage}
                                        startAngle={-110}
                                        endAngle={110}
                                        text={({value}) => `${value}%`}
                                        sx={{
                                            [`& .${gaugeClasses.valueText}`]: {
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
                                <Box sx={{width: '100%', height: '100%'}}>
                                    <BarChart
                                        series={[
                                            {data: item.barChartData.data, label: 'Check-Ins', id: 'pvId'}
                                        ]}
                                        xAxis={[{data: item.barChartData.label}]}
                                        yAxis={[{width: 0, disableLine: true, disableTicks: true}]}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div
                            className="w-[100%] md:w-1/2 h-[100%] md:h-[45%] flex flex-col justify-center items-center">

                            <Box sx={{width: '100%', height: "100%"}}>
                                <LineChart
                                    series={[
                                        {data: item.lineChartData.dailyCheckInData, label: 'Motivation'},
                                        {data: item.lineChartData.dailyMotivationData, label: 'Check-in'},
                                    ]}
                                    xAxis={[{scaleType: 'point', data: item.lineChartData.label}]}
                                    yAxis={[{width: 50}]}
                                    margin={margin}
                                />
                            </Box>
                        </div>

                    </div>

                    {item.user &&
                        <div className="flex flex-row w-full justify-center items-center gap-2 px-4 py-2 rounded-b-2xl">
                            {Array.from({length: totalParticipants}).map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-[10px] rounded-full transition-all duration-500 ease-in-out ${
                                        index === currentIndex ? "w-[2.4rem] bg-[#BA0C2F]" : "w-[10px] bg-[#FFA8A7]"
                                    }`}
                                ></div>
                                )
                            )}
                        </div>

                    }

                </div>
            ))}
        </>
    )
}

export {Container1, Container2, Container3, Container4, Container5};