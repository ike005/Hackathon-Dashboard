import {useTheme} from "@mui/material/styles";
import {rainbowSurgePalette} from "@mui/x-charts/colorPalettes";
import {pieArcClasses, PieChart, pieClasses} from "@mui/x-charts/PieChart";

import {feelingPercentage} from "../../utils/feelingLogic.ts";

type Container2Props = { dailyLogData: any[] };

function Container4 ({dailyLogData}: Container2Props) {
    const {percentageSuperExcited, percentageGood, percentageOkay, percentageStressed} = feelingPercentage(dailyLogData);

    const theme = useTheme();
    const palette = rainbowSurgePalette(theme.palette.mode);
    const data1 = [
        { label: 'Super excited', value: `${percentageSuperExcited}` },
        { label: 'Good', value: `${percentageGood}` },
        { label: 'Okay', value: `${percentageOkay}` },
        { label: 'Stressed', value:  `${percentageStressed}` },
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
                outerRadius: 80,
                data: data1,
                highlightScope: { fade: 'global', highlight: 'item' },
            },
            {
                id: 'outer',
                innerRadius: 100,
                outerRadius: 120,
                data: data2,
                highlightScope: { fade: 'global', highlight: 'item' },
            },
        ],
        height: 300,
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
            <div className="w-[100%] bg-[#FFFFFF] border-2 border-[#C9C6D9] rounded-3xl flex flex-col">
                <PieChart
                    {...settings}
                    sx={{
                        [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]: {
                            opacity: 0.6,
                        },
                        // backgroundColor: 'red'
                    }}
                />

                <div className="flex flex-row justify-center items-center px-4 py-2 gap-6">
                    {sideLabelInfo.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <div className="size-[1rem] rounded-full" style={{backgroundColor: item.color}}></div>
                            <h3 className="text-base font-bold text-[#000000]">{item.label}</h3>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default Container4;