import Box from "@mui/material/Box";
import {BarChart} from "@mui/x-charts/BarChart";

import type {Container7Props} from "../../types/types.ts";

const Container3 = ({data}: Container7Props) => {

    console.log(data);

    const uData = [1, 1, 1, 1, 1, 1, 1];
    const pData = [2, 1, 2, 3, 4, 1, 2];
    const xData = [0, 1, 2, 3, 4, 2, 2];
    const yData = [3, 1, 2, 3, 4, 1, 4];
    const xLabels = ["M", "T", "W", "TH", "F", "ST", "S", "A", "B", "C", "D", "E", "G", "H"];

    return (
        <>
            <div className="w-[48%] bg-[#1F2937] rounded-3xl">
                <Box sx={{width: '100%', height: 300}}>
                    <BarChart
                        series={[
                            {data: pData, label: 'pv', id: 'pvId', stack: 'total'},
                            {data: uData, label: 'uv', id: 'uvId', stack: 'total'},
                            {data: xData, label: 'xv', id: 'xvid', stack: 'total'},
                            {data: yData, label: 'yv', id: 'yvid', stack: 'total'}
                        ]}
                        xAxis={[{
                            data: xLabels,
                            height: 28,
                            tickLabelStyle: {fill: '#FFFFFF', fontSize: 12, fontWeight: 'normal'},
                            scaleType: 'band'
                        }]}
                        yAxis={[{width: 50, min: 0, max: 10, tickLabelStyle: {fill: '#FFFFFF', fontSize: 12, fontWeight: 'normal'}}]}
                    />
                </Box>
            </div>
        </>
    );

}

export default Container3;