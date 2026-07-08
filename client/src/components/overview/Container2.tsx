import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {LineChart} from "@mui/x-charts/LineChart";
import type {secondContainer} from "../../types/overviewTypes.ts";

import {trackActiveUsers} from "../../utils/analytics.ts";

type Container2Props = { dailyLogData: any[] };


function Container2 (dailyLogData: Container2Props) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const chartHeight = isMobile ? 260 : isTablet ? 360 : 500;

    const daysData = trackActiveUsers(dailyLogData);

    const dateSort = daysData.dictArray.sort((a: any, b: any) => new Date(a.Key).getTime() - new Date(b.Key).getTime());




    const SecondContainer: secondContainer[] = [
        {
            lineChartData: {
                label: dateSort.map((day: any) => day.Key),
                dailyCheckInData: dateSort.map((day: any) => day.Value),
                dailyCodeCommits: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
                dailyCodeCommits2: [2400, 1398, 9800, 3908, 4800, 3800, 4300]
            }
        },
    ]
    // @ts-ignore
    return(
        <>
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#FFFFFF] rounded-2xl md:rounded-3xl border-2 border-[#C9C6D9] p-2 sm:p-4 overflow-hidden">
                <Box sx={{ width: '100%', height: '100%', minHeight: 0 }}>
                    <LineChart
                        height={chartHeight}

                        series={[
                            { data: SecondContainer[0].lineChartData.dailyCheckInData, label: 'Check Ins', yAxisId: 'leftAxisId' },
                            { data: SecondContainer[0].lineChartData.dailyCodeCommits, label: 'Code Commits', yAxisId: 'rightAxisId' },
                        ]}
                        xAxis={[{
                            data: SecondContainer[0].lineChartData.label,
                            height: 28,
                            scaleType: 'point',
                            tickLabelStyle: {fill: '#000000', fontSize: 12, fontWeight: 'normal'},
                        }]}
                        yAxis={[
                            { id: 'leftAxisId', width: 50, tickLabelStyle: {fill: '#000000', fontSize: 12, fontWeight: 'normal'}, min: 0, tickInterval: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],},
                            { id: 'rightAxisId', position: 'right', tickLabelStyle: {fill: '#000000', fontSize: 12, fontWeight: 'normal'}},
                        ]}
                        slotProps={{
                            legend: {
                                sx: {
                                    '& .MuiChartsLegend-label': {
                                        color: '#000000',
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
