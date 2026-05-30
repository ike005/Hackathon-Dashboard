import getCurrentDate from "./currentDate";
import {trackHacathonDaysDate} from "./analytics";

const currentDate = getCurrentDate();

function averageUserFeeling (data: any[]) {

    const totalListedNumbers = []
    let dataLength = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]["log_date"] == (currentDate)) {
            dataLength++;
            switch (true) {
                case (data[i]["user_feeling"][0] === "Super excited 😁"):
                    totalListedNumbers.push(4);
                    break;
                case (data[i]["user_feeling"][0] === "Good 😊"):
                    totalListedNumbers.push(3);
                    break;
                case (data[i]["user_feeling"][0] === "Okay 😐"):
                    totalListedNumbers.push(2);
                    break;
                case (data[i]["user_feeling"][0] === "Stressed 😞"):
                    totalListedNumbers.push(1);
                    break;
                default:
                    totalListedNumbers.push(0);

            }

        }
    }
    console.log(totalListedNumbers);

    const totalAddedNumbers = totalListedNumbers.reduce((a, b) => a + b, 0);
    console.log(`${totalAddedNumbers} hello boy`);

    const totalAverage = Math.round(totalAddedNumbers / dataLength);

    let averageFeeling = "--";
    switch (true) {
        case (totalAverage === 4):
            averageFeeling = "😁";
            break;
        case (totalAverage === 3):
            averageFeeling = "😊";
            break;
        case (totalAverage === 2):
            averageFeeling = "😐";
            break;
        case (totalAverage === 1):
            averageFeeling = "😞";
            break;
    }

    return {averageFeeling, totalListedNumbers};

}

function feelingPercentage(data: any[]) {
    const {totalListedNumbers} = averageUserFeeling(data);

    const dataLength = totalListedNumbers.length;

    const feelingSuperExcited = totalListedNumbers.filter((number) => number === 4);
    const feelingGood = totalListedNumbers.filter((number) => number === 3);
    const feelingOkay = totalListedNumbers.filter((number) => number === 2);
    const feelingStressed = totalListedNumbers.filter((number) => number === 1);

    const percentageSuperExcited = ((feelingSuperExcited.length / dataLength) * 100).toFixed(1);
    const percentageGood = ((feelingGood.length / dataLength) * 100).toFixed(1) ;
    const percentageOkay = ((feelingOkay.length / dataLength) * 100).toFixed(1);
    const percentageStressed = ((feelingStressed.length / dataLength) * 100).toFixed(1);

    console.log(percentageSuperExcited, percentageGood, percentageOkay, percentageStressed);
    return {percentageSuperExcited, percentageGood, percentageOkay, percentageStressed};
}

function overallAverageUserFeeling (data: any[], date: string) {

    const totalListedNumbers = []
    let dataLength = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]["log_date"] == (date)) {
            dataLength++;
            switch (true) {
                case (data[i]["user_feeling"][0] === "Super excited 😁"):
                    totalListedNumbers.push(4);
                    break;
                case (data[i]["user_feeling"][0] === "Good 😊"):
                    totalListedNumbers.push(3);
                    break;
                case (data[i]["user_feeling"][0] === "Okay 😐"):
                    totalListedNumbers.push(2);
                    break;
                case (data[i]["user_feeling"][0] === "Stressed 😞"):
                    totalListedNumbers.push(1);
                    break;
                default:
                    totalListedNumbers.push(0);

            }

        }
    }

    const totalAddedNumbers = totalListedNumbers.reduce((a, b) => a + b, 0);
    console.log(`${totalAddedNumbers} hello boy`);

    const totalAverage = Math.round(totalAddedNumbers / dataLength);

    let averageFeeling = "--";
    switch (true) {
        case (totalAverage === 4):
            averageFeeling = "😁";
            break;
        case (totalAverage === 3):
            averageFeeling = "😊";
            break;
        case (totalAverage === 2):
            averageFeeling = "😐";
            break;
        case (totalAverage === 1):
            averageFeeling = "😞";
            break;
    }

    return {averageFeeling, totalListedNumbers};

}

function overallFeelingPercentage(data: any[], date: string) {
    const {totalListedNumbers} = overallAverageUserFeeling(data, date);

    const dataLength = totalListedNumbers.length;

    if (dataLength === 0) {
        return {
            percentageSuperExcited: 0,
            percentageGood: 0,
            percentageOkay: 0,
            percentageStressed: 0
        };
    }

    const feelingSuperExcited = totalListedNumbers.filter((number) => number === 4);
    const feelingGood = totalListedNumbers.filter((number) => number === 3);
    const feelingOkay = totalListedNumbers.filter((number) => number === 2);
    const feelingStressed = totalListedNumbers.filter((number) => number === 1);

    const percentageSuperExcited = (((feelingSuperExcited.length / dataLength) * 100)/10).toFixed(0);
    const percentageGood = (((feelingGood.length / dataLength) * 100)/10).toFixed(0) ;
    const percentageOkay = (((feelingOkay.length / dataLength) * 100)/10).toFixed(0);
    const percentageStressed = (((feelingStressed.length / dataLength) * 100)/10).toFixed(0);

    console.log(percentageSuperExcited, percentageGood, percentageOkay, percentageStressed);
    return {percentageSuperExcited, percentageGood, percentageOkay, percentageStressed};
}

function overallFeeling(data: any[]) {
    const daysOfLog = trackHacathonDaysDate({
        dailyLogData: data
    });

    const overallData = [];

    for (let i = 0; i < daysOfLog.length; i++) {
        const date = daysOfLog[i];

        const {
            percentageSuperExcited,
            percentageGood,
            percentageOkay,
            percentageStressed
        } = overallFeelingPercentage(data, date);

        overallData.push({
            Key: date,
            Value: {
                percentageSuperExcited,
                percentageGood,
                percentageOkay,
                percentageStressed
            }
        });
    }

    return overallData;
}

export {averageUserFeeling, feelingPercentage, overallFeeling};

