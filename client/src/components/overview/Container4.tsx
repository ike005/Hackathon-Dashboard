import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {rainbowSurgePalette} from "@mui/x-charts/colorPalettes";
import {pieArcClasses, PieChart, type PieChartProps, pieClasses} from "@mui/x-charts/PieChart";

import {feelingPercentage} from "../../utils/feelingLogic.ts";

type Container2Props = { dailyLogData: any[] };

function Container4 ({dailyLogData}: Container2Props) {
    const {percentageSuperExcited, percentageGood, percentageOkay, percentageStressed} = feelingPercentage(dailyLogData);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const chartHeight = isMobile ? 240 : 300;
    const outerRadius = isMobile ? 60 : 80;
    const outerRingInner = isMobile ? 75 : 100;
    const outerRingOuter = isMobile ? 90 : 120;

    const palette = rainbowSurgePalette(theme.palette.mode);
    const data1 = [
        { label: 'Super excited', value: Number(percentageSuperExcited) },
        { label: 'Good', value: Number(percentageGood) },
        { label: 'Okay', value: Number(percentageOkay) },
        { label: 'Stressed', value:  Number(percentageStressed) },
    ];
    const data2 = [
        { label: 'A1', value: 100, color: palette[0] },
        { label: 'A2', value: 300, color: palette[0] },
        { label: 'B1', value: 100, color: palette[1] },
        { label: 'B2', value: 80, color: palette[1] },
        { label: 'B3', value: 40, color: palette[1] },
        { label: 'B4', value: 30, color: palette[1] },
        { label: 'B5', value: 50, color: palette[1] },
        { label: 'C1', value: 100, color: palette[2] },
        { label: 'C2', value: 200, color: palette[2] },
        { label: 'D1', value: 150, color: palette[3] },
        { label: 'D2', value: 50, color: palette[3] },
    ];

    const settings = {
        series: [
            {
                innerRadius: 0,
                outerRadius: outerRadius,
                data: data1,
                highlightScope: { fade: 'global', highlight: 'item' },
            },
            {
                id: 'outer',
                innerRadius: outerRingInner,
                outerRadius: outerRingOuter,
                data: data2,
                highlightScope: { fade: 'global', highlight: 'item' },
            },
        ],
        height: chartHeight,
        hideLegend: true,
    } satisfies PieChartProps;

    // Container4SideLabelInfo
    const sideLabelInfo = [
        {
            label: 'Super excited 😁',
            color: '#4F65FF',
        },
        {
            label: 'Good 😊',
            color: '#0DBEFF',
        },
        {
            label: 'Okay 😐',
            color: '#FFB422',
        },
        {
            label: 'Stressed 😞',
            color: '#FA4F58',
        }
    ]


    return (
        <>
            <div className="w-full bg-[#FFFFFF] border-2 border-[#C9C6D9] rounded-2xl md:rounded-3xl flex flex-col overflow-hidden">
                <PieChart
                    {...settings}
                    sx={{
                        [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]: {
                            opacity: 0.6,
                        },
                    }}
                />

                <div className="flex flex-row flex-wrap justify-center items-center px-3 sm:px-4 py-3 sm:py-4 gap-3 sm:gap-4 md:gap-6">
                    {sideLabelInfo.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-1 min-w-[4.5rem]">
                            <div className="size-3 sm:size-4 rounded-full" style={{backgroundColor: item.color}}></div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#000000] text-center">{item.label}</h3>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default Container4;