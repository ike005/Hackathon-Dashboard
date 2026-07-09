import getCurrentDate from "./currentDate";

function trackHacathonDaysDate(data: any) {
    let duration_dates = []
    for (let i = 0; i < data.dailyLogData.length; i++) {
        duration_dates.push(data.dailyLogData[i]["log_date"]);
    }
    return [...new Set(duration_dates)];
}

function trackActiveUsers(data: any) {
    const uniqueDates = trackHacathonDaysDate(data);
    let currentlyActiveUsers = 0;
    const currentDate = getCurrentDate();

    for (let i = 0; i < data.dailyLogData.length; i++) {
        if (data.dailyLogData[i]["log_date"] == (currentDate)) {
            currentlyActiveUsers++;
            console.log("beans");
            console.log(currentlyActiveUsers);
        }
    }
    const dictArray = [];

    for (let i = 0; i < uniqueDates.length; i++) {
        let count = 0;
        for (let j = 0; j < data.dailyLogData.length; j++) {
            if (data.dailyLogData[j]["log_date"] == (uniqueDates[i])) {
                count++
            }
        }
        dictArray.push({Key: uniqueDates[i], Value: count});
    }
    return {dictArray, currentlyActiveUsers};
}
export { trackHacathonDaysDate, trackActiveUsers };