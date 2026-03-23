import Box from "@mui/material/Box";
import {LineChart} from "@mui/x-charts/LineChart";
import type {secondContainer} from "../../types/overviewTypes.ts";


const SecondContainer: secondContainer[] = [
    {
        lineChartData: {
            label: ["M", "T", "W", "TH", "F", "ST", "S"],
            dailyCheckInData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            dailyCodeCommits: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
            dailyCodeCommits2: [2400, 1398, 9800, 3908, 4800, 3800, 4300]
        }
    },
]

function Container2 () {
    // @ts-ignore
    return(
        <>
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center bg-[#1F2937] rounded-3xl">
                <Box sx={{ width: '100%', height: '100%' }}>
                    <LineChart
                        series={[
                            { data: SecondContainer[0].lineChartData.dailyCheckInData, label: 'Check Ins', yAxisId: 'leftAxisId' },
                            { data: SecondContainer[0].lineChartData.dailyCodeCommits, label: 'Code Commits', yAxisId: 'rightAxisId' },
                        ]}
                        xAxis={[{
                            data: SecondContainer[0].lineChartData.label,
                            height: 28,
                            scaleType: 'point',
                            tickLabelStyle: {fill: '#FFFFFF', fontSize: 12, fontWeight: 'normal'},
                        }]}
                        yAxis={[
                            { id: 'leftAxisId', width: 50, tickLabelStyle: {fill: '#FFFFFF', fontSize: 12, fontWeight: 'normal'},},
                            { id: 'rightAxisId', position: 'right', tickLabelStyle: {fill: '#FFFFFF', fontSize: 12, fontWeight: 'normal'}},
                        ]}
                        slotProps={{
                            legend: {
                                sx: {
                                    '& .MuiChartsLegend-label': {
                                        color: '#FFFFFF',
                                    },
                                },
                            },
                        }}
                    />
                </Box>
            </div>

        </>
    );
}

export default Container2;
