import Box from "@mui/material/Box";
import {BarChart} from "@mui/x-charts/BarChart";
import {overallFeeling} from "../../utils/feelingLogic.ts";

type Container2Props = { dailyLogData: any[] };

const Container3 = ({dailyLogData}: Container2Props) => {

    const feelingData = overallFeeling(dailyLogData);

    const sortedFeeling = [...feelingData].sort(
        (a, b) =>
            new Date(a.Key).getTime() -
            new Date(b.Key).getTime()
    );

    const xLabels = sortedFeeling.map(item => item.Key);

    const uData = sortedFeeling.map(
        item => Number(item.Value.percentageSuperExcited)
    );

    const pData = sortedFeeling.map(
        item => Number(item.Value.percentageGood)
    );

    const xData = sortedFeeling.map(
        item => Number(item.Value.percentageOkay)
    );

    const yData = sortedFeeling.map(
        item => Number(item.Value.percentageStressed)
    );

    return (
        <>
            <div className="w-[100%] bg-[#FFFFFF] rounded-3xl border-2 border-[#C9C6D9] flex justify-center items-center">
                <Box sx={{width: '100%', height: 300}}>
                    <BarChart
                        series={[
                            {data: uData, label: 'Super excited', id: 'pvId', stack: 'total'},
                            {data: pData, label: 'Good', id: 'uvId', stack: 'total'},
                            {data: xData, label: 'Okay', id: 'xvid', stack: 'total'},
                            {data: yData, label: 'Stressed', id: 'yvid', stack: 'total'}
                        ]}
                        xAxis={[{
                            data: xLabels,
                            height: 28,
                            tickLabelStyle: {fill: '#000000', fontSize: 12, fontWeight: 'normal'},
                            scaleType: 'band'
                        }]}
                        yAxis={[{width: 50, min: 0, max: 10, tickLabelStyle: {fill: '#000000', fontSize: 12, fontWeight: 'normal'}}]}
                    />
                </Box>
            </div>
        </>
    );

}

export default Container3;