import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {rainbowSurgePalette} from "@mui/x-charts/colorPalettes";
import {pieArcClasses, PieChart, type PieChartProps, pieClasses} from "@mui/x-charts/PieChart";
import {feelingPercentage} from "../../utils/feelingLogic.ts";
import type {Container2Props} from "../../types/overviewTypes.ts";

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
            </div>
        </>
    );
}

export default Container4;